var express = require('express');
var router = express.Router();
var api = router;
var allCurrencies = [];

module.exports = function () {
    /**
     * @Method GET
     * @URL /currency/{code}
     */
    api.get('/currency/:code', function (req, res) {
        var currency = allCurrencies[req.params.code];
        res.json(currency);
    });

    /**
     * @Method POST
     * @URL /currency
     * @param value
     */
    api.post('/currency', function (req, res) {
        var response = "";
        var currency = allCurrencies[req.params.code];
        if (currency) {
            response = "Updating stored currency.";
            currency.value = req.body.value;
            currency.date = new Date();
        } else {
            response = "Storing new currency.";
            allCurrencies[req.body.code] = req.body;
        }
        res.json(response)
    });

    return api;
}();