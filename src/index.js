const http = require('http');
const url = require('url');
const { exec } = require('child_process');
const iconv = require('iconv-lite');

const decode = require('check-if-windows') ? stream => iconv.decode(stream, 'cp936') : v => v;
const HEADER = Object.freeze({
  'Content-Type': 'text/plain; charset=utf-8',
});

class WebHook {
  // A simple webhook script for test.
  static scriptTest = async (query) => {
    console.log(`Webhook received. \nParams: ${JSON.stringify(query)}`);
  };

  /**
   * Web shell. Powerful but dangerous. Make sure that you know what you are doing.
   * @param cmd {string} shell command
   * @return {Promise<*|void>}
   */
  static scriptShell = async ({ cmd }) => {
    if (cmd) {
      console.log('CMD:', cmd);
      return new Promise((resolve) => {
        exec(cmd, { encoding: 'buffer' }, (err,stdout, stderr) => {
          if(err){
            console.warn(stderr);
            resolve();
          } else {
            console.log(decode(stdout));
            resolve();
          }
        });
      });
    } else {
      console.log('CMD is required.');
    }
  };
  constructor(scripts = {}, port = 5225) {
    this.scripts = scripts;
    this.port = port;
  }
  start() {
    const { scripts, port } = this;
    http.createServer(async function(req, res){
      console.log(`\n${new Date().toLocaleString()} ${req.url}`);
      const parsed = url.parse(req.url, true);
      const { pathname, query } = parsed;
      if (scripts[pathname]) {
        try {
          const result = await scripts[pathname](query || {});
          res.writeHead(200, HEADER);
          res.end(typeof result === 'string'? result : 'Hook completed.');
          console.log(200);
        } catch (e) {
          res.writeHead(502, HEADER);
          res.end(`Error occured: ${e}`);
          console.warn(502, e);
        }
      } else {
        res.writeHead(404, HEADER);
        res.end('Hook not found');
        console.warn(404);
      }

    }).listen(port);
    console.log(`Server started at port ${port}.`);
  }
}

module.exports = WebHook;
