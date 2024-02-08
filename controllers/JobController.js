import Job from "../models/JobModel.js"
import { StatusCodes } from "http-status-codes";



//to get all jobs
export const getAllJobs = async(req,res)=>{
    //console.log(req.user);
    const jobs = await Job.find({createdBy:req.user.userId});
    res.status(StatusCodes.OK).send(jobs);
}

//to create new jobs
export const createJob= async(req,res)=>{
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).send(job);
 }

//get single job controller
export const getJob = async(req,res)=>{
    const {id} = req.params;
    const job = await Job.findById(id);
    res.status(StatusCodes.OK).json({job});
}

//edit job controller
export const editJob = async(req,res)=>{
    const {id} = req.params;
    const job = await Job.findByIdAndUpdate(id,req.body,{
        new: true
    });
    res.status(StatusCodes.OK).json({msg:"modified job",job})
}

//delete job controller
export const deleteJob = async(req,res)=>{
    const {id} = req.params;
    const job =await Job.findByIdAndDelete(id)
    res.status(StatusCodes.OK).json({msg: 'job deleted',job})
}