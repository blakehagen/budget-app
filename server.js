const _ = require('lodash');
const path = require('path');
const config = require('./webpack.config');
const express = require('./server/config/express.js');

const port = process.env.PORT || 8000;
const app = express();

console.log('process.env.NODE_ENV --> --> ', process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const compiler = webpack(config);
  const webpackMiddleware = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  });

  app.use(webpackMiddleware);
  app.use(webpackHotMiddleware(compiler));

  app.get('/', (req, res) => {
    const html = webpackMiddleware.fileSystem.readFileSync(path.join(__dirname, '/app/index.html')).toString();
    res.write(html);
    res.end();
  });
}

// TEST ROUTE //
app.get('/api/v1/test', (req, res) => {
  res.status(200).send('Light \'em up! We good to go!');
});

// // ROUTES // //
require('./server/api/auth/auth.routes')(app);
require('./server/api/users/user.routes')(app);
require('./server/api/budgets/budget.routes')(app);
require('./server/api/transactions/transaction.routes')(app);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'server/public/index.html'));
});

// // ERROR HANDLER // //
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (_.get(err, 'message')) {
    return res.status(400).json({ errorMessage: _.get(err, 'message', 'Error') });
  }

  return res.status(500).json({ errorMessage: 'Server error' });
});

app.listen(port, () => {
  console.log('Listening on port', port);
});
