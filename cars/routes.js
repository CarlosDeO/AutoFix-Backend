'use strict';
const express = require('express');
const bodyParser = require('body-parser');


const {
    Car
} = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

//GET Trips 

router.get('/', (req, res) => {
    // console.log(req.user);
    Car
        .find({
            user: req.user._id
        })
        .then(cars => {
            res.json(cars);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                message: "Internal server error"
            });
        });
});

// GET by Id 

router.get('/:id', (req, res) => {
    Car
        .findById(req.params.id)
        .then(car => {
            if (car) {
                res.json(car)
            } else {
                return res.status(404).send();
            }
        })

        .catch(err => {
            console.error(err);
            res.status(500).json({
                message: "Internal server error"
            });
        });
});

//POST Car

router.post('/', (req, res) => {
    const data = req.body;
    data.user = req.user._id
    Car
        .create(data)
        .then(car => res.status(201).json(car))
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'Something went wrong'
            });
        });
});

//PATCH Trip

// router.put('/:id', (req, res) => {
//     // ensure that the id in the request path and the one in request body match
//     if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
//         const message =
//             `Request path id (${req.params.id}) and request body id ` +
//             `(${req.body._id}) must match`;
//         console.error(message);
//         return res.status(400).json({
//             message: message
//         });
//     }
//     Car
//         .findByIdAndUpdate(req.params.id, {
//             $set: req.body
//         })
//         .then(trip => res.status(204).end())
//         .catch(err => res.status(500).json({
//             message: "Internal server error"
//         }));
// });

// DELETE Car 

router.delete('/:id', (req, res) => {
    console.log('delete');
    Car.findByIdAndRemove(req.params.id)
        .then(car => res.status(204).end())
        .catch(err => res.status(500).json({
            message: "Internal server error"
        }));
});


module.exports = {
    router
};