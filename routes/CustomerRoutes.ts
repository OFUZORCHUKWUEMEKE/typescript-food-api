import express, {Request,Response,NextFunction} from 'express'
import { CustomerLogin, CustomerSignup, CustomerVerify, EditCustomerProfile, GetCustomerProfile, RequestOtp } from '../controllers'



const router = express.Router()


router.post('/signup',CustomerSignup)

router.post('/login',CustomerLogin)


// authentication


router.patch('/verify',CustomerVerify)

router.get('/otp',RequestOtp)

router.get('/profile',GetCustomerProfile)

router.patch('/profile',EditCustomerProfile)



export {router as CustomerRoutes}