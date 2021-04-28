module.exports = {
    entry: './src/app/index.js',
    output:{
        path: __dirname + '/src/public',
        filename: 'bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.html$/i,
            loader: 'html-loader',
          },
        ],
    }
};