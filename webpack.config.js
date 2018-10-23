const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");

const jiraUsername = "seanprice@sevenhillstechnology.com";
const jiraApiKey = "5YBRbslcdecIOMToifDZ52A5";
const jiraBase64Auth = Buffer.from(`${jiraUsername}:${jiraApiKey}`).toString("base64");
const jiraAuthHeaderValue = `Basic ${jiraBase64Auth}`;

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(s*)css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|gif|jpg|cur|ttf|svg|woff|eot)$/i,
                loader: 'url-loader', options: { limit: 8192 }
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js"]
    },
    target: "node",
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            inject: true
        }),
        new webpack.DefinePlugin({
            JIRA_API_BASE_URL: JSON.stringify(process.env.JIRA_API_BASE_URL || "https://sevenhillstechnology.atlassian.net/rest/api/3"),
            JIRA_API_AUTH_HEADER_VALUE: JSON.stringify(process.env.JIRA_API_AUTH_HEADER_VALUE || jiraAuthHeaderValue)
        })
    ]
};
