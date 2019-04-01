'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var init = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var data;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return readAsync('./package.json');

                    case 2:
                        data = _context2.sent;

                        data = JSON.parse(data);
                        console.log('async');
                        // console.log(data)

                    case 5:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function init() {
        return _ref.apply(this, arguments);
    };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fs = require('fs');
var util = require('util');
var co = require('co');
function readFile(cb) {
    fs.readFiles('./package.json', function (err, data) {
        if (err) return cb(err);
        cb && cb(null, data);
    });
}
//回调函数实现异步
readFile(function (err, data) {
    if (!err) {
        data = JSON.parse(data);
        console.log('callback');
        // console.log(data)
    }
});
//promise
function readFileAsync(path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, function (err, data) {
            if (err) reject(err);else resolve(data);
        });
    });
}
readFileAsync('./package.json').then(function (data) {
    data = JSON.parse(data);
    // console.log(data.name)
    console.log('Promise');
}).catch(function (err) {
    console.log(err);
});
//第三阶段 generator co
co( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var data;
    return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return util.promisify(fs.readFile)('./package.json');

                case 2:
                    data = _context.sent;

                    data = JSON.parse(data);
                    // console.log(data)
                    console.log('co');

                case 5:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this);
}));
//第四阶段 async 
var readAsync = util.promisify(fs.readFile);

init();
//# sourceMappingURL=async.js.map