import { StatusCodes } from "http-status-codes"
import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";
import { formatImage } from "../middlewares/multerMiddleware.js";
import cloudinary from 'cloudinary';


export const getCurrentUser = async(req,res)=>{
    const user = await User.findOne({_id: req.user.userId});
    const userWithoutPassword = user.toJSON();
    res.status(StatusCodes.OK).json({user: userWithoutPassword});
}

export const getApplicationStats = async(req,res)=>{
    const users = await User.countDocuments();
    const jobs = await Job.countDocuments();
    res.status(StatusCodes.OK).json({msg:'application stats',users,jobs});
}

export const updateUser = async (req, res) => {
    // Create a shallow copy of the request body
    const newUser = { ...req.body };
    
    // Remove the 'password' property from the newUser object
    delete newUser.password;

    // Check if a file exists in the request (file upload)
    if (req.file) {
        const file = formatImage(req.file);
        // Upload the file to Cloudinary
        const response = await cloudinary.v2.uploader.upload(file);   

        // Update the newUser object with avatar information from Cloudinary
        newUser.avatar = response.secure_url;
        newUser.avatarPublicId = response.public_id;
    }

    // Update the user in the database with the new user information and here updated user is the previous user info only
    //in order to get updated info we have to use new:true but since we need prev info here we are not returning updated user info
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

    // Check if a file was uploaded and if the user had a previous avatar
    if (req.file && updatedUser.avatarPublicId) {
        // Destroy the previous avatar on Cloudinary
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
    }

    // Respond with a JSON object indicating successful user update
    res.status(StatusCodes.OK).json({ msg: 'updated user', user: updatedUser });
};
