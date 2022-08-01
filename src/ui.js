import Sortable from 'sortablejs';

import buttonIcon from './svg/button-icon.svg';
import trashIcon from './svg/trash.svg';

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
      imagePreloader: make('div', this.CSS.imagePreloader),
      itemsContainer: make('div', this.CSS.itemsContainer),
      caption: make('div', [this.CSS.input, this.CSS.caption], {
        contentEditable: !this.readOnly,
      }),
      source: make('div', [this.CSS.input, this.CSS.source], {
        contentEditable: !this.readOnly,
      }),
    };

    /**
     * Create base structure
     *  <wrapper>
     *    <items-container>
     *      <image-container />
     *      <image-preloader />
     *      <select-file-button />
     *    </items-container>
     *    <caption />
     *    <source />
     *  </wrapper>
     */
    this.nodes.caption.dataset.placeholder = this.config.captionPlaceholder;
    this.nodes.source.dataset.placeholder = this.config.sourcePlaceholder;
    this.nodes.itemsContainer.appendChild(this.nodes.imagePreloader);
    this.nodes.itemsContainer.appendChild(this.nodes.fileButton);
    this.nodes.wrapper.appendChild(this.nodes.itemsContainer);
    this.nodes.wrapper.appendChild(this.nodes.caption);
    this.nodes.wrapper.appendChild(this.nodes.source);

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
      itemsContainer: 'image-gallery__items',
      imageContainer: 'image-gallery__image',
      imagePreloader: 'image-gallery__image-preloader',
      imageEl: 'image-gallery__image-picture',
      trashButton: 'image-gallery__image-trash',
      caption: 'image-gallery__caption',
      source: 'image-gallery__source',
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

    button.addEventListener('click', () => {
      this.onSelectFile();
    });

    return button;
  }

  /**
   * Shows uploading preloader
   *
   * @param {string} src - preview source
   * @returns {void}
   */
  showPreloader(src) {
    this.nodes.imagePreloader.style.backgroundImage = `url(${src})`;
    this.nodes.imagePreloader.style.display = 'block';

    if (this.sortable) {
      this.sortable.option("disabled", true);
    }
  }

  /**
   * Hide uploading preloader
   *
   * @returns {void}
   */
  hidePreloader() {
    this.nodes.imagePreloader.style.backgroundImage = '';
    this.nodes.imagePreloader.style.display = 'none';

    if (this.sortable) {
      this.sortable.option("disabled", false);
    }
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

      this.hidePreloader();
    });

    imageContainer.appendChild(imageEl);

    const title = this.api.i18n.t('Delete');

    /**
     * @type {Element}
     */
    let imageTrash = make('div', [this.CSS.trashButton], {
      innerHTML: trashIcon,
      title,
    });

    this.api.tooltip.onHover(imageTrash, title, {
      placement: 'top',
    });

    imageTrash.addEventListener('click', () => {
      this.api.tooltip.hide();

      let arrayChild = Array.prototype.slice.call(this.nodes.itemsContainer.children);
      let elIndex = arrayChild.indexOf(imageContainer);

      if (elIndex !== -1) {
        this.nodes.itemsContainer.removeChild(imageContainer);

        this.onDeleteFile(elIndex);
      }
    });

    imageContainer.appendChild(imageTrash);

    /**
     * Insert before preloader
     */
    this.nodes.itemsContainer.insertBefore(imageContainer, this.nodes.imagePreloader);
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
   * Shows source input
   *
   * @param {string} text - source text
   * @returns {void}
   */
  fillSource(text) {
    if (this.nodes.source) {
      this.nodes.source.innerHTML = text;
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
