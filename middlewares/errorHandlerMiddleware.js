import { StatusCodes } from "http-status-codes";


//handling errors
const errorHandlerMiddleware = (err,req,res,next)=>{
    console.log(err);
    const statusCode = err.statusCode|| StatusCodes.INTERNAL_SERVER_ERROR;
    const msg = err.message|| 'something went wrong try again later'
    res.status(500).json({msg})
}

export default errorHandlerMiddleware;