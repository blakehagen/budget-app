const _   = require('lodash');
const webpack              = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const path                 = require('path');
const config               = require('./webpack.config');
const express              = require('./server/config/express.js');
let port                   = process.env.PORT || 8000;
const app                  = express();
// console.log('NODE_ENV:', process.env.NODE_ENV);
// console.log('process.env:', process.env);

if (process.env !== 'production') {
  const compiler          = webpack(config);
  const webpackMiddleware = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
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

app.listen(port, () => {
  console.log('Listening on port', port);
});