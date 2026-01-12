const mongoose = require('mongoose')
const Personne = require('../models/personne')

const getPersonne = async (req, res, next) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'ID invalide' })
    }

    try {
         const personneMid = await Personne.findById(req.params.id)
        if (!personneMid) return res.status(404).json({ message: 'Personne inexistante' })
        res.personneMid = personneMid  
        next()
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = getPersonne
