import express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { RouterContext, match, browserHistory } from 'react-router';
import Helmet from "react-helmet";
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

    if (!renderProps || renderProps == undefined || renderProps.location.pathname == '/404') {
      res.status(404);
    }

    // Render the component to a string
    const html = renderToString(
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>,
    );
    const head = Helmet.rewind();

    // Grab the initial state from our Redux store
    const preloadedState = store.getState();

    // Send the rendered page back to the client
    res.send(renderFullPage(html, head, preloadedState));
  });
}

function renderFullPage(html, head, preloadedState) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="google-site-verification" content="lM0Zw8iYFyjkcI17heyT4fMnvP0hDoTT2gKidcMrMrA" />
        <meta name="viewport" content="width=device-width" />
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Libre+Baskerville" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Pinyon+Script" />
        <script type="text/javascript">
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
          ga('create', 'UA-88865548-1', 'auto');
          ga('send', 'pageview');
        </script>
      </head>
      <body>
        <div id="root">${html}</div>
        <script type="text/javascript">
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
        <script type="text/javascript" src="/js/tbm.js"></script>
      </body>
    </html>
    `
}

app.listen(port);

export default app;
