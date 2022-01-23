const product 						= require('../models').product;
const cart								= require('../models').cart;
const user								= require('../models').user;
const fs 									= require('fs');
const path 								= require('path');
const ipify								= require('ipify2');
const { Op } 							= require('sequelize');

exports.add = async (req, res) => {
	try{
		let userId = req.body.userId;
		if (!userId) {
			return res.status(400).send({ msg: 'Login required' });
		};
		let ip = await ipify.ipv4();
		await cart.create({
			userId 			: userId,
			productId 	: req.body.productId,
			qty 				: req.body.qty,
			createdBy 	: ip,
			modifiedBy 	: ip
		});
		res.status(200).send({ msg: 'Cart Updated'});
	} catch(err) {
		console.log(err)
	}
}

exports.showUser = async (req, res) => {
	try{
		const getUser = await user.findOne({
			attributes: [
				'id',
				'email',
			],
			where:{
				id: req.params.id
			}
		});

		if (!getUser){
			return res.status(200).send({ msg: 'Cart empty' });
		};

		const getCart = await cart.findAll({
			attributes: [
				'id',
				'productId',
				'qty',
			],
			where:{
				userId: getUser.id
			}
		});
		// console.log(getCart[0]['id']);
		let datum = 0;
		let data = getCart.length;
		let allProducts = [];
		console.log(data);
		while (datum < data) {
			let getProduct = await product.findOne({
				attributes: [
					'id',
					'qty',
				],
				where:{
					id: getCart[datum]['productId']
				}
			});
			allProducts.push(getProduct);
			console.log('ini productID : ' + getCart[datum]['productId']);
			datum ++;
		}

		res.json({ getUser, getCart, allProducts })
	} catch(err) {
		console.log(err)
	}
}