
const express = require('express');
const router = express();
const db = require("../db/db");
const Individual = db.individuals;
const Op = db.Sequelize.Op;

// Retrieve all objects from the table
router.get('/findAll', (req, res) => {
    Individual.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving tutorials." });
    });
});

// Find a single object with an id
router.get('/find/:id', (req, res) => {
    const id = req.params.id;
    Individual.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ message: "Error retrieving Tutorial with id=" + id });
    });
});

// Create and Save a new object
router.post('/create', (req, res) => {

    // individual.date_of_birth = moment(individual.date_of_birth).format('YYYY-MM-DDTHH:mm:ssZ'); // do in frontend

    // console.log(individual.date_of_birth); // "1994-09-13T05:00:00+05:30"  // with timezone
    // console.log(new Date(individual.date_of_birth));  //  "1994-09-12T23:30:00.000Z" // UTC

    const individual = req.body;

    // to UTC
    if (individual.date_of_birth)
        individual.date_of_birth = new Date(individual.date_of_birth);
    if (individual.date_of_death)
        individual.date_of_death = new Date(individual.date_of_death);

    const dbIndividual = {
        // individual_id: 1,
        first_name: individual.first_name,
        last_name: individual.last_name,
        gender: individual.gender,
        date_of_birth: individual.date_of_birth,
        place_of_birth: individual.place_of_birth,
        individual_details: individual.individual_details,
        date_of_death: individual.date_of_death,
    };
    Individual.create(dbIndividual).then(data => {
        // data gives created entity
        res.send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message || "Some error occurred while creating." });
    });
});

// Update a object by the id in the request
router.post('/update', (req, res) => {
    const id = req.body.individual_id;
    Individual.update(req.body, { where: { individual_id: id } }).then(num => {
        if (num == 1) {
            res.send({ message: "Individual was updated successfully." });
        } else {
            res.send({ message: `Cannot update Individual with id=${id}. Maybe Individual was not found or req.body is empty!` });
        }
    }).catch(err => {
        res.status(500).send({ message: "Error updating Individual with id=" + id });
    });
});

// Delete a object with the specified id in the request
router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    Individual.destroy({ where: { individual_id: id } }).then(num => {
        res.send({
            message: (num === 1) ? 'Individual was deleted successfully!' :
                `Cannot delete Individual with id=${id}. Maybe Individual was not found!`
        });
    }).catch(err => {
        res.status(500).send({ message: "Could not delete Individual with id=" + id });
    });
});

module.exports = router;
