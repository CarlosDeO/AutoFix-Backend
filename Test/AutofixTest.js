const chai = require("chai");
const chaiHttp = require("chai-http");
const faker = require('faker');
const mongoose = require('mongoose');

const expect = chai.expect;

const {
    Car
} = require('../cars/models');

const {
    app,
    runServer,
    closeServer
} = require("../server");
const {
    TEST_DATABASE_URL
} = require('../config');

chai.use(chaiHttp);

function seedTripData() {
    console.info('seeding trip data');
    const seedData = [];
    for (let i = 1; i < 10; i++) {
        seedData.push({
            Cars: 
                {
                    id: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
                    year: "2015",
                    make: "CHEVROLET",
                    model: "EQUINOX"
                }
        });
    }
    return Car.insertMany(seedData);
}

function tearDownDb() {
    return new Promise((resolve, reject) => {
        console.warn('Deleting database');
        mongoose.connection.dropDatabase()
            .then(result => resolve(result))
            .catch(err => reject(err));
    });
}


describe('Carfix API resource', function () {
    before(function () {
        return runServer(TEST_DATABASE_URL);
    });
    beforeEach(function () {
        return seedTripData();
    });
    afterEach(function () {
        return tearDownDb();
    });
    after(function () {
        return closeServer();
    });

    describe('GET endpoint', function () {


        it('it should list all existing cars', function () {
            let res;
            return chai.request(app)
                .get('/api/cars')
                .then(_res => {
                    res = _res;
                    res.should.have.status(200);
                    res.body.should.have.lengthOf.at.least(1);

                    return Car.count();
                })
                .then(count => {
                    res.body.should.have.lengthOf(count);
                });
        });
    });
    describe('POST endpoint', function () {
        // strategy: make a POST request with data,
        // then prove that the post we get back has
        // right keys, and that `id` is there (which means
        // the data was inserted into db)
        it('should add a new Car', function () {

            const newCars = 
            {
                id: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
                year: "2015",
                make: "CHEVROLET",
                model: "EQUINOX"
            }

            return chai.request(app)
                .post('/api/cars')
                .send(newCar)
                .then(function (res) {
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.include.keys('make');
                    res.body.id.should.not.be.null;
                    res.body.content.should.equal(newCar.content);
                    return Car.findById(res.body.id);
                })
                .then(function (post) {
                    trip.content.should.equal(newCar.content);
                });
        });
    });

    describe('PUT endpoint', function () {

        it('should update fields you send over', function () {
            const Cars =
            {
                id: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
                year: "2015",
                make: "CHEVROLET",
                model: "EQUINOX"
            }

            return Car
                .findOne()
                .then(car => {
                    updateData.id = car.id;

                    return chai.request(app)
                        .put(`api/trips${car.id}`)
                        .send(updateData);
                })
                .then(res => {
                    res.should.have.status(204);
                    return Car.findById(updateData.id);
                })
                .then(post => {
                    post.content.should.equal(updateData.content);
                });
        });
    });

    describe('DELETE endpoint', function () {
        it('should delete a post by id', function () {

            let car;

            return Car
                .findOne()
                .then(_car => {
                    car = _car
                    return chai.request(app).delete(`/api/${car.id}`);
                })
                .then(res => {
                    res.should.have.status(204);
                    return Car.findById(car.id);
                })
                .then(_car => {
                    should.not.exist(_car);
                });
        });
    });

});