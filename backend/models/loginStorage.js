const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const cred = new mongoose.Schema({
username: {type: String, 
            unique: true,
            required: true,
            },
password: {type: String,
           required: true,
},
}
);

/* when a route calls .save(), this will run prior to properly hash
the password for protection. */
cred.pre('save', async (next) => {
    if (!this.password.isModified()) {
        return next();
    }
    const salt = bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

cred.methods.compare = (givenPassword) => {
return bcrypt.compare(this.password,givenPassword);
};

/* access the schema using the model name Fields*/
module.exports = mongoose.model('Fields',cred);