"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-property");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.object.freeze");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var http = require('http');

var url = require('url');

var _require = require('child_process'),
    exec = _require.exec;

var iconv = require('iconv-lite');

var decode = require('check-if-windows') ? function (stream) {
  return iconv.decode(stream, 'cp936');
} : function (v) {
  return v;
};
var HEADER = Object.freeze({
  'Content-Type': 'text/plain; charset=utf-8'
});

var WebHook =
/*#__PURE__*/
function () {
  // A simple webhook script for test.

  /**
   * Web shell. Powerful but dangerous. Make sure that you know what you are doing.
   * @param cmd {string} shell command
   * @return {Promise<*|void>}
   */
  function WebHook() {
    var scripts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var port = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5225;

    _classCallCheck(this, WebHook);

    this.scripts = scripts;
    this.port = port;
  }

  _createClass(WebHook, [{
    key: "start",
    value: function start() {
      var scripts = this.scripts,
          port = this.port;
      http.createServer(
      /*#__PURE__*/
      function () {
        var _ref = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(req, res) {
          var parsed, pathname, query, result;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  console.log("\n".concat(new Date().toLocaleString(), " ").concat(req.url));
                  parsed = url.parse(req.url, true);
                  pathname = parsed.pathname, query = parsed.query;

                  if (!scripts[pathname]) {
                    _context.next = 20;
                    break;
                  }

                  _context.prev = 4;
                  _context.next = 7;
                  return scripts[pathname](query || {});

                case 7:
                  result = _context.sent;
                  res.writeHead(200, HEADER);
                  res.end(typeof result === 'string' ? result : 'Hook completed.');
                  console.log(200);
                  _context.next = 18;
                  break;

                case 13:
                  _context.prev = 13;
                  _context.t0 = _context["catch"](4);
                  res.writeHead(502, HEADER);
                  res.end("Error occured: ".concat(_context.t0));
                  console.warn(502, _context.t0);

                case 18:
                  _context.next = 23;
                  break;

                case 20:
                  res.writeHead(404, HEADER);
                  res.end('Hook not found');
                  console.warn(404);

                case 23:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[4, 13]]);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }()).listen(port);
      console.log("Server started at port ".concat(port, "."));
    }
  }]);

  return WebHook;
}();

WebHook.scriptTest =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(query) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log("Webhook received. \nParams: ".concat(JSON.stringify(query)));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x3) {
    return _ref2.apply(this, arguments);
  };
}();

WebHook.scriptShell =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(_ref3) {
    var cmd;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            cmd = _ref3.cmd;

            if (!cmd) {
              _context3.next = 6;
              break;
            }

            console.log('CMD:', cmd);
            return _context3.abrupt("return", new Promise(function (resolve) {
              exec(cmd, {
                encoding: 'buffer'
              }, function (err, stdout, stderr) {
                if (err) {
                  console.warn(stderr);
                  resolve();
                } else {
                  console.log(decode(stdout));
                  resolve();
                }
              });
            }));

          case 6:
            console.log('CMD is required.');

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x4) {
    return _ref4.apply(this, arguments);
  };
}();

module.exports = WebHook;
//# sourceMappingURL=index.js.map