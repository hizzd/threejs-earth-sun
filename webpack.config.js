const path = require('path');

module.exports = {
    entry: './src/main.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),

    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        host:"127.0.0.1",
        port: 9090,
    },
};
