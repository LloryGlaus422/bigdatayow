  
const Post = require('./postSchema.js');

module.exports.create = (req, res) => {
    const post = new Post({
        category: req.body.category,
        topic: req.body.topic,
        description: req.body.description,
        address: {
            city:req.body.city,
            municipality:req.body.municipality,
            barangay:req.body.barangay
        },
    });

    post.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error!"
            });
        });

}