(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode('.image-gallery{--bg-color: #cdd1e0;--front-color: #388ae5;--border-color: #e8e8eb}.image-gallery__container{background:black;margin-bottom:10px;padding:5px}.image-gallery__controls{display:flex;gap:10px;padding:8px 2px 3px}.image-gallery__items{display:grid;gap:10px;grid-template-columns:1fr 1fr 1fr;padding:10px;background-color:#222}.image-gallery__items:empty{display:none}.image-gallery__preloaders{display:flex;flex-grow:1;flex-wrap:nowrap;padding:5px;gap:8px;overflow:hidden}.image-gallery__preloader{min-width:30px;height:30px;border-radius:50%;background-size:cover;position:relative;background-color:var(--bg-color);background-position:center center}.image-gallery__preloader:after{content:"";position:absolute;z-index:3;width:30px;height:30px;border-radius:50%;border:2px solid var(--bg-color);border-top-color:var(--front-color);left:50%;top:50%;margin-top:-15px;margin-left:-15px;animation:image-preloader-spin 2s infinite linear;box-sizing:border-box}.sortable .image-gallery__image{cursor:move}.image-gallery__image{position:relative;overflow:hidden;aspect-ratio:16 / 9;-webkit-user-select:none;user-select:none;background-color:#000;border-radius:3px;padding:5px}.image-gallery__image.sortable-ghost{opacity:.75}.image-gallery__image--empty,.image-gallery__image--loading{display:none}.image-gallery__image-picture{border-radius:3px;max-width:100%;height:100%;display:block;margin:auto;object-fit:cover;pointer-events:none}.image-gallery__image-trash{position:absolute;top:3px;right:3px;cursor:pointer;color:#fff;font-size:18px;background-color:#00000040;line-height:1;padding:6px 8px;border-radius:3px;transition:background-color .1s}.image-gallery__image-trash:hover{background-color:#00000080}.image-gallery__counter{display:flex;align-items:center;color:gray;font-size:14px;margin-right:6px}.image-gallery__caption[contentEditable=true][data-placeholder]:before{position:absolute!important;content:attr(data-placeholder);color:#707684;font-weight:400;display:none}.image-gallery__caption[contentEditable=true][data-placeholder]:empty:before{display:block}.image-gallery__caption[contentEditable=true][data-placeholder]:empty:focus:before{display:none}.image-gallery__caption{margin-bottom:10px}.image-gallery .cdx-button{height:40px;display:flex;align-items:center;justify-content:center;padding:12px;gap:5px;white-space:nowrap}.image-gallery__tune-wrapper{display:flex;gap:6px;margin:6px 0}.image-gallery__tune-wrapper:first-child{margin-top:0}.image-gallery__tune-wrapper:last-child{margin-bottom:0}.image-gallery__tune{flex-grow:1;padding:6px;color:var(--color-text-primary);display:flex;align-items:center;justify-content:center}.image-gallery__tune.active{background:var(--color-background-icon-active);color:var(--color-text-icon-active);border-color:var(--color-text-icon-active)}.image-gallery__tune svg{width:24px;height:24px}@keyframes image-preloader-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}')),document.head.appendChild(e)}}catch(a){console.error("vite-plugin-css-injected-by-js",a)}})();
const L = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="14" height="14" x="5" y="5" stroke="currentColor" stroke-width="2" rx="4"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.13968 15.32L8.69058 11.5661C9.02934 11.2036 9.48873 11 9.96774 11C10.4467 11 10.9061 11.2036 11.2449 11.5661L15.3871 16M13.5806 14.0664L15.0132 12.533C15.3519 12.1705 15.8113 11.9668 16.2903 11.9668C16.7693 11.9668 17.2287 12.1705 17.5675 12.533L18.841 13.9634"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.7778 9.33331H13.7867"/></svg>', I = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.1328 7.7234C18.423 7.7634 18.7115 7.80571 19 7.85109M18.1328 7.7234L17.2267 17.4023C17.1897 17.8371 16.973 18.2432 16.62 18.5394C16.267 18.8356 15.8037 19.0001 15.3227 19H8.67733C8.19632 19.0001 7.73299 18.8356 7.37998 18.5394C7.02698 18.2432 6.81032 17.8371 6.77333 17.4023L5.86715 7.7234M18.1328 7.7234C17.1536 7.58919 16.1693 7.48733 15.1818 7.41803M5.86715 7.7234C5.57697 7.76263 5.28848 7.80494 5 7.85032M5.86715 7.7234C6.84642 7.58919 7.83074 7.48733 8.81818 7.41803M15.1818 7.41803C13.0638 7.26963 10.9362 7.26963 8.81818 7.41803M15.1818 7.41803C15.1818 5.30368 13.7266 4.34834 12 4.34834C10.2734 4.34834 8.81818 5.43945 8.81818 7.41803"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.5 15.5L10 11"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 11L13.5 15.5"/></svg>';
class T {
  /**
   * @param {object} ui - image tool Ui module
   * @param {object} ui.api - Editor.js API
   * @param {ImageConfig} ui.config - user config
   * @param {Function} ui.onSelectFile - callback for clicks on Select file button
   * @param {boolean} ui.readOnly - read-only mode flag
   */
  constructor({ api: o, config: s, onSelectFile: d, onDeleteFile: r, onMoveFile: i, readOnly: t }) {
    this.api = o, this.config = s, this.onSelectFile = d, this.onDeleteFile = r, this.onMoveFile = i, this.readOnly = t, this.nodes = {
      wrapper: x("div", [this.CSS.baseClass, this.CSS.wrapper]),
      fileButton: this.createFileButton(),
      container: x("div", this.CSS.container),
      itemsContainer: x("div", this.CSS.itemsContainer),
      controls: x("div", this.CSS.controls),
      preloaderContainer: x("div", this.CSS.preloaderContainer),
      caption: x("div", [this.CSS.input, this.CSS.caption], {
        contentEditable: !this.readOnly
      })
    }, this.nodes.caption.dataset.placeholder = this.api.i18n.t("Gallery caption"), this.readOnly || (this.nodes.controls.appendChild(this.nodes.preloaderContainer), this.config.maxElementCount && (this.nodes.limitCounter = x("div", this.CSS.limitCounter), this.nodes.controls.appendChild(this.nodes.limitCounter)), this.nodes.controls.appendChild(this.nodes.fileButton)), this.nodes.container.appendChild(this.nodes.itemsContainer), this.readOnly || this.nodes.container.appendChild(this.nodes.controls), this.nodes.wrapper.appendChild(this.nodes.container), this.readOnly || this.nodes.wrapper.appendChild(this.nodes.caption), ["dragenter", "dragover", "dragleave", "drop"].forEach((c) => {
      this.nodes.itemsContainer.addEventListener(c, function(g) {
        g.preventDefault(), g.stopPropagation();
      }, !1);
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
      wrapper: "image-gallery",
      container: "image-gallery__container",
      controls: "image-gallery__controls",
      limitCounter: "image-gallery__counter",
      itemsContainer: "image-gallery__items",
      imageContainer: "image-gallery__image",
      preloaderContainer: "image-gallery__preloaders",
      imagePreloader: "image-gallery__preloader",
      imageEl: "image-gallery__image-picture",
      trashButton: "image-gallery__image-trash",
      caption: "image-gallery__caption"
    };
  }
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
      EMPTY: "empty",
      UPLOADING: "loading",
      FILLED: "filled"
    };
  }
  /**
   * Renders tool UI
   *
   * @param {ImageGalleryData} toolData - saved tool data
   * @returns {Element}
   */
  render(o) {
    return this.nodes.wrapper;
  }
  onRendered() {
    !this.readOnly && !this.sortable && (this.sortable = new this.config.sortableJs(this.nodes.itemsContainer, {
      handle: `.${this.CSS.imageContainer}`,
      filter: `.${this.CSS.trashButton}`,
      onStart: () => {
        this.nodes.itemsContainer.classList.add(`${this.CSS.itemsContainer}--drag`);
      },
      onEnd: (o) => {
        this.nodes.itemsContainer.classList.remove(`${this.CSS.itemsContainer}--drag`), o.oldIndex !== o.newIndex && this.onMoveFile(o.oldIndex, o.newIndex);
      }
    }), this.nodes.itemsContainer.classList.add("sortable"));
  }
  /**
   * Creates upload-file button
   *
   * @returns {Element}
   */
  createFileButton() {
    const o = x("div", [this.CSS.button]);
    return o.innerHTML = this.config.buttonContent || `${L} ${this.api.i18n.t("Select an Image")}`, o.addEventListener("click", () => {
      this.onSelectFile();
    }), o;
  }
  /**
   * Shows uploading button
   *
   * @returns {void}
   */
  showFileButton() {
    this.nodes.fileButton.style.display = "";
  }
  /**
   * Hide uploading button
   *
   * @returns {void}
   */
  hideFileButton() {
    this.nodes.fileButton.style.display = "none";
  }
  getPreloader(o) {
    let s = x("div", this.CSS.imagePreloader);
    this.nodes.preloaderContainer.append(s);
    const d = new FileReader();
    return d.readAsDataURL(o), d.onload = (r) => {
      s.style.backgroundImage = `url(${r.target.result})`;
    }, s;
  }
  removePreloader(o) {
    o.remove();
  }
  /**
   * Shows an image
   *
   * @param {ImageGalleryDataFile} file - image file object
   * @returns {void}
   */
  appendImage(o) {
    let s = o.url;
    const d = /\.mp4$/.test(s) ? "VIDEO" : "IMG", r = {
      src: s
    };
    let i = "load";
    d === "VIDEO" && (r.autoplay = !1, r.muted = !0, r.playsinline = !0, i = "loadeddata");
    let t = x("div", [this.CSS.imageContainer]), c = x(d, this.CSS.imageEl, r);
    c.addEventListener(i, () => {
      this.toggleStatus(t, T.status.FILLED);
    }), t.appendChild(c);
    const g = this.api.i18n.t("Delete");
    if (!this.readOnly) {
      let a = x("div", [this.CSS.trashButton], {
        innerHTML: I,
        title: g
      });
      this.api.tooltip.onHover(a, g, {
        placement: "top"
      }), a.addEventListener("click", () => {
        this.api.tooltip.hide();
        let p = Array.prototype.slice.call(this.nodes.itemsContainer.children).indexOf(t);
        p !== -1 && (this.nodes.itemsContainer.removeChild(t), this.onDeleteFile(p));
      }), t.appendChild(a);
    }
    this.nodes.itemsContainer.append(t);
  }
  /**
   * Shows caption input
   *
   * @param {string} text - caption text
   * @returns {void}
   */
  fillCaption(o) {
    this.nodes.caption && (this.nodes.caption.innerHTML = o);
  }
  /**
   * Changes UI status
   *
   * @param {Element} elem
   * @param {string} status - see {@link Ui.status} constants
   * @returns {void}
   */
  toggleStatus(o, s) {
    for (const d in T.status)
      Object.prototype.hasOwnProperty.call(T.status, d) && o.classList.toggle(`${this.CSS.imageContainer}--${T.status[d]}`, s === T.status[d]);
  }
  /**
   * @param {int} imageCount
   * @param {int|null} limitCounter
   * @returns {void}
   */
  updateLimitCounter(o, s) {
    s && this.nodes.limitCounter && (o === 0 ? this.nodes.limitCounter.style.display = "none" : (this.nodes.limitCounter.style.display = null, this.nodes.limitCounter.innerText = `${o} / ${s}`));
  }
}
const x = function(o, s = null, d = {}) {
  const r = document.createElement(o);
  Array.isArray(s) ? r.classList.add(...s) : s && r.classList.add(s);
  for (const i in d)
    r[i] = d[i];
  return r;
}, q = '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -960 960 960" width="24"><path d="M363.077-406.154h373.844L612.769-569.23l-95.078 121.539-62.769-77.693-91.845 119.23Zm-40.769 146.153q-30.308 0-51.307-21-21-21-21-51.308v-455.382q0-30.308 21-51.308 20.999-21 51.307-21h455.383q30.307 0 51.307 21 21 21 21 51.308v455.382q0 30.308-21 51.308t-51.307 21H322.308Zm0-59.999h455.383q4.615 0 8.462-3.846 3.846-3.847 3.846-8.463v-455.382q0-4.616-3.846-8.463-3.847-3.846-8.462-3.846H322.308q-4.616 0-8.462 3.846-3.847 3.847-3.847 8.463v455.382q0 4.616 3.847 8.463 3.846 3.846 8.462 3.846ZM182.309-120.003q-30.307 0-51.307-21-21-21-21-51.307v-515.381h59.999v515.381q0 4.616 3.846 8.462 3.847 3.847 8.462 3.847h515.382v59.998H182.309ZM309.999-800v480-480Z"/></svg>', P = '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 -960 960 960"><path d="M142.309-220.001q-29.826 0-51.067-21.241-21.24-21.24-21.24-51.067v-375.382q0-29.827 21.24-51.067 21.241-21.241 51.067-21.241h375.383q29.827 0 51.067 21.241 21.24 21.24 21.24 51.067v375.382q0 29.827-21.24 51.067-21.24 21.241-51.067 21.241H142.309ZM706.343-520q-15.652 0-25.998-10.346-10.346-10.346-10.346-25.998v-147.311q0-15.651 10.346-25.997 10.346-10.347 25.998-10.347h147.311q15.652 0 25.998 10.347 10.346 10.346 10.346 25.997v147.311q0 15.652-10.346 25.998Q869.306-520 853.654-520H706.343Zm23.655-59.999h100.001V-680H729.998v100.001ZM142.309-280h375.383q5.385 0 8.847-3.462 3.462-3.462 3.462-8.847v-375.382q0-5.385-3.462-8.847-3.462-3.462-8.847-3.462H142.309q-5.385 0-8.846 3.462-3.462 3.462-3.462 8.847v375.382q0 5.385 3.462 8.847 3.461 3.462 8.846 3.462Zm31.538-81.923h312.307l-101.153-135-75 100-55-73-81.154 108Zm532.496 141.922q-15.652 0-25.998-10.347-10.346-10.346-10.346-25.997v-147.311q0-15.652 10.346-25.998Q690.691-440 706.343-440h147.311q15.652 0 25.998 10.346 10.346 10.346 10.346 25.998v147.311q0 15.651-10.346 25.997-10.346 10.347-25.998 10.347H706.343ZM729.998-280h100.001v-100.001H729.998V-280Zm-599.997 0v-400 400Zm599.997-299.999V-680v100.001Zm0 299.999v-100.001V-280Z"/></svg>';
class O {
  /**
   * @param {object} tune - image tool Tunes managers
   * @param {object} tune.api - Editor API
   * @param {object} tune.actions - list of user defined tunes
   * @param {Function} tune.onChange - tune toggling callback
   */
  constructor({ api: o, actions: s, onChange: d }) {
    this.api = o, this.actions = s, this.onChange = d, this.buttons = [];
  }
  /**
   * Available Image tunes
   *
   * @returns {{name: string, icon: string, title: string}[]}
   */
  static get tunes() {
    return [
      {
        name: "slider",
        icon: q,
        title: "Slider"
      },
      {
        name: "fit",
        icon: P,
        title: "Fit"
      }
    ];
  }
  /**
   * Styles
   *
   * @returns {{wrapper: string, buttonBase: *, button: string, buttonActive: *}}
   */
  get CSS() {
    return {
      wrapper: "image-gallery__tune-wrapper",
      buttonBase: this.api.styles.button,
      button: "image-gallery__tune",
      buttonActive: "active"
    };
  }
  /**
   * Makes buttons with tunes
   *
   * @param {ImageGalleryData} toolData - generate Elements of tunes
   * @returns {Element}
   */
  render(o) {
    const s = x("div", this.CSS.wrapper), d = this.actions ?? O.tunes;
    return this.buttons = [], d.forEach((r) => {
      const i = this.api.i18n.t(r.title), t = x("div", [this.CSS.buttonBase, this.CSS.button], {
        innerHTML: r.icon,
        title: i
      });
      t.addEventListener("click", () => {
        this.tuneClicked(r.name, r.action);
      }), t.dataset.tune = r.name, t.classList.toggle(this.CSS.buttonActive, o.style === r.name), this.buttons.push(t), this.api.tooltip.onHover(t, i, {
        placement: "top"
      }), s.appendChild(t);
    }), s;
  }
  /**
   * Clicks to one of the tunes
   *
   * @param {string} tuneName - clicked tune name
   * @param {Function} customFunction - function to execute on click
   */
  tuneClicked(o, s) {
    if (typeof s == "function" && !s(o))
      return !1;
    this.buttons.forEach((d) => {
      d.classList.toggle(this.CSS.buttonActive, d.dataset.tune === o);
    }), this.onChange(o);
  }
}
const D = '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="20" viewBox="0 -960 960 960" width="20"><path d="M360-384h384L618-552l-90 120-66-88-102 136Zm-48 144q-29.7 0-50.85-21.15Q240-282.3 240-312v-480q0-29.7 21.15-50.85Q282.3-864 312-864h480q29.7 0 50.85 21.15Q864-821.7 864-792v480q0 29.7-21.15 50.85Q821.7-240 792-240H312Zm0-72h480v-480H312v480ZM168-96q-29.7 0-50.85-21.15Q96-138.3 96-168v-552h72v552h552v72H168Zm144-696v480-480Z"/></svg>';
function H(E) {
  return E && E.__esModule && Object.prototype.hasOwnProperty.call(E, "default") ? E.default : E;
}
var j = { exports: {} };
(function(E, o) {
  (function(s, d) {
    E.exports = d();
  })(window, function() {
    return function(s) {
      var d = {};
      function r(i) {
        if (d[i])
          return d[i].exports;
        var t = d[i] = { i, l: !1, exports: {} };
        return s[i].call(t.exports, t, t.exports, r), t.l = !0, t.exports;
      }
      return r.m = s, r.c = d, r.d = function(i, t, c) {
        r.o(i, t) || Object.defineProperty(i, t, { enumerable: !0, get: c });
      }, r.r = function(i) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(i, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(i, "__esModule", { value: !0 });
      }, r.t = function(i, t) {
        if (1 & t && (i = r(i)), 8 & t || 4 & t && typeof i == "object" && i && i.__esModule)
          return i;
        var c = /* @__PURE__ */ Object.create(null);
        if (r.r(c), Object.defineProperty(c, "default", { enumerable: !0, value: i }), 2 & t && typeof i != "string")
          for (var g in i)
            r.d(c, g, (function(a) {
              return i[a];
            }).bind(null, g));
        return c;
      }, r.n = function(i) {
        var t = i && i.__esModule ? function() {
          return i.default;
        } : function() {
          return i;
        };
        return r.d(t, "a", t), t;
      }, r.o = function(i, t) {
        return Object.prototype.hasOwnProperty.call(i, t);
      }, r.p = "", r(r.s = 3);
    }([function(s, d) {
      var r;
      r = function() {
        return this;
      }();
      try {
        r = r || new Function("return this")();
      } catch {
        typeof window == "object" && (r = window);
      }
      s.exports = r;
    }, function(s, d, r) {
      (function(i) {
        var t = r(2), c = setTimeout;
        function g() {
        }
        function a(n) {
          if (!(this instanceof a))
            throw new TypeError("Promises must be constructed via new");
          if (typeof n != "function")
            throw new TypeError("not a function");
          this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], e(n, this);
        }
        function h(n, u) {
          for (; n._state === 3; )
            n = n._value;
          n._state !== 0 ? (n._handled = !0, a._immediateFn(function() {
            var l = n._state === 1 ? u.onFulfilled : u.onRejected;
            if (l !== null) {
              var y;
              try {
                y = l(n._value);
              } catch (m) {
                return void v(u.promise, m);
              }
              p(u.promise, y);
            } else
              (n._state === 1 ? p : v)(u.promise, n._value);
          })) : n._deferreds.push(u);
        }
        function p(n, u) {
          try {
            if (u === n)
              throw new TypeError("A promise cannot be resolved with itself.");
            if (u && (typeof u == "object" || typeof u == "function")) {
              var l = u.then;
              if (u instanceof a)
                return n._state = 3, n._value = u, void b(n);
              if (typeof l == "function")
                return void e((y = l, m = u, function() {
                  y.apply(m, arguments);
                }), n);
            }
            n._state = 1, n._value = u, b(n);
          } catch (f) {
            v(n, f);
          }
          var y, m;
        }
        function v(n, u) {
          n._state = 2, n._value = u, b(n);
        }
        function b(n) {
          n._state === 2 && n._deferreds.length === 0 && a._immediateFn(function() {
            n._handled || a._unhandledRejectionFn(n._value);
          });
          for (var u = 0, l = n._deferreds.length; u < l; u++)
            h(n, n._deferreds[u]);
          n._deferreds = null;
        }
        function w(n, u, l) {
          this.onFulfilled = typeof n == "function" ? n : null, this.onRejected = typeof u == "function" ? u : null, this.promise = l;
        }
        function e(n, u) {
          var l = !1;
          try {
            n(function(y) {
              l || (l = !0, p(u, y));
            }, function(y) {
              l || (l = !0, v(u, y));
            });
          } catch (y) {
            if (l)
              return;
            l = !0, v(u, y);
          }
        }
        a.prototype.catch = function(n) {
          return this.then(null, n);
        }, a.prototype.then = function(n, u) {
          var l = new this.constructor(g);
          return h(this, new w(n, u, l)), l;
        }, a.prototype.finally = t.a, a.all = function(n) {
          return new a(function(u, l) {
            if (!n || n.length === void 0)
              throw new TypeError("Promise.all accepts an array");
            var y = Array.prototype.slice.call(n);
            if (y.length === 0)
              return u([]);
            var m = y.length;
            function f(S, C) {
              try {
                if (C && (typeof C == "object" || typeof C == "function")) {
                  var k = C.then;
                  if (typeof k == "function")
                    return void k.call(C, function(F) {
                      f(S, F);
                    }, l);
                }
                y[S] = C, --m == 0 && u(y);
              } catch (F) {
                l(F);
              }
            }
            for (var _ = 0; _ < y.length; _++)
              f(_, y[_]);
          });
        }, a.resolve = function(n) {
          return n && typeof n == "object" && n.constructor === a ? n : new a(function(u) {
            u(n);
          });
        }, a.reject = function(n) {
          return new a(function(u, l) {
            l(n);
          });
        }, a.race = function(n) {
          return new a(function(u, l) {
            for (var y = 0, m = n.length; y < m; y++)
              n[y].then(u, l);
          });
        }, a._immediateFn = typeof i == "function" && function(n) {
          i(n);
        } || function(n) {
          c(n, 0);
        }, a._unhandledRejectionFn = function(n) {
          typeof console < "u" && console && console.warn("Possible Unhandled Promise Rejection:", n);
        }, d.a = a;
      }).call(this, r(5).setImmediate);
    }, function(s, d, r) {
      d.a = function(i) {
        var t = this.constructor;
        return this.then(function(c) {
          return t.resolve(i()).then(function() {
            return c;
          });
        }, function(c) {
          return t.resolve(i()).then(function() {
            return t.reject(c);
          });
        });
      };
    }, function(s, d, r) {
      function i(e) {
        return (i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        })(e);
      }
      r(4);
      var t, c, g, a, h, p, v, b = r(8), w = (c = function(e) {
        return new Promise(function(n, u) {
          e = a(e), (e = h(e)).beforeSend && e.beforeSend();
          var l = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject("Microsoft.XMLHTTP");
          l.open(e.method, e.url), l.setRequestHeader("X-Requested-With", "XMLHttpRequest"), Object.keys(e.headers).forEach(function(m) {
            var f = e.headers[m];
            l.setRequestHeader(m, f);
          });
          var y = e.ratio;
          l.upload.addEventListener("progress", function(m) {
            var f = Math.round(m.loaded / m.total * 100), _ = Math.ceil(f * y / 100);
            e.progress(Math.min(_, 100));
          }, !1), l.addEventListener("progress", function(m) {
            var f = Math.round(m.loaded / m.total * 100), _ = Math.ceil(f * (100 - y) / 100) + y;
            e.progress(Math.min(_, 100));
          }, !1), l.onreadystatechange = function() {
            if (l.readyState === 4) {
              var m = l.response;
              try {
                m = JSON.parse(m);
              } catch {
              }
              var f = b.parseHeaders(l.getAllResponseHeaders()), _ = { body: m, code: l.status, headers: f };
              v(l.status) ? n(_) : u(_);
            }
          }, l.send(e.data);
        });
      }, g = function(e) {
        return e.method = "POST", c(e);
      }, a = function() {
        var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        if (e.url && typeof e.url != "string")
          throw new Error("Url must be a string");
        if (e.url = e.url || "", e.method && typeof e.method != "string")
          throw new Error("`method` must be a string or null");
        if (e.method = e.method ? e.method.toUpperCase() : "GET", e.headers && i(e.headers) !== "object")
          throw new Error("`headers` must be an object or null");
        if (e.headers = e.headers || {}, e.type && (typeof e.type != "string" || !Object.values(t).includes(e.type)))
          throw new Error("`type` must be taken from module's «contentType» library");
        if (e.progress && typeof e.progress != "function")
          throw new Error("`progress` must be a function or null");
        if (e.progress = e.progress || function(n) {
        }, e.beforeSend = e.beforeSend || function(n) {
        }, e.ratio && typeof e.ratio != "number")
          throw new Error("`ratio` must be a number");
        if (e.ratio < 0 || e.ratio > 100)
          throw new Error("`ratio` must be in a 0-100 interval");
        if (e.ratio = e.ratio || 90, e.accept && typeof e.accept != "string")
          throw new Error("`accept` must be a string with a list of allowed mime-types");
        if (e.accept = e.accept || "*/*", e.multiple && typeof e.multiple != "boolean")
          throw new Error("`multiple` must be a true or false");
        if (e.multiple = e.multiple || !1, e.fieldName && typeof e.fieldName != "string")
          throw new Error("`fieldName` must be a string");
        return e.fieldName = e.fieldName || "files", e;
      }, h = function(e) {
        switch (e.method) {
          case "GET":
            var n = p(e.data, t.URLENCODED);
            delete e.data, e.url = /\?/.test(e.url) ? e.url + "&" + n : e.url + "?" + n;
            break;
          case "POST":
          case "PUT":
          case "DELETE":
          case "UPDATE":
            var u = function() {
              return (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}).type || t.JSON;
            }(e);
            (b.isFormData(e.data) || b.isFormElement(e.data)) && (u = t.FORM), e.data = p(e.data, u), u !== w.contentType.FORM && (e.headers["content-type"] = u);
        }
        return e;
      }, p = function() {
        var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        switch (arguments.length > 1 ? arguments[1] : void 0) {
          case t.URLENCODED:
            return b.urlEncode(e);
          case t.JSON:
            return b.jsonEncode(e);
          case t.FORM:
            return b.formEncode(e);
          default:
            return e;
        }
      }, v = function(e) {
        return e >= 200 && e < 300;
      }, { contentType: t = { URLENCODED: "application/x-www-form-urlencoded; charset=utf-8", FORM: "multipart/form-data", JSON: "application/json; charset=utf-8" }, request: c, get: function(e) {
        return e.method = "GET", c(e);
      }, post: g, transport: function(e) {
        return e = a(e), b.selectFiles(e).then(function(n) {
          for (var u = new FormData(), l = 0; l < n.length; l++)
            u.append(e.fieldName, n[l], n[l].name);
          b.isObject(e.data) && Object.keys(e.data).forEach(function(m) {
            var f = e.data[m];
            u.append(m, f);
          });
          var y = e.beforeSend;
          return e.beforeSend = function() {
            return y(n);
          }, e.data = u, g(e);
        });
      }, selectFiles: function(e) {
        return delete (e = a(e)).beforeSend, b.selectFiles(e);
      } });
      s.exports = w;
    }, function(s, d, r) {
      r.r(d);
      var i = r(1);
      window.Promise = window.Promise || i.a;
    }, function(s, d, r) {
      (function(i) {
        var t = i !== void 0 && i || typeof self < "u" && self || window, c = Function.prototype.apply;
        function g(a, h) {
          this._id = a, this._clearFn = h;
        }
        d.setTimeout = function() {
          return new g(c.call(setTimeout, t, arguments), clearTimeout);
        }, d.setInterval = function() {
          return new g(c.call(setInterval, t, arguments), clearInterval);
        }, d.clearTimeout = d.clearInterval = function(a) {
          a && a.close();
        }, g.prototype.unref = g.prototype.ref = function() {
        }, g.prototype.close = function() {
          this._clearFn.call(t, this._id);
        }, d.enroll = function(a, h) {
          clearTimeout(a._idleTimeoutId), a._idleTimeout = h;
        }, d.unenroll = function(a) {
          clearTimeout(a._idleTimeoutId), a._idleTimeout = -1;
        }, d._unrefActive = d.active = function(a) {
          clearTimeout(a._idleTimeoutId);
          var h = a._idleTimeout;
          h >= 0 && (a._idleTimeoutId = setTimeout(function() {
            a._onTimeout && a._onTimeout();
          }, h));
        }, r(6), d.setImmediate = typeof self < "u" && self.setImmediate || i !== void 0 && i.setImmediate || this && this.setImmediate, d.clearImmediate = typeof self < "u" && self.clearImmediate || i !== void 0 && i.clearImmediate || this && this.clearImmediate;
      }).call(this, r(0));
    }, function(s, d, r) {
      (function(i, t) {
        (function(c, g) {
          if (!c.setImmediate) {
            var a, h, p, v, b, w = 1, e = {}, n = !1, u = c.document, l = Object.getPrototypeOf && Object.getPrototypeOf(c);
            l = l && l.setTimeout ? l : c, {}.toString.call(c.process) === "[object process]" ? a = function(f) {
              t.nextTick(function() {
                m(f);
              });
            } : function() {
              if (c.postMessage && !c.importScripts) {
                var f = !0, _ = c.onmessage;
                return c.onmessage = function() {
                  f = !1;
                }, c.postMessage("", "*"), c.onmessage = _, f;
              }
            }() ? (v = "setImmediate$" + Math.random() + "$", b = function(f) {
              f.source === c && typeof f.data == "string" && f.data.indexOf(v) === 0 && m(+f.data.slice(v.length));
            }, c.addEventListener ? c.addEventListener("message", b, !1) : c.attachEvent("onmessage", b), a = function(f) {
              c.postMessage(v + f, "*");
            }) : c.MessageChannel ? ((p = new MessageChannel()).port1.onmessage = function(f) {
              m(f.data);
            }, a = function(f) {
              p.port2.postMessage(f);
            }) : u && "onreadystatechange" in u.createElement("script") ? (h = u.documentElement, a = function(f) {
              var _ = u.createElement("script");
              _.onreadystatechange = function() {
                m(f), _.onreadystatechange = null, h.removeChild(_), _ = null;
              }, h.appendChild(_);
            }) : a = function(f) {
              setTimeout(m, 0, f);
            }, l.setImmediate = function(f) {
              typeof f != "function" && (f = new Function("" + f));
              for (var _ = new Array(arguments.length - 1), S = 0; S < _.length; S++)
                _[S] = arguments[S + 1];
              var C = { callback: f, args: _ };
              return e[w] = C, a(w), w++;
            }, l.clearImmediate = y;
          }
          function y(f) {
            delete e[f];
          }
          function m(f) {
            if (n)
              setTimeout(m, 0, f);
            else {
              var _ = e[f];
              if (_) {
                n = !0;
                try {
                  (function(S) {
                    var C = S.callback, k = S.args;
                    switch (k.length) {
                      case 0:
                        C();
                        break;
                      case 1:
                        C(k[0]);
                        break;
                      case 2:
                        C(k[0], k[1]);
                        break;
                      case 3:
                        C(k[0], k[1], k[2]);
                        break;
                      default:
                        C.apply(g, k);
                    }
                  })(_);
                } finally {
                  y(f), n = !1;
                }
              }
            }
          }
        })(typeof self > "u" ? i === void 0 ? this : i : self);
      }).call(this, r(0), r(7));
    }, function(s, d) {
      var r, i, t = s.exports = {};
      function c() {
        throw new Error("setTimeout has not been defined");
      }
      function g() {
        throw new Error("clearTimeout has not been defined");
      }
      function a(l) {
        if (r === setTimeout)
          return setTimeout(l, 0);
        if ((r === c || !r) && setTimeout)
          return r = setTimeout, setTimeout(l, 0);
        try {
          return r(l, 0);
        } catch {
          try {
            return r.call(null, l, 0);
          } catch {
            return r.call(this, l, 0);
          }
        }
      }
      (function() {
        try {
          r = typeof setTimeout == "function" ? setTimeout : c;
        } catch {
          r = c;
        }
        try {
          i = typeof clearTimeout == "function" ? clearTimeout : g;
        } catch {
          i = g;
        }
      })();
      var h, p = [], v = !1, b = -1;
      function w() {
        v && h && (v = !1, h.length ? p = h.concat(p) : b = -1, p.length && e());
      }
      function e() {
        if (!v) {
          var l = a(w);
          v = !0;
          for (var y = p.length; y; ) {
            for (h = p, p = []; ++b < y; )
              h && h[b].run();
            b = -1, y = p.length;
          }
          h = null, v = !1, function(m) {
            if (i === clearTimeout)
              return clearTimeout(m);
            if ((i === g || !i) && clearTimeout)
              return i = clearTimeout, clearTimeout(m);
            try {
              i(m);
            } catch {
              try {
                return i.call(null, m);
              } catch {
                return i.call(this, m);
              }
            }
          }(l);
        }
      }
      function n(l, y) {
        this.fun = l, this.array = y;
      }
      function u() {
      }
      t.nextTick = function(l) {
        var y = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var m = 1; m < arguments.length; m++)
            y[m - 1] = arguments[m];
        p.push(new n(l, y)), p.length !== 1 || v || a(e);
      }, n.prototype.run = function() {
        this.fun.apply(null, this.array);
      }, t.title = "browser", t.browser = !0, t.env = {}, t.argv = [], t.version = "", t.versions = {}, t.on = u, t.addListener = u, t.once = u, t.off = u, t.removeListener = u, t.removeAllListeners = u, t.emit = u, t.prependListener = u, t.prependOnceListener = u, t.listeners = function(l) {
        return [];
      }, t.binding = function(l) {
        throw new Error("process.binding is not supported");
      }, t.cwd = function() {
        return "/";
      }, t.chdir = function(l) {
        throw new Error("process.chdir is not supported");
      }, t.umask = function() {
        return 0;
      };
    }, function(s, d, r) {
      function i(c, g) {
        for (var a = 0; a < g.length; a++) {
          var h = g[a];
          h.enumerable = h.enumerable || !1, h.configurable = !0, "value" in h && (h.writable = !0), Object.defineProperty(c, h.key, h);
        }
      }
      var t = r(9);
      s.exports = function() {
        function c() {
          (function(p, v) {
            if (!(p instanceof v))
              throw new TypeError("Cannot call a class as a function");
          })(this, c);
        }
        var g, a, h;
        return g = c, h = [{ key: "urlEncode", value: function(p) {
          return t(p);
        } }, { key: "jsonEncode", value: function(p) {
          return JSON.stringify(p);
        } }, { key: "formEncode", value: function(p) {
          if (this.isFormData(p))
            return p;
          if (this.isFormElement(p))
            return new FormData(p);
          if (this.isObject(p)) {
            var v = new FormData();
            return Object.keys(p).forEach(function(b) {
              var w = p[b];
              v.append(b, w);
            }), v;
          }
          throw new Error("`data` must be an instance of Object, FormData or <FORM> HTMLElement");
        } }, { key: "isObject", value: function(p) {
          return Object.prototype.toString.call(p) === "[object Object]";
        } }, { key: "isFormData", value: function(p) {
          return p instanceof FormData;
        } }, { key: "isFormElement", value: function(p) {
          return p instanceof HTMLFormElement;
        } }, { key: "selectFiles", value: function() {
          var p = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          return new Promise(function(v, b) {
            var w = document.createElement("INPUT");
            w.type = "file", p.multiple && w.setAttribute("multiple", "multiple"), p.accept && w.setAttribute("accept", p.accept), w.style.display = "none", document.body.appendChild(w), w.addEventListener("change", function(e) {
              var n = e.target.files;
              v(n), document.body.removeChild(w);
            }, !1), w.click();
          });
        } }, { key: "parseHeaders", value: function(p) {
          var v = p.trim().split(/[\r\n]+/), b = {};
          return v.forEach(function(w) {
            var e = w.split(": "), n = e.shift(), u = e.join(": ");
            n && (b[n] = u);
          }), b;
        } }], (a = null) && i(g.prototype, a), h && i(g, h), c;
      }();
    }, function(s, d) {
      var r = function(t) {
        return encodeURIComponent(t).replace(/[!'()*]/g, escape).replace(/%20/g, "+");
      }, i = function(t, c, g, a) {
        return c = c || null, g = g || "&", a = a || null, t ? function(h) {
          for (var p = new Array(), v = 0; v < h.length; v++)
            h[v] && p.push(h[v]);
          return p;
        }(Object.keys(t).map(function(h) {
          var p, v, b = h;
          if (a && (b = a + "[" + b + "]"), typeof t[h] == "object" && t[h] !== null)
            p = i(t[h], null, g, b);
          else {
            c && (v = b, b = !isNaN(parseFloat(v)) && isFinite(v) ? c + Number(b) : b);
            var w = t[h];
            w = (w = (w = (w = w === !0 ? "1" : w) === !1 ? "0" : w) === 0 ? "0" : w) || "", p = r(b) + "=" + r(w);
          }
          return p;
        })).join(g).replace(/[!'()*]/g, "") : "";
      };
      s.exports = i;
    }]);
  });
})(j);
var R = j.exports;
const M = /* @__PURE__ */ H(R);
class B {
  /**
   * @param {object} params - uploader module params
   * @param {ImageConfig} params.config - image tool config
   */
  constructor({ config: o }) {
    this.config = o;
  }
  /**
   * Handle clicks on the upload file button
   */
  uploadSelectedFiles(o, { onPreview: s, onUpload: d, onError: r }) {
    M.selectFiles({
      accept: this.config.types,
      multiple: !0
    }).then((i) => {
      let t = 0;
      for (var c = 0; c < i.length && !(o !== null && t == o); c++) {
        t++;
        let g = i[c], a = s(g), h;
        if (this.config.uploader && typeof this.config.uploader.uploadByFile == "function") {
          const p = this.config.uploader.uploadByFile(g);
          A(p) || console.warn("Custom uploader method uploadByFile should return a Promise"), h = p;
        } else
          h = this.uploadByFile(g);
        h.then((p) => {
          d(p, a);
        }).catch((p) => {
          r(p, a);
        });
      }
    });
  }
  /**
   * Default file uploader
   * Fires ajax.post()
   *
   * @param {File} file - file pasted by drag-n-drop
   */
  uploadByFile(o) {
    const s = new FormData();
    return s.append(this.config.field, o), this.config.additionalRequestData && Object.keys(this.config.additionalRequestData).length && Object.entries(this.config.additionalRequestData).forEach(([d, r]) => {
      s.append(d, r);
    }), M.post({
      url: this.config.endpoints.byFile,
      data: s,
      type: M.contentType.JSON,
      headers: this.config.additionalRequestHeaders
    }).then((d) => d.body);
  }
}
function A(E) {
  return E && typeof E.then == "function";
}
/**
 * Image Gallery Tool for the Editor.js
 *
 * @author Igor Shuvalov «VolgaIgor»
 * @license MIT
 * @see {@link https://github.com/VolgaIgor/editorjs-gallery}
 *
 * To developers.
 * To simplify Tool structure, we split it to 4 parts:
 *  1) index.js — main Tool's interface, public API and methods for working with data
 *  2) uploader.js — module that has methods for sending files via AJAX: from device, by URL or File pasting
 *  3) ui.js — module for UI manipulations: render, showing preloader, etc
 *  4) tunes.js — working with Block Tunes: render buttons, handle clicks
 *
 * For debug purposes there is a testing server
 * that can save uploaded files and return a Response {@link UploadResponseFormat}
 *
 *       $ node dev/server.js
 *
 * It will expose 8008 port, so you can pass http://localhost:8008 with the Tools config:
 *
 * gallery: {
 *   class: ImageGallery,
 *   config: {
 *     endpoints: {
 *       byFile: 'http://localhost:8008/uploadFile',
 *     }
 *   },
 * },
 */
