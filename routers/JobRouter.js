import { Router } from "express";

const router = Router();

import { 
        createJob,
        deleteJob,
        editJob,
        getAllJobs,
        getJob
    } from '../controllers/JobController.js';

//get all jobs
router.get('/',getAllJobs);
//create new jobs route
router.post('/',createJob);
//get single job route
router.get('/:id',getJob);
//edit or update jobs
router.patch('/:id',editJob);
//delete job
router.delete('/:id',deleteJob);

export default router;