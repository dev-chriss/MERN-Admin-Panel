import User from '../models/user.model'

const usersSerializer = data => ({
    id: data.id,
    name: data.name,
    email: data.email,
    register_date: data.register_date
});

// Retrieve all data
exports.findAll =  (req, res) => {
    User.find()
    .then(async data => {
        const users = await Promise.all(data.map(usersSerializer));
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Retrieve data with pagination
exports.findPagination = async (req, res) => {
    const { page = 1, limit = 5, name = "", email = "" } = req.query;

    let query = {}
    if (email && email !== "null") {
        query =  { email : new RegExp(`${email}+`, "i") }
        
        if (name && name !== "null") {
            query = {
                $or: [ { email : new RegExp(`${email}+`, "i") } , { name: new RegExp(`${name}+`, "i") } ]
            }
        }
    }
    else if (name && name !== "null") {
        query = { name: new RegExp(`${name}+`, "i") }
    }

    const paginated = await User.paginate(
        query,
        {
            page,
            limit,
            lean: true,
            sort: { updatedAt: "desc" }
        }
    )
    
    const { docs } = paginated;
    const users = await Promise.all(docs.map(usersSerializer));

    delete paginated["docs"];
    const meta = paginated

    res.json({ meta, users });
};

exports.findOne = (req, res) => {
    User.findById(req.params.id)
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.id
                });
            }
            const user = usersSerializer(data)
            res.send(user);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.id
            });
        });
};

exports.create = (req, res) => {
    if(!req.body.name || !req.body.email || !req.body.password) {
         return res.status(400).send({
             message: "Name, Email and Password can not be empty"
         });
    }

    const user = new User({
        name: req.body.name.trim(),
        email: req.body.email.trim(),
        password: req.body.password.trim()
    });

    user.save()
    .then(data => {
        const user = usersSerializer(data)
        res.send(user);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

exports.update = (req, res) => {
    if(!req.body.name || !req.body.email ) {
        return res.status(400).send({
            message: "Name and Email can not be empty"
        });
    }

    User.findByIdAndUpdate(req.params.id, {
        name: req.body.name.trim(),
        email: req.body.email.trim(),
    }, {new: true})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        const user = usersSerializer(data)
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.id
        });
    });
};

exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.id)
     .then(user => {
         if(!user) {
             return res.status(404).send({
                 message: "User not found with id " + req.params.id
             });
         }
         res.send({ id: req.params.id, message: "User deleted successfully!" });
     }).catch(err => {
         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
             return res.status(404).send({
                 message: "User not found with id " + req.params.id
             });
         }
         return res.status(500).send({
             message: "Could not delete user with id " + req.params.id
         });
     });
};
