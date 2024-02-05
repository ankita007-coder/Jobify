import {body,param, validationResult} from 'express-validator'
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from 'mongoose';
import Job from '../models/JobModel.js';
import User from '../models/UserModel.js';

const withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map(error => error.msg);
                if(errorMessages[0].startsWith('no job')){
                    throw new NotFoundError(errorMessages);
                }
                if(errorMessages[0].startsWith('not authorized')){
                    throw new UnauthorizedError('not authorized to access this route');
                }
                throw new BadRequestError(errorMessages);
            }
            next();
        }
    ];
};


export const validateJobInput = withValidationErrors([
    body('company').notEmpty().withMessage('company is required'),
    body('position').notEmpty().withMessage('position is required'),
    body('jobLocation').notEmpty().withMessage('job location is required'),
    body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage('invalid status'),
    body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('invalid type')
  
])


export const validateIdParam = withValidationErrors([
    param('id').custom(async(value,{req})=>{
        const isValidId = mongoose.Types.ObjectId.isValid(value);
        if(!isValidId) {
            throw new BadRequestError('invalid id')
        }
        const job = Job.findById(value);
        if(!job){
            throw new NotFoundError(`no job found with ${value}`)
        }
      const isAdmin = req.user.role==='admin'
      const isOwner = req.user.userId=== job.createdBy.toString();
      if(!isAdmin && !isOwner) 
      {
        throw new UnauthorizedError('not authorized to access this route')
      }
    })
])

export const validateRegister = withValidationErrors([
    body('name').notEmpty().withMessage('name is required'),
    body('email')
        .notEmpty().withMessage('email is required')
        .isEmail().withMessage('enter valid email')
        .custom(async(email)=>{
            const user = await User.findOne({email});
            if(user){
                throw new BadRequestError('Email already exists')
            }
        }),
    body('password')
        .notEmpty().withMessage('password is required')
        .isLength({min: 8}).withMessage('Mininum 8 characters are required'),
    body('location').notEmpty().withMessage('location is required'),
    body('lastName').notEmpty().withMessage('last name is required'),
   

])


export const validateLogin = withValidationErrors([
    body('email')
        .notEmpty().withMessage('email is required')
        .isEmail().withMessage('enter valid email'),
    body('password')
        .notEmpty().withMessage('password is required')
        .isLength({min: 8}).withMessage('Mininum 8 characters are required'), 
])

export const validateUpdateUser = withValidationErrors([
    body('name').notEmpty().withMessage('name is required'),
    body('email')
        .notEmpty().withMessage('email is required')
        .isEmail().withMessage('enter valid email')
        .custom(async(email,{req})=>{
            const user = await User.findOne({email});
            if(user && user._id.toString()!==req.user.userId){
                throw new BadRequestError('Email already exists')
            }
        }),
    body('location').notEmpty().withMessage('location is required'),
    body('lastName').notEmpty().withMessage('last name is required'),
   

])