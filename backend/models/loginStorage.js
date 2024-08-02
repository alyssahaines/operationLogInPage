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
cred.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    
    next();
    }   
    catch (error) {
    next(error);
    }
});

cred.methods.comparePassword = function (givenPassword) {
return bcrypt.compare(givenPassword,this.password);
};

/* access the schema using the model name Fields*/

 const Fields = mongoose.model('Fields',cred);
 module.exports = Fields;