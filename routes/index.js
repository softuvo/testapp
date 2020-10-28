var express = require('express');
var router = express.Router();
const User = require('../Models/user');
const Product = require('../Models/product');
const View = require('../Models/viewlogs');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb'); // or ObjectID 

module.exports = function (server) {

	// For Create User
	server.post('/createUser', function (req, res, next) {
		let name = req.body.name;
		let number = req.body.number
		let email = req.body.email
		if (name === "" || number === "" || email === "") {
			res.send(400, 'Please fill the params');
		}
		User.create({ name: name, number: number, email: email }).then(response => {
			res.send(200, 'User Added Successfully');
			return next();
		}).catch(error => {
			return error;
		});
	});

	// For Create Product
	server.post('/createProduct', function (req, res, next) {
		let name = req.body.name;
		let description = req.body.description
		let userId = req.body.userId
		if (userId === "") {
			res.send(400, 'Please send user id');
		} else if (description === "") {
			res.send(400, 'Please send description data');
		} else if (name === "") {
			res.send(400, 'Please send name value');
		}
		Product.create({ name: name, description: description, userId: userId }).then(response => {
			res.send(200, 'Product Add Successfully');
			return next();
		}).catch(error => {
			return error;
		});
	});

	// For get Product
	server.get('/getAllProduct', function (req, res, next) {
		Product.find({}).then(response => {
			res.send(200, response = { 'status': 200, 'return': 'Product Listing', 'Data': response });
			return next();
		}).catch(error => {
			return error;
		});
	});

	// For View Product By User
	server.post('/viewProductByUser', async function (req, res, next) {
		let productId = req.body.productId
		let userId = req.body.userId
		let count
		let totalViwerCount
		let findUser
		if (productId === "") {
			res.send(400, 'Please send product id');
		} else if (userId === "") {
			res.send(400, 'Please send user id');
		}
		if (userId) {
			findUser = await View.findOne({ productId: productId })
			if (findUser || findUser !== null) {
				let getView = await View.findOne({ productId: productId })
				getView.count = (getView.userId) == (userId) ? getView.count : getView.count + 1,
					getView.totalViwerCount = getView.totalViwerCount + 1
				View.update({ "productId": productId }, { $set: { productId: productId, userId: userId, count: getView.count, totalViwerCount: getView.totalViwerCount } }, { upsert: true }).then(response => {
					res.send(200, 'User Viewed Product');
					return next();
				}).catch(error => {
					return error;
				});
			} else {
				count = 1,
					totalViwerCount = 1
				View.create({ productId: productId, userId: userId, count: count, totalViwerCount: totalViwerCount }).then(response => {
					res.send(200, 'User Viewed Product');
					return next();
				}).catch(error => {
					return error;
				});
			}
		}

	});


	// For Get View Product List
	server.get('/viewCount', async function (req, res, next) {
		View.find({}).then(resp => {
			res.send(200, response = { 'status': 200, 'return': 'Product List', 'Data': resp });
		}).catch(error => {
			return error;
		})
	})

};

