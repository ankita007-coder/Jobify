import { Router } from "express";

const router = Router();

import { 
        createJob,
        deleteJob,
        editJob,
        getAllJobs,
        getJob
    } from '../controllers/JobController.js';
import { validateIdParam, validateJobInput } from "../middlewares/validationMiddleware.js";

//get all jobs
router.get('/',getAllJobs);
router.post('/',validateJobInput,createJob);
//get single job route
router.get('/:id',validateIdParam,getJob);
//edit or update jobs
router.patch('/:id',validateJobInput,editJob);
//delete job
router.delete('/:id',validateIdParam,deleteJob);

export default router;