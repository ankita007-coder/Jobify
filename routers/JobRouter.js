import { Router } from "express";

const router = Router();

import { 
        createJob,
        deleteJob,
        editJob,
        getAllJobs,
        getJob,
        showStats
    } from '../controllers/JobController.js';
import { validateIdParam, validateJobInput } from "../middlewares/validationMiddleware.js";
import { checkForTestUser } from "../middlewares/authMiddleware.js";

//get all jobs
router.get('/',getAllJobs);
router.post('/',checkForTestUser,validateJobInput,createJob);
router.get('/stats',showStats);
//get single job route
router.get('/:id',validateIdParam,getJob);
//edit or update jobs
router.patch('/:id',checkForTestUser,validateJobInput,editJob);
//delete job
router.delete('/:id',checkForTestUser,validateIdParam,deleteJob);

export default router;