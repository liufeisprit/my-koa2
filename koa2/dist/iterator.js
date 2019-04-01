'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(makeGenIterator);

function makeIterator(arr) {
    var nextIndex = 0;
    return {
        next: function next() {
            if (nextIndex < arr.length) {
                return {
                    value: arr[nextIndex++],
                    done: false
                };
            } else {
                return {
                    done: true
                };
            }
        }
    };
}
var arr = ['吃饭', '睡觉', '打豆豆'];
//  const it=makeIterator(arr)
//  console.log(it.next().value)
//  console.log(it.next().value)
//  console.log(it.next().value)
//  console.log(it.next().done)
function makeGenIterator(arr) {
    var i;
    return _regenerator2.default.wrap(function makeGenIterator$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    i = 0;

                case 1:
                    if (!(i < arr.length)) {
                        _context.next = 7;
                        break;
                    }

                    _context.next = 4;
                    return arr[i];

                case 4:
                    i++;
                    _context.next = 1;
                    break;

                case 7:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}
var gen = makeGenIterator(arr);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().done);
//# sourceMappingURL=iterator.js.map