const path = require("path");

const ENTRY = {
    'index': "./index.js",
    'auth': "./src/auth",
    'order': './src/order',
    'cart': './src/cart',
    'product-detail': './src/product-detail'
}

module.exports = {
    entry: ENTRY,
    mode: "development",
    // mode: "production",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "../static/js"),
    },
};
