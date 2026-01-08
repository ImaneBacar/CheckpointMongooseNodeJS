const moongose = require("mongoose");

const personneSchema = new moongose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type:Number,
        required:true
    },
    favoriteFoods : [String]
    }, {
    timestamps: true
  })

module.exports = moongose.model("Personne",personneSchema)