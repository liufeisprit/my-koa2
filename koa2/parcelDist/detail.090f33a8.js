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
})({"views/movie/detail.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lib = require("../../lib");

var _antd = require("antd");

var _reactRouterDom = require("react-router-dom");

var _moment = _interopRequireDefault(require("moment"));

require("moment/locale/zh-cn");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const site = 'http://puzvb5scj.bkt.clouddn.com/';
const DPlayer = window.DPlayer;
const TabPane = _antd.Tabs.TabPane;

_moment.default.locale('zh-cn');

function callback(key) {
  console.log(key);
}

let MovieDetail = class MovieDetail extends _react.Component {
  constructor(props) {
    super(props);

    this._getMovieDetail = () => {
      (0, _lib.request)({
        method: 'get',
        url: `/v0/api/movies/${this.state._id}`
      }).then(data => {
        const {
          movie,
          relativeMovies
        } = data;
        const video = site + movie.videoKey;
        const pic = site + movie.coverKey;
        console.log('_getMovieDetail');
        this.setState({
          movie,
          relativeMovies
        }, () => {
          this.player = new DPlayer({
            container: document.getElementById('videoPlayer'),
            screenshot: true,
            video: {
              url: video,
              pic: pic,
              thumbnails: pic
            }
          });
        });
      }).catch(() => {
        console.log('catch'); //   this.props.history.goBack()
      });
    };

    this.state = {
      loading: false,
      relativeMovies: [],
      _id: this.props.match.params.id,
      movie: null,
      player: null
    };
  }

  componentDidMount() {
    this._getMovieDetail();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.setState({
        _id: nextProps.match.params.id
      }, this._getMovieDetail);
    }
  }

  render() {
    const {
      movie,
      relativeMovies
    } = this.state;
    if (!movie) return null;
    return _react.default.createElement("div", {
      className: "flex-row full"
    }, _react.default.createElement("div", {
      className: "page-shade"
    }, _react.default.createElement("div", {
      className: "video-wrapper"
    }, _react.default.createElement("div", {
      id: "videoPlayer",
      src: site + movie.coverKey,
      "data-video": site + movie.videoKey
    })), _react.default.createElement("div", {
      className: "video-sidebar"
    }, _react.default.createElement(_reactRouterDom.Link, {
      className: "homeLink",
      to: '/'
    }, "\u56DE\u5230\u9996\u9875"), _react.default.createElement(_antd.Tabs, {
      defaultActiveKey: "1",
      onChange: callback
    }, _react.default.createElement(TabPane, {
      tab: "\u5173\u4E8E\u672C\u7247",
      key: "1"
    }, _react.default.createElement("h1", null, movie.title), _react.default.createElement("dl", null, _react.default.createElement("dt", null, "\u8C46\u74E3\u8BC4\u5206\uFF1A", _react.default.createElement(_antd.Badge, {
      count: movie.rate,
      style: {
        backgroundColor: '#52c41a'
      }
    }), " \u5206"), _react.default.createElement("dt", null, "\u7535\u5F71\u5206\u7C7B\uFF1A", movie.tags && movie.tags.join(' ')), _react.default.createElement("dt", null, "\u66F4\u65B0\u65F6\u95F4\uFF1A", (0, _moment.default)(movie.meta.createdAt).fromNow()), _react.default.createElement("dt", null, "\u5F71\u7247\u4ECB\u7ECD\uFF1A"), _react.default.createElement("dd", null, movie.summary))), _react.default.createElement(TabPane, {
      tab: "\u540C\u7C7B\u7535\u5F71",
      key: "2"
    }, relativeMovies.map(item => _react.default.createElement(_reactRouterDom.Link, {
      key: item._id,
      className: "media",
      to: `/detail/${item._id}`
    }, _react.default.createElement("img", {
      width: "60",
      className: "align-self-center mr-3",
      src: site + item.posterKey,
      alt: item.rawTitle
    }), _react.default.createElement("div", {
      className: "media-body"
    }, _react.default.createElement("h6", {
      className: "media-title"
    }, item.title), _react.default.createElement("ul", {
      className: "list-unstyled"
    }, item.pubdate && item.pubdate.map((it, i) => _react.default.createElement("li", {
      key: i
    }, (0, _moment.default)(it.date).format('YYYY.MM'), " (", it.country, ")")))))))))));
  }

};
exports.default = MovieDetail;
},{"react":"../node_modules/react/index.js","../../lib":"lib/index.js","antd":"../node_modules/antd/es/index.js","react-router-dom":"../node_modules/react-router-dom/es/index.js","moment":"../node_modules/moment/moment.js","moment/locale/zh-cn":"../node_modules/moment/locale/zh-cn.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
//# sourceMappingURL=/detail.090f33a8.js.map