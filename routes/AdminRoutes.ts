import express, {Request,Response,NextFunction} from 'express'
import { CreateVandor,GetVandor,GetVandorById } from '../controllers';


const router = express.Router();

router.post('/vandor',CreateVandor)
router.get('/vandor',GetVandor)
router.get('/vandor/:id', GetVandorById )


router.get('/',(req:Request,res:Response,next:NextFunction)=>{
    res.status(200).json('whats popping from admin routes')
})


export {router as AdminRoutes}