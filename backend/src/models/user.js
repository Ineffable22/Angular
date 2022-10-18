const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    last_conection: {
        type: Date,
        required: false
    },
    pokemones: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);