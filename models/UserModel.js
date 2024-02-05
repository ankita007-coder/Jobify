import mongoose from "mongoose";



const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    lastName: {
        type: String,
        default: 'lastName'
    },
    role:{
        type: String,
        enum: ['user','admin'],
        default: 'user'
    },
    location:String
})

export default mongoose.model('User',UserSchema)