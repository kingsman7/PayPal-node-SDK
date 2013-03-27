/* Copyright 2013 PayPal */
"use strict";

// Sandbox Creds - 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM', 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM'
// VPS 16 Creds - 'EB6t3j2rIX5k59S6z2YMznpIBsel5qLWCwE88TT1HhKY', 'EGgy5gXmQC5Wtibks-81aJZIBsel5qLWCwE88TT1HhKY'

var paypal_api = require('../');

var token = null;

var http_default_opts = {
	'host': 'api.sandbox.paypal.com',
	'port': '',
	'headers': {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'Authorization': ''
	}
};

paypal_api.configure(http_default_opts);

var client_id = 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM';
var client_secret = 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM';

paypal_api.generateToken(client_id, client_secret, function(generatedToken) {
	token = generatedToken;
	console.log("The Generated Token is " + token);

	http_default_opts.headers['Authorization'] = token;

	paypal_api.payment.create(create_payment_json, http_default_opts, function(res, err) {
		if (err) {
			throw err;
		}

		if (res) {
			console.log("Create Payment Response");
			console.log(res);
			console.log("Create Payment Response");

			paypal_api.payment.get(res.id, http_default_opts, function(get_res, get_err) {
				if (get_err) {
					throw get_res;
				}

				if (get_res) {
					console.log("Get Payment Response");
					console.log(JSON.stringify(get_res));
					console.log("Get Payment Response");
				}

			});

		}
	});

});

var create_payment_json = {
	"intent": "sale",
	"payer": {
		"payment_method": "credit_card",
		"funding_instruments": [{
			"credit_card": {
				"type": "visa",
				"number": "4417119669820331",
				"expire_month": "11",
				"expire_year": "2018",
				"cvv2": "874",
				"first_name": "Joe",
				"last_name": "Shopper",
				"billing_address": {
					"line1": "52 N Main ST",
					"city": "Johnstown",
					"state": "OH",
					"postal_code": "43210",
					"country_code": "US"
				}
			}
		}]
	},
	"transactions": [{
		"amount": {
			"total": "7",
			"currency": "USD",
			"details": {
				"subtotal": "5",
				"tax": "1",
				"shipping": "1"
			}
		},
		"description": "This is the payment transaction description."
	}]
};