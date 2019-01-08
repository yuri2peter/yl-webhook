"use strict";

var WebHook = require('../index');

new WebHook({
  '/test': WebHook.scriptTest,
  '/shell': WebHook.scriptShell
}, 5225).start();
//# sourceMappingURL=index.js.map