'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getName2 = exports.age2 = exports.name2 = exports.test = exports.getName = exports.name = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var test = exports.test = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        console.log('test');

                    case 1:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function test() {
        return _ref.apply(this, arguments);
    };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var name = exports.name = 'Duke';
var getName = exports.getName = function getName() {
    return name;
};
var age = 19;
exports.default = age;

var a = {
    test: test()
};
console.log(Date.now() + 'ex.js');
exports.name2 = name;
exports.age2 = age;
exports.getName2 = getName;
//# sourceMappingURL=ex.js.map