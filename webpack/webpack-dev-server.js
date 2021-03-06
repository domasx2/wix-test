import webpack  from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config  from './webpack.config.dev';

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    filename: config.output.filename,
    inline: true,
    hot: true,
    stats: true,
    historyApiFallback: true,
    headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Headers': 'X-Requested-With'
    }
}).listen(3001, '0.0.0.0', function (err) {
    if (err) {
        console.error(err);
    } else {
        console.log('webpack dev server listening on localhost:3001');
    }
});