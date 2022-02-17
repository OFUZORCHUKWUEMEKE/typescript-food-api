import express, {Request,Response,NextFunction} from 'express'

import { Addfood, Getfoods, GetVandorProfile, UpdateVandorProfile, UpdateVandorService, VandorLogin } from '../controllers';

import { Authenticate } from '../middlewares';


import multer from 'multer';

const router = express.Router();


const imageStorage =multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'images')
    },
    filename:function(req,file,cb){
        cb(null,new Date().toISOString()+'_'+file.originalname)
    }
})
const images = multer({storage:imageStorage}).array('images',10)

router.post('/login',VandorLogin)


router.use(Authenticate)
router.get('/profile',GetVandorProfile)
router.patch('/profile', UpdateVandorProfile)
router.patch('/service',UpdateVandorService)

router.get('/foods',Getfoods)
router.post('/foods',images,Addfood)

export {router as VandorRoutes}  