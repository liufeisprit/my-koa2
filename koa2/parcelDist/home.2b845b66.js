// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"views/home/content.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _reactRouterDom = require("react-router-dom");

var _moment = _interopRequireDefault(require("moment"));

require("moment/locale/zh-cn");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const Meta = _antd.Card.Meta;

_moment.default.locale('zh-cn');

const site = 'http://puzvb5scj.bkt.clouddn.com/';
let Content = class Content extends _react.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      visible: false
    }, this._handelCancel = e => {
      this.setState({
        visible: false
      });
    }, this._handelClose = e => {
      if (this.player && this.player.pause) {
        this.player.pause();
      }
    }, this._jumpToDetail = () => {
      const {
        url
      } = this.props; // url&&window.open(url)
    }, this._showModal = movie => {
      this.setState({
        visible: true
      });
      const video = site + movie.videoKey;
      const pic = site + movie.coverKey;

      if (!this.player) {
        setTimeout(() => {
          this.player = new DPlayer({
            container: document.getElementsByClassName('videoModal')[0],
            screenshot: true,
            autoplay: true,
            video: {
              url: video,
              pic: pic,
              thumbnails: pic
            }
          });
        }, 500);
      } else {
        if (this.player.video.currentSrc !== video) {
          this.player.switchVideo({
            url: video,
            autoplay: true,
            pic: pic,
            type: 'auto'
          });
        }

        this.player.play();
      }
    }, _temp;
  }

  _renderContent() {
    const {
      movies
    } = this.props;
    return _react.default.createElement("div", {
      style: {
        padding: '30px'
      }
    }, _react.default.createElement(_antd.Row, null, movies.map((it, index) => _react.default.createElement(_antd.Col, {
      key: index,
      xl: {
        span: 6
      },
      lg: {
        span: 8
      },
      md: {
        span: 12
      },
      sm: {
        span: 24
      },
      style: {
        marginBottom: 8
      }
    }, _react.default.createElement(_antd.Card, {
      bordered: false,
      hoverable: true,
      style: {
        width: '100%'
      },
      actions: [_react.default.createElement(_antd.Badge, null, _react.default.createElement(_antd.Icon, {
        type: "clock-circle",
        style: {
          marginRight: 2
        }
      }), (0, _moment.default)(it.meta.createdAt).fromNow(true), "\u524D\u66F4\u65B0"), _react.default.createElement(_antd.Badge, null, _react.default.createElement(_antd.Icon, {
        type: "star",
        style: {
          marginRight: 2
        }
      }), it.rate, "\u5206")],
      cover: _react.default.createElement("img", {
        onClick: () => this._showModal(it),
        src: site + it.posterKey + '?imageMogr2/thumbnail/x1680/gravity/NorthWest/crop/1080x1600/blur/1x0/quality/75'
      }) // cover={<img src={it.poster}/>

    }, _react.default.createElement(Meta, {
      style: {
        height: '202px',
        overflow: 'hidden'
      },
      title: _react.default.createElement(_reactRouterDom.Link, {
        to: `/detail/${it._id}`
      }, it.title),
      onClick: this._jumpToDetail,
      description: _react.default.createElement(_reactRouterDom.Link, {
        to: `/detail/${it._id}`
      }, it.summary)
    }))))), _react.default.createElement(_antd.Modal, {
      className: "videoModal",
      visible: this.state.visible,
      footer: null,
      afterClose: this._handelClose,
      onCancel: this._handelCancel
    }, _react.default.createElement(_antd.Spin, {
      size: "large"
    })));
  }

  render() {
    return _react.default.createElement("div", {
      style: {
        padding: 10
      }
    }, this._renderContent());
  }

};
exports.default = Content;
},{"react":"../node_modules/react/index.js","antd":"../node_modules/antd/es/index.js","react-router-dom":"../node_modules/react-router-dom/es/index.js","moment":"../node_modules/moment/moment.js","moment/locale/zh-cn":"../node_modules/moment/locale/zh-cn.js"}],"views/home/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _default = _interopRequireDefault(require("../../layouts/default"));

var _lib = require("../../lib");

var _content = _interopRequireDefault(require("./content"));

var _antd = require("antd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

let Home = class Home extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      years: ['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019'],
      type: this.props.match.params.type,
      year: this.props.match.params.year,
      movies: [],
      selectedKey: '0'
    };
  }

  componentDidMount() {
    this._getAllMovies();
  }

  _getAllMovies() {
    (0, _lib.request)(window.__LOADING__)({
      method: 'get',
      url: `/v0/api/movies?type=${this.state.type || ''}&year=${this.state.year || ''}`
    }).then(res => {
      this.setState({
        movies: res
      });
    }).catch(() => {
      this.setState({
        movies: []
      });
    });
  }

  _renderContent() {
    const {
      movies
    } = this.state;

    if (!movies || !movies.length) {
      return null;
    }

    return _react.default.createElement(_content.default, {
      movies: movies
    });
  }

  _selectItem({
    key
  }) {
    this.setState({
      selectedKey: key
    });
  }

  render() {
    const {
      years,
      selectedKey
    } = this.state;
    return _react.default.createElement(_default.default, this.props, _react.default.createElement("div", {
      className: "flex-row full"
    }, _react.default.createElement(_antd.Menu, {
      defaultSelectedKeys: [selectedKey],
      mode: "inline",
      style: {
        height: '100%',
        overflowY: 'scroll',
        maxWidth: 230
      },
      onSelect: this._selectItem,
      className: "align-self-start"
    }, years && years.length ? years.map((e, i) => _react.default.createElement(_antd.Menu.Item, {
      key: i
    }, _react.default.createElement("a", {
      href: `/year/${e}`
    }, e, "\u5E74\u4E0A\u6620"))) : null), _react.default.createElement("div", {
      className: "flex-1 scroll-y align-self-start"
    }, this._renderContent())));
  }

};
exports.default = Home;
},{"react":"../node_modules/react/index.js","../../layouts/default":"layouts/default.js","../../lib":"lib/index.js","./content":"views/home/content.js","antd":"../node_modules/antd/es/index.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57906" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js"], null)
//# sourceMappingURL=/home.2b845b66.js.map