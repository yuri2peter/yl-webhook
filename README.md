# yl-webhook

Just a webhook for GET request.Load script from local file.

# Install

`npm i yl-webhook`

# How to Use

```javascript
const WebHook = require('yl-webhook');

(new WebHook({
  // GET http://127.0.0.1:5225/test?a=A&b=B
  // The console will log 'Webhook received. \nParams: {"a":"A","b":"B"}'
  '/test':async (query) => {
      console.log(`Webhook received. \nParams: ${JSON.stringify(query)}`);
   },
}, 5225)).start();

```

# API

### WebHook.construct(scripts = {}, port = 5225)

#### scripts

K-V object. The key is path of the webhook request URL. The value is method(recommend Promise or async function) will be executed.

#### port

The port will be listened.

### WebHook.scriptTest

A simple method for example.

> See more information at "Quick Start".

### WebHook.scriptShell

Web shell. Powerful but dangerous. Make sure that you know what you are doing.

Pass a query with field 'cmd' to use it.

For example : `GET http://127.0.0.1:5225/?cmd=ping%20www.baidu.com`

> See more information at "Quick Start".

# Quick Start

```javascript
const WebHook = require('yl-webhook');

(new WebHook({
  '/test': WebHook.scriptTest,
  '/shell': WebHook.scriptShell,
}, 5225)).start();
```
