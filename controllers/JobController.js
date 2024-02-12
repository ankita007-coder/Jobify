import mongoose from "mongoose";
import Job from "../models/JobModel.js"
import { StatusCodes } from "http-status-codes";
import day from 'dayjs';


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

export const showStats = async(req,res)=>{

    let stats = await Job.aggregate([
        {$match:{createdBy: new mongoose.Types.ObjectId(req.user.userId)}},
        {$group: {_id:'$jobStatus',count: {$sum:1}}},
    ])
    stats = stats.reduce((acc,curr)=>{
        const {_id:title,count} = curr
        acc[title]=count
        return acc
    },{})
   // console.log(stats)
    const defaultStats = {
       pending: stats.pending||0,
       interview: stats.interview||0,
       declined: stats.declined||0 
    };
    let monthlyApplications= await Job.aggregate([
        {$match:{createdBy: new mongoose.Types.ObjectId(req.user.userId)}},
        {$group:{
            _id:{year: {$year: '$createdAt'},month:{$month:'$createdAt'}},
            count:{$sum:1}

        }},
        {$sort:{'_id.year':-1,'_id.month':-1}},
        {$limit: 6}
    ])

    monthlyApplications = monthlyApplications.map((item)=>{
        const {_id:{year,month},count} =item
        const date = day().month(month-1).year(year).format('MMM YY');
        return {date,count}
    }).reverse();

    res.status(StatusCodes.OK).json({defaultStats,monthlyApplications});
}