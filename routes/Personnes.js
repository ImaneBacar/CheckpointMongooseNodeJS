const express = require("express")
const mongoose = require('mongoose')

const router = express.Router()

const Personne = require('../models/personne')

// getting all 

router.get('/',async (req,res)=> {
    try {
        const personne = await Personne.find()
        res.json(personne)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

//creating One or many
router.post('/',async(req,res)=>{

    if (Array.isArray(req.body)) {
        const resultats = await Personne.insertMany(req.body)
        return res.status(201).json(resultats)
    }

    const personne = new Personne({
        name:req.body.name,
        age:req.body.age,
        favoriteFoods:req.body.favoriteFoods
    })
    try {
        const newPersonne = await personne.save()
        res.status(201).json(newPersonne) 
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})



module.exports = router;
