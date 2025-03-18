const mongoose=require('mongoose')


const userSchema = new mongoose.Schema({
  username: {
      type: String,
      required: true,
      unique: true,
      trim: true
  },
  fullname:{
    firstname:{
      type:String,
      required:true,
      minlength:3,
      trim:true
    },
    lastname:{
      type:String,
      minlength:3,
      trim:true
    }
  },
  email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
  },
  password: {
      type: String,
      required: true,
      minlength: 6
  }
},{timestamps:true});


module.exports = mongoose.model('User', userSchema);