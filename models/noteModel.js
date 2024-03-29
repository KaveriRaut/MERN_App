const mongoose = require("mongoose");

const notesSchema = {
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}

// const notesSchema = {
//     title : String,
//     content : String
// }

const Note = mongoose.model("Note",notesSchema);

module.exports = Note;