import { json } from "express";
import Job from "../models/JobModel.js"
import { nanoid } from "nanoid";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";


//to get all jobs
export const getAllJobs = async(req,res)=>{
    const jobs = await Job.find({})
    res.status(StatusCodes.OK).send(jobs);
}

//to create new jobs
export const createJob= async(req,res)=>{
        const {company,profession} = req.body;
        const job = await Job.create({company,profession})
        res.status(StatusCodes.CREATED).send(job);
 }

//get single job controller
export const getJob = async(req,res)=>{
    const {id} = req.params;
    const job = await Job.findById(id);
    if(!job){
        throw new NotFoundError('`no job with id ${id}')
    }
    res.status(StatusCodes.OK).send(job);
}

//edit job controller
export const editJob = async(req,res)=>{
    const {id} = req.params;
    const job = await Job.findByIdAndUpdate(id,req.body,{
        new: true
    });
    if(!job){
        throw new NotFoundError('`no job with id ${id}')    
    }
    res.status(StatusCodes.OK).json({msg:"modified job",job})
}

//delete job controller
export const deleteJob = async(req,res)=>{
    const {id} = req.params;
    const job = Job.findByIdAndDelete(id)
    //console.log(job);
    if(!job){
        throw new NotFoundError('`no job with id ${id}')
     }
    res.status(StatusCodes.OK).json({msg: 'job deleted'})
}