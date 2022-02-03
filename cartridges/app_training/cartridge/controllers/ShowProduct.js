"use strict";

var server = require("server");

server.get("Show", function(req, res, next) {
    var ProductMgr = require("dw/catalog/ProductMgr");
    var myProduct = ProductMgr.getProduct("P0048M");
    var viewData = res.getViewData();

    viewData.myProduct = myProduct;

    res.setViewData(viewData);
    res.render("training/productTile");
    return next();
});

module.exports = server.exports();
