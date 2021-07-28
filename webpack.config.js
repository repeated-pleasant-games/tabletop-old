const path = require('path')


module.exports = {
    mode: "development",
    devtool: "source-map",
    devServer: {
        compress: true,
        port: 8080,
        contentBase: "./dist",
        writeToDisk: true,
    },

    entry: {
      preload: "./src/preload.ts",
      app: "./src/index.tsx",
    },

    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist", "js")
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
          "~": path.resolve(__dirname, "src"),
          "@": path.resolve(__dirname, "src"),
        }
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    "ts-loader"
                ]
            },
            {
                test: /\.s[ac]ss$/,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass"),
                            sassOptions: {
                                indentWidth: 2,
                                sourceMap: true
                            }
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
        ]
    }
}