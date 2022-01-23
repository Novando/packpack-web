const material    = require('../models').material;
const fs          = require('fs');
const ipify			= require('ipify2');
const path        = require('path');

exports.print = async (req, res) => {
  try{
    const result = await material.findAll();
    res.status(200).json(result);
  } catch(err) {
    res.status(400).send(err);
  }
}

exports.add = async (req, res) => {
  try{
    const checkMaterial = await material.findOne({
      where: {
        name    : req.body.name,
        width   : req.body.width
      }
    });

    if (checkMaterial) {
      return res.status(400).send({ msg: 'Identical material exist'});
    };

    const ip = await ipify.ipv4();
    await material.create({
      name : req.body.name,
      width: req.body.width,
      price: req.body.price,
      weight: req.body.weight,
      stock: req.body.stock,
      createdBy: ip,
      modifiedBy: ip,
    });
    res.sendStatus(201);
  } catch (err) {
    res.status(400).send(err);
  }
}

exports.show = async (req, res) => {
  try{
    const getMaterial = await material.findOne({
      where: {
        id: req.params.id
      }
    });

    res.status(200).json(getMaterial);
  } catch(err) {
    res.status(400).send(err);
  }
}

exports.edit = async (req, res) => {
  try{
    const getMaterial = await material.findOne({
      where: {
        id: req.body.id
      }
    });

    if (!getMaterial) {
      return res.sendStatus(404);
    };

    const ip = ipify.ipv4();
    await material.update(
      {
        name: req.body.name,
        width: req.body.width,
        weight: req.body.weight,
        price: req.body.price,
        modifiedBy: ip
      }, {
        where: {
          id: req.body.id
        }
      }
    );

    res.status(201).send({ msg: 'Material updated' });
  } catch(err) {
    res.status(400).send(err);
  }
}

exports.adjust = async (req, res) => {
  try{
    const getMaterial = await material.findOne({
      where: {
        id: req.body.id
      }
    });

    if (!getMaterial) {
      return res.sendStatus(404);
    };

    const ip = await ipify.ipv4();
    await material.update(
      {
        stock: req.body.stock,
        modifiedBy: ip
      }, {
        where: {
          id: req.body.id
        }
      }
    );

    res.status(201).send({ msg: 'Stock adjusted' });
  } catch(err) {
    res.status(400).send(err);
  }
}

exports.restock = async (req, res) => {
  try{
    const getMaterial = await material.findOne({
      where: {
        id: req.body.id
      }
    });

    if (!getMaterial) {
      return res.sendStatus(404);
    };

    const ip = await ipify.ipv4();
    await material.update(
      {
        stock: getMaterial.stock + parseInt(req.body.stock),
        modifiedBy: ip
      }, {
        where: {
          id: req.body.id
        }
      }
    );

    res.status(201).send({ msg: 'Restocked' });
  } catch(err) {
    res.status(400).send(err);
  }
}

exports.remove = async (req, res) => {
  try{
    await material.destroy({
      where: {
        id: req.params.id
      }
    });

    res.status(200).send({ msg: 'Material destroyed' });
  } catch(err) {
    res.status(400).send(err);
  }
}
