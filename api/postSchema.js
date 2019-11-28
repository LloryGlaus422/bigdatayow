const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Post
let Post = new Schema({
    category: { type: String, required: true },
    topic: { type: String, required: true },
    description: { type: String, required: true },
    address: {
        city: { type: String, required: true},
        municipality: { type: String, required: true},
        barangay: { type: String, required: true}
    },
}, {
    collection: 'posts'
});

module.exports = mongoose.model('Post', Post);