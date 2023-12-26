import { nanoid } from "nanoid";

let jobs = [
    {
        id: nanoid(),
        company: 'Capg',
        profession: 'Web dev'
    },
    {
        id: nanoid(),
        company: 'Amazon',
        profession: 'Android dev'
    },
    {
        id: nanoid(),
        company: 'Google',
        profession: 'ML Engineer'
    },
];


//to get all jobs
export const getAllJobs = async(req,res)=>{
    res.status(200).send(jobs);
}

//to create new jobs
export const createJob= async(req,res)=>{
    const {company,profession} = req.body;
    if(!company || !profession){
        return res.status(400).json({msg: "please provide company and profession"})
    }
    const id = nanoid(10);
    const job = {id,company,profession};
    jobs.push(job);
    res.status(201).send(job);
}

//get single job controller
export const getJob = async(req,res)=>{
    const {id} = req.params;
    const job = jobs.find((job)=>job.id===id);
    if(!job){
        return res.status(404).json({msg:`job with ${id} doesn't exists`})
    }
    res.status(200).send(job);
}

//edit job controller
export const editJob = async(req,res)=>{
    const {company,profession} = req.body;
    if(!company || !profession){
        return res.status(400).json({msg: "please provide company and profession"})
    }
    const {id} = req.params;
    const job = jobs.find((job)=>job.id===id)
    if(!job){
        return res.status(404).json({msg:`job with ${id} doesn't exists`});
    }
    job.company = company;
    job.profession = profession;

    res.status(200).json({msg:"modified job",job})
}

//delete job controller
export const deleteJob = async(req,res)=>{
    const {id} = req.params;
    const job = jobs.find((job)=>job.id===id)
    if(!job){
        return res.status(404).json({msg:`job with ${id} doesn't exists`});
    }
    const newJob = jobs.filter((job)=>job.id!==id);
    jobs = newJob
    res.status(200).json({msg:"modified job",jobs})
}