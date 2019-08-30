'use strict';
const express = require('express');
const bodyParser = require('body-parser');


const {
    Fix
} = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

//GET Fixs 

router.get('/:carId', (req, res) => {
    // console.log(req.user);
    Fix.find({
            car: req.params.carId
        })
        .then(fixs=> {
            res.json(fixs);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                message: "Internal server error"
            });
        });
});

router.post('/', (req, res) => {
    const data = req.body;
    // data.car = req.user._id
    Fix.create(data)
        .then(fix => res.status(201).json(fix))
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'Something went wrong'
            });
        });
});

router.delete('/:id', (req, res) => {
    Fix.findByIdAndRemove(req.params.id)
        .then(car => res.status(204).end())
        .catch(err => res.status(500).json({
            message: "Internal server error"
        }));
});


module.exports = {
    router
};