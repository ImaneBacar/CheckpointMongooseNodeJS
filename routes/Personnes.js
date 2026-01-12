const express = require("express")
const mongoose = require('mongoose')

const getPersonne = require("../middleware/personne")
const personneController = require('../controllers/personne')

const router = express.Router()


// getting All 
router.get('/',personneController.allPersonne)

//creating One or Many
router.post('/',personneController.createPersonne)

//getting One 
router.get('/:id',getPersonne,personneController.onePersonne)

//Updating One 
router.patch('/:id',getPersonne,personneController.updatedPersonne)

//Deleting One
router.delete("/:id",getPersonne,personneController.deletePersonne)


module.exports = router;
