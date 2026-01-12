const Personne = require('../models/personne')

const createPersonne = async(req,res)=>{

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
}

const allPersonne = async (req,res)=> {
    try {
        const personne = await Personne.find()
        res.json(personne)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const onePersonne = (req,res)=>{
    res.json(res.personne.body)
}

const updatedPersonne = async (req, res) => {
    if (!res.personne) {
        return res.status(404).json({ message: 'Personne non trouvée' })
    }

    if (req.body.name != null) res.personne.name = req.body.name
    if (req.body.age != null) res.personne.age = req.body.age
    if (req.body.favoriteFoods != null) res.personne.favoriteFoods = req.body.favoriteFoods

    try {
        const updated = await res.personne.save()
        res.json(updated)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
const deletePersonne = async(req,res)=>{
    try {
        await res.personne.deleteOne()
        res.json({message : '  Personne supprimer '})
    } catch (err) {
        res.status(500).json({message : err.message})
    }
}
module.exports ={
    createPersonne,
    allPersonne,
    onePersonne,
    updatedPersonne,
    deletePersonne
}