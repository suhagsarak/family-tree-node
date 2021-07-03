
const express = require('express');
const router = express();
const db = require("../db/db");
const Individual = db.individuals;
const Op = db.Sequelize.Op;

// Retrieve all objects from the table
router.get('/findAll', (req, res) => {
    const individual = {
        // individual_id: 1,
        first_name: 'Suhag',
        last_name: 'Sarak',
        gender: 'M',
        date_of_birth: new Date(1994, 8, 13, 5, 30, 0, 1),
        place_of_birth: 'Jath',
        individual_details: null,
        date_of_death: null
    };
    Individual.create(individual).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message || "Some error occurred while creating." });
    });
});

// Find a single object with an id
router.get('/find/:id', (req, res) => {
    res.send(req.params.id)
});

// Create and Save a new object
router.post('/create', (req, res) => {

});

// Update a object by the id in the request
router.post('/update', (req, res) => {

});

// Delete a object with the specified id in the request
router.get('/delete/:id', (req, res) => {
    res.send(req.params.id)

});

// Delete all objects from the database
// router.get('/deleteAll', (req, res) => {
// });

module.exports = router;

function comm() {

    const db = require("../models");
    const Tutorial = db.tutorials;
    const Op = db.Sequelize.Op;

    // Create and Save a new Tutorial
    exports.create = (req, res) => {
        // Validate request
        if (!req.body.title) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }

        // Create a Tutorial
        const tutorial = {
            title: req.body.title,
            description: req.body.description,
            published: req.body.published ? req.body.published : false
        };

        // Save Tutorial in the database
        Tutorial.create(tutorial)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Tutorial."
                });
            });
    };

    // Retrieve all Tutorials from the database.
    exports.findAll = (req, res) => {
        const title = req.query.title;
        var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

        Tutorial.findAll({ where: condition })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving tutorials."
                });
            });
    };

    // Find a single Tutorial with an id
    exports.findOne = (req, res) => {
        const id = req.params.id;

        Tutorial.findByPk(id)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving Tutorial with id=" + id
                });
            });
    };

    // Update a Tutorial by the id in the request
    exports.update = (req, res) => {
        const id = req.params.id;

        Tutorial.update(req.body, {
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Tutorial was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating Tutorial with id=" + id
                });
            });
    };

    // Delete a Tutorial with the specified id in the request
    exports.delete = (req, res) => {
        const id = req.params.id;

        Tutorial.destroy({
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Tutorial was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete Tutorial with id=" + id
                });
            });
    };

    // Delete all Tutorials from the database.
    exports.deleteAll = (req, res) => {
        Tutorial.destroy({
            where: {},
            truncate: false
        })
            .then(nums => {
                res.send({ message: `${nums} Tutorials were deleted successfully!` });
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while removing all tutorials."
                });
            });
    };

    // find all published Tutorial
    exports.findAllPublished = (req, res) => {
        Tutorial.findAll({ where: { published: true } })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving tutorials."
                });
            });
    };
}