class Z {
  /**
   * Notify core that read-only mode is supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return !0;
  }
  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @returns {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon: D,
      title: "Gallery"
    };
  }
  /**
   * @param {object} tool - tool properties got from editor.js
   * @param {ImageGalleryData} tool.data - previously saved data
   * @param {ImageConfig} tool.config - user config for Tool
   * @param {object} tool.api - Editor.js API
   * @param {boolean} tool.readOnly - read-only mode flag
   */
  constructor({ data: o, config: s, api: d, readOnly: r }) {
    this.api = d, this.readOnly = r, this.config = {
      endpoints: s.endpoints || "",
      additionalRequestData: s.additionalRequestData || {},
      additionalRequestHeaders: s.additionalRequestHeaders || {},
      field: s.field || "image",
      types: s.types || "image/*",
      buttonContent: s.buttonContent || "",
      uploader: s.uploader || void 0,
      actions: s.actions || void 0,
      maxElementCount: s.maxElementCount || void 0,
      sortableJs: s.sortableJs
    }, this.uploader = new B({
      config: this.config
    }), this.ui = new T({
      api: d,
      config: this.config,
      onSelectFile: () => {
        let i = this.config.maxElementCount ? this.config.maxElementCount - this._data.files.length : null;
        this.uploader.uploadSelectedFiles(i, {
          onPreview: (t) => this.ui.getPreloader(t),
          onUpload: (t, c) => {
            this.onUpload(t, c);
          },
          onError: (t, c) => {
            this.uploadingFailed(t, c);
          }
        });
      },
      onDeleteFile: (i) => {
        this.deleteImage(i);
      },
      onMoveFile: (i, t) => {
        this.moveImage(i, t);
      },
      readOnly: r
    }), this.tunes = new O({
      api: d,
      actions: this.config.actions,
      onChange: (i) => this.styleToggled(i)
    }), this._data = {}, this.data = o;
  }
  /**
   * Renders Block content
   *
   * @public
   *
   * @returns {HTMLDivElement}
   */
  render() {
    return this.ui.render(this.data);
  }
  rendered() {
    return this.checkMaxElemCount(), this.ui.onRendered();
  }
  /**
   * Validate data: check if Image exists
   *
   * @param {ImageGalleryData} savedData — data received after saving
   * @returns {boolean} false if saved data is not correct, otherwise true
   * @public
   */
  validate(o) {
    return !(!o.files || !o.files.length);
  }
  /**
   * Return Block data
   *
   * @public
   *
   * @returns {ImageGalleryData}
   */
  save() {
    const o = this.ui.nodes.caption;
    return this._data.caption = o.innerHTML, this.data;
  }
  /**
   * Makes buttons with tunes
   *
   * @public
   *
   * @returns {Element}
   */
  renderSettings() {
    return this.tunes.render(this.data);
  }
  /**
   * Set new image file
   *
   * @private
   *
   * @param {ImageGalleryDataFile} file - uploaded file data
   */
  appendImage(o) {
    if (o && o.url) {
      if (this.config.maxElementCount && this._data.files.length >= this.config.maxElementCount)
        return;
      this._data.files.push(o), this.ui.appendImage(o), this.checkMaxElemCount();
    }
  }
  /**
   * Move image file
   *
   * @private
   *
   * @param {integer} from - target image old index
   * @param {integer} to - target image new index
   */
  moveImage(o, s) {
    s >= this._data.files.length && (s = this._data.files.length - 1), this._data.files.splice(s, 0, this._data.files.splice(o, 1)[0]);
  }
  /**
   * Delete image file
   *
   * @private
   *
   * @param {integer} id - image index
   */
  deleteImage(o) {
    this._data.files[o] !== void 0 && (this._data.files.splice(o, 1), this.checkMaxElemCount());
  }
  /**
   * Private methods
   * ̿̿ ̿̿ ̿̿ ̿'̿'\̵͇̿̿\з= ( ▀ ͜͞ʖ▀) =ε/̵͇̿̿/’̿’̿ ̿ ̿̿ ̿̿ ̿̿
   */
  /**
   * Stores all Tool's data
   *
   * @private
   *
   * @param {ImageGalleryData} data - data in Image Tool format
   */
  set data(o) {
    this._data.files = [], o.files && o.files.forEach((d) => {
      this.appendImage(d);
    }), this._data.caption = o.caption || "", this.ui.fillCaption(this._data.caption);
    let s = o.style || "";
    this.styleToggled(s);
  }
  /**
   * Return Tool data
   *
   * @private
   *
   * @returns {ImageGalleryData}
   */
  get data() {
    return this._data;
  }
  /**
   * File uploading callback
   *
   * @private
   *
   * @param {UploadResponseFormat} response - uploading server response
   * @returns {void}
   */
  onUpload(o, s) {
    this.ui.removePreloader(s), o.success && o.file ? this.appendImage(o.file) : this.uploadingFailed("incorrect response: " + JSON.stringify(o));
  }
  /**
   * Handle uploader errors
   *
   * @private
   * @param {string} errorText - uploading error text
   * @returns {void}
   */
  uploadingFailed(o, s) {
    this.ui.removePreloader(s), console.log("Image Tool: uploading failed because of", o), this.api.notifier.show({
      message: this.api.i18n.t("Couldn’t upload image. Please try another."),
      style: "error"
    });
  }
  /**
   * Callback fired when Block Tune is activated
   *
   * @private
   *
   * @param {string} tuneName - tune that has been clicked
   * @returns {void}
   */
  styleToggled(o) {
    o === "fit" ? this._data.style = "fit" : this._data.style = "slider";
  }
  checkMaxElemCount() {
    this.ui.updateLimitCounter(this._data.files.length, this.config.maxElementCount), this.config.maxElementCount && this._data.files.length >= this.config.maxElementCount ? this.ui.hideFileButton() : this.ui.showFileButton();
  }
}
export {
  Z as default
};
