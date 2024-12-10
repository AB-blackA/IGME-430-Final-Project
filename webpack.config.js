const path = require('path');

module.exports = {
    entry: {
        login: './client/login.jsx',
        home: './client/home.jsx',
        subpage: '/client/subpage.jsx',
        thread: './client/thread.jsx',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",

                },
            },
        ],
    },
    mode: 'production',
    watchOptions: {
        aggregateTimeout: 200,
    },
    output: {
        path: path.resolve(__dirname, 'hosted'),
        filename: '[name]bundle.js',
    },
};