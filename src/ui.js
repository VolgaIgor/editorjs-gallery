import Sortable from 'sortablejs';

import buttonIcon from './svg/button-icon.svg';
import trashIcon from './svg/trash.svg';
import zoomInIcon from './svg/zoom-in.svg';

/**
 * Class for working with UI:
 *  - rendering base structure
 *  - show/hide preview
 *  - apply tune view
 */
export default class Ui {
  /**
   * @param {object} ui - image tool Ui module
   * @param {object} ui.api - Editor.js API
   * @param {ImageConfig} ui.config - user config
   * @param {Function} ui.onSelectFile - callback for clicks on Select file button
   * @param {boolean} ui.readOnly - read-only mode flag
   */
  constructor({ api, config, onSelectFile, onDeleteFile, onMoveFile, readOnly }) {
    this.api = api;
    this.config = config;
    this.onSelectFile = onSelectFile;
    this.onDeleteFile = onDeleteFile;
    this.onMoveFile = onMoveFile;
    this.readOnly = readOnly;
    this.nodes = {
      wrapper: make('div', [this.CSS.baseClass, this.CSS.wrapper]),
      fileButton: this.createFileButton(),
      container: make('div', this.CSS.container),
      itemsContainer: make('div', this.CSS.itemsContainer),
      controls: make('div', this.CSS.controls),
      preloaderContainer: make('div', this.CSS.preloaderContainer),
      caption: make('div', [this.CSS.input, this.CSS.caption], {
        contentEditable: !this.readOnly,
      }),
    };

    /**
     * Create base structure
     *  <wrapper>
     *    <container>
     *      <items-container>
     *        <image-container />
     *      </items-container>
     *      <controls>
     *        <preloader-container />
     *        <limit-counter />
     *        <select-file-button />
     *      </controls>
     *    </container>
     *    <caption />
     *  </wrapper>
     */
    this.nodes.caption.dataset.placeholder = this.config.captionPlaceholder;

    this.nodes.controls.appendChild(this.nodes.preloaderContainer);
    if (this.config.maxElementCount) {
      this.nodes.limitCounter = make('div', this.CSS.limitCounter);
      this.nodes.controls.appendChild(this.nodes.limitCounter);
    }
    this.nodes.controls.appendChild(this.nodes.fileButton);

    this.nodes.container.appendChild(this.nodes.itemsContainer);
    this.nodes.container.appendChild(this.nodes.controls);

    this.nodes.wrapper.appendChild(this.nodes.container);
    this.nodes.wrapper.appendChild(this.nodes.caption);
    if (this.readOnly) {
      this.nodes.controls.style.display = 'none';
    }
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      this.nodes.itemsContainer.addEventListener(eventName, function (e) {
        e.preventDefault();
        e.stopPropagation();
      }, false);
    });
  }

  /**
   * CSS classes
   *
   * @returns {object}
   */
  get CSS() {
    return {
      baseClass: this.api.styles.block,
      loading: this.api.styles.loader,
      input: this.api.styles.input,
      button: this.api.styles.button,

      /**
       * Tool's classes
       */
      wrapper: 'image-gallery',
      container: 'image-gallery__container',
      controls: 'image-gallery__controls',
      limitCounter: 'image-gallery__counter',
      itemsContainer: 'image-gallery__items',
      imageContainer: 'image-gallery__image',
      preloaderContainer: 'image-gallery__preloaders',
      imagePreloader: 'image-gallery__preloader',
      imageEl: 'image-gallery__image-picture',
      trashButton: 'image-gallery__image-trash',
      caption: 'image-gallery__caption',
    };
  };

  /**
   * Ui statuses:
   * - empty
   * - uploading
   * - filled
   *
   * @returns {{EMPTY: string, UPLOADING: string, FILLED: string}}
   */
  static get status() {
    return {
      EMPTY: 'empty',
      UPLOADING: 'loading',
      FILLED: 'filled',
    };
  }

  /**
   * Renders tool UI
   *
   * @param {ImageGalleryData} toolData - saved tool data
   * @returns {Element}
   */
  render(toolData) {
    return this.nodes.wrapper;
  }

  onRendered() {
    if (!this.sortable) {
      this.sortable = new Sortable(this.nodes.itemsContainer, {
        handle: `.${this.CSS.imageContainer}`,
        filter: `.${this.CSS.trashButton}`,
        onStart: () => {
          this.nodes.itemsContainer.classList.add(`${this.CSS.itemsContainer}--drag`);
        },
        onEnd: (evt) => {
          this.nodes.itemsContainer.classList.remove(`${this.CSS.itemsContainer}--drag`);

          if (evt.oldIndex !== evt.newIndex) {
            this.onMoveFile(evt.oldIndex, evt.newIndex);
          }
        }
      });
    }
  }

  /**
   * Creates upload-file button
   *
   * @returns {Element}
   */
  createFileButton() {
    const button = make('div', [this.CSS.button]);

    button.innerHTML = this.config.buttonContent || `${buttonIcon} ${this.api.i18n.t('Select an Image')}`;

    // Проверяем значение readOnly и скрываем кнопку, если она равна true
    if (!this.readOnly) {
      button.addEventListener('click', () => {
        this.onSelectFile();
      });
    } else {
      button.style.display = 'none';
    }

    return button;
  }

  /**
   * Shows uploading button
   *
   * @returns {void}
   */
  showFileButton() {
    this.nodes.fileButton.style.display = '';
  }

  /**
   * Hide uploading button
   *
   * @returns {void}
   */
  hideFileButton() {
    this.nodes.fileButton.style.display = 'none';
  }

  getPreloader(file) {
    /**
     * @type {HTMLElement}
     */
    let preloader = make('div', this.CSS.imagePreloader);

    this.nodes.preloaderContainer.append(preloader);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      preloader.style.backgroundImage = `url(${e.target.result})`;
    };

    return preloader;
  }

  removePreloader(preloader) {
    preloader.remove();
  }

  /**
   * Shows an image
   *
   * @param {ImageGalleryDataFile} file - image file object
   * @returns {void}
   */
  appendImage(file) {
    let url = file.url;

    /**
     * Check for a source extension to compose element correctly: video tag for mp4, img — for others
     */
    const tag = /\.mp4$/.test(url) ? 'VIDEO' : 'IMG';

    const attributes = {
      src: url
    };

    /**
     * We use eventName variable because IMG and VIDEO tags have different event to be called on source load
     * - IMG: load
     * - VIDEO: loadeddata
     *
     * @type {string}
     */
    let eventName = 'load';

    /**
     * Update attributes and eventName if source is a mp4 video
     */
    if (tag === 'VIDEO') {
      /**
       * Add attributes for playing muted mp4 as a gif
       *
       * @type {boolean}
       */
      attributes.autoplay = false;
      attributes.muted = true;
      attributes.playsinline = true;

      /**
       * Change event to be listened
       *
       * @type {string}
       */
      eventName = 'loadeddata';
    }

    /**
     * @type {Element}
     */
    let imageContainer = make('div', [this.CSS.imageContainer]);

    /**
     * Compose tag with defined attributes
     *
     * @type {Element}
     */
    let imageEl = make(tag, this.CSS.imageEl, attributes);

    /**
     * Add load event listener
     */
    imageEl.addEventListener(eventName, () => {
      this.toggleStatus(imageContainer, Ui.status.FILLED);
    });

    imageContainer.appendChild(imageEl);

    const title = this.api.i18n.t('Delete');
    const zoomTitle = this.api.i18n.t('Zoom');

    /**
     * @type {Element}
     */
    const imageTrash = make('div', [this.CSS.trashButton], {
      innerHTML: trashIcon,
      title,
    });

    const imageZoom = make('div', [this.CSS.trashButton], {
      innerHTML: zoomInIcon,
      zoomTitle,
    });

    this.api.tooltip.onHover(imageTrash, title, {
      placement: 'top',
    });

    this.api.tooltip.onHover(imageZoom, zoomTitle, {
      placement: 'top',
    });

    imageTrash.addEventListener('click', () => {
      this.api.tooltip.hide();

      const arrayChild = Array.prototype.slice.call(this.nodes.itemsContainer.children);
      const elIndex = arrayChild.indexOf(imageContainer);

      if (elIndex !== -1) {
        this.nodes.itemsContainer.removeChild(imageContainer);

        this.onDeleteFile(elIndex);
      }
    });

    /**
     * Закрывает модальное окно с увеличенным изображением.
     */
    function closeZoomedImage() {
      // Найти все модальные окна
      const zoomContainers = document.querySelectorAll('.zoom-container');

      // Пройти по всем найденным модальным окнам и удалить их
      zoomContainers.forEach(container => {
        container.remove();
      });
    }

    /**
     * Отображает увеличенное изображение в модальном окне.
     *
     * @param {object} myFile - Объект с данными файла для отображения.
     *                          Содержит свойство `url` с URL изображения.
     */
    function showZoomedImage(myFile) {
      // Закрыть предыдущее модальное окно, если оно открыто
      closeZoomedImage();

      // Создаем модальное окно или другой контейнер для отображения увеличенного изображения
      const zoomContainer = document.createElement('div');

      zoomContainer.classList.add('zoom-container');

      // Создаем элемент изображения и устанавливаем его исходный размер
      const zoomImage = document.createElement('img');

      zoomImage.src = myFile.url;
      zoomImage.style.width = '100%'; // Устанавливаем ширину на 100% для увеличенного масштаба

      // Добавляем изображение в контейнер
      zoomContainer.appendChild(zoomImage);

      // Добавляем кнопку закрытия
      const closeButton = document.createElement('div');

      closeButton.classList.add('close-button');
      closeButton.textContent = 'X';
      zoomContainer.appendChild(closeButton);

      // Добавляем контейнер с увеличенным изображением на страницу
      document.body.appendChild(zoomContainer);

      // Добавляем обработчик события для закрытия модального окна при клике на кнопку закрытия
      closeButton.addEventListener('click', () => {
        // Удаляем контейнер с увеличенным изображением
        if (zoomImage.parentNode) {
          // Удаляем контейнер с увеличенным изображением
          zoomContainer.remove();
          // Удаляем изображение
          zoomImage.remove();
        }
      });
    }

    imageZoom.addEventListener('click', () => {
      this.api.tooltip.hide();

      showZoomedImage(file);
    });

    if (!this.readOnly) {
      imageContainer.appendChild(imageTrash);
      imageZoom.style.display = 'none';
    } else {
      imageTrash.style.display = 'none';
      imageContainer.appendChild(imageZoom);
    }

    this.nodes.itemsContainer.append(imageContainer);
  }

  /**
   * Shows caption input
   *
   * @param {string} text - caption text
   * @returns {void}
   */
  fillCaption(text) {
    if (this.nodes.caption) {
      this.nodes.caption.innerHTML = text;
    }
  }

  /**
   * Changes UI status
   *
   * @param {Element} elem
   * @param {string} status - see {@link Ui.status} constants
   * @returns {void}
   */
  toggleStatus(elem, status) {
    for (const statusType in Ui.status) {
      if (Object.prototype.hasOwnProperty.call(Ui.status, statusType)) {
        elem.classList.toggle(`${this.CSS.imageContainer}--${Ui.status[statusType]}`, status === Ui.status[statusType]);
      }
    }
  }

  /**
   * @param {int} imageCount
   * @param {int|null} limitCounter
   * @returns {void}
   */
  updateLimitCounter(imageCount, limitCounter) {
    if (limitCounter && this.nodes.limitCounter) {
      if (imageCount === 0) {
        this.nodes.limitCounter.style.display = 'none';
      } else {
        this.nodes.limitCounter.style.display = null;
        this.nodes.limitCounter.innerText = `${imageCount} / ${limitCounter}`;
      }
    }
  }
}

/**
 * Helper for making Elements with attributes
 *
 * @param  {string} tagName           - new Element tag name
 * @param  {Array|string} classNames  - list or name of CSS class
 * @param  {object} attributes        - any attributes
 * @returns {Element}
 */
export const make = function make(tagName, classNames = null, attributes = {}) {
  const el = document.createElement(tagName);

  if (Array.isArray(classNames)) {
    el.classList.add(...classNames);
  } else if (classNames) {
    el.classList.add(classNames);
  }

  for (const attrName in attributes) {
    el[attrName] = attributes[attrName];
  }

  return el;
};
