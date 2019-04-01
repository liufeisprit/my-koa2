'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var init = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var data;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _util.promisify)(_fs.readFile)((0, _path.resolve)(__dirname, '../package.json'));

                    case 2:
                        data = _context.sent;

                        data = JSON.parse(data);
                        console.log(data.name);

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function init() {
        return _ref.apply(this, arguments);
    };
}();

var _util = require('util');

var _path = require('path');

var _fs = require('fs');

var _ex = require('./ex');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// import * as qs from 'querystring'
// promisify(readFile)(r(__dirname,'../package.json'))
//     .then(data=>{
//         data=JSON.parse(data)
//         console.log(data.name)
//         wfs(r(__dirname,'./name'),String(data.name),'utf-8')
//     })
// import {name} from './ex'
//import会提升到顶部 被import的js会第一次执行一遍
console.log(Date.now() + 'index.js');
console.log((0, _ex.getName2)() + 'fe');
// import {getName} from './ex'
// import  age from './ex'

// console.log(name)
console.log((0, _ex.getName2)());
console.log((0, _path.resolve)(__dirname));

init();
//# sourceMappingURL=index.js.map