import express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { RouterContext, match, browserHistory } from 'react-router';
import routes from './src/js/common/routes';
import store from './src/js/common/store';

const app = express();
const port = 3000;

app.use('/js', express.static('public/js'));
app.use('/img', express.static('public/img'));

// This is fired every time the server side receives a request
app.use(handleRender);

function handleRender(req, res) {
  // Create a new Redux store instance
  match({ routes, location: req.originalUrl }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end('Internal server error');
    }
    if (!renderProps) {
      return res.status(404).end('Not found.');
    }

    // Render the component to a string
    const html = renderToString(
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>,
    );

    // Grab the initial state from our Redux store
    const preloadedState = store.getState();

    // Send the rendered page back to the client
    res.send(renderFullPage(html, preloadedState));
  });
}

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="google-site-verification" content="lM0Zw8iYFyjkcI17heyT4fMnvP0hDoTT2gKidcMrMrA" />
        <meta name="viewport" content="width=device-width" />
        <title>The Botanic Magazine or, Flower-Garden Displayed</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Libre+Baskerville">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
        <script type="text/javascript" src="/js/tbm.js"></script>
      </body>
    </html>
    `
}

app.listen(port);

export default app;
