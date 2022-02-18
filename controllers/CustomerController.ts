import {Request,Response,NextFunction} from 'express'
import {GenerateSalt,GeneratePassword, GenerateOtp} from '../utility'
import { plainToClass } from 'class-transformer'
import { CreateCustomerInputs } from '../dto/Customer.dto'
import { validate } from 'class-validator'
import { Customer } from '../models/Customer'


export const CustomerSignup = async (req:Request,res:Response,next:NextFunction)=>{
   const customerInputs = plainToClass(CreateCustomerInputs,req.body)

   const inputErrors = await validate(customerInputs,{validationError:{target:true}})

   if(inputErrors.length>0){
       return res.status(400).json(inputErrors)
   }
   const {email,password,phone} = customerInputs 

   const salt = await GenerateSalt()
   const userPassword = await GeneratePassword(password,salt)

    

    const otp_expiry = new Date()

    const {otp,expiry} = GenerateOtp()

    console.log(otp,expiry)
    res.status(200).json('working')
    const result = await Customer.create({
         email:email,
         password:password,
         phone:phone,
         salt:salt,
         otp :otp,
         otp_expiry:expiry,
         firstName:'',
         lastName:'',
         address:'',
         verified:false,
         lat:0,
         lng:0
    })
    if(result){

    }
}

export const CustomerLogin = async (req:Request,res:Response,next:NextFunction)=>{
    
    
  
}

export const CustomerVerify = async (req:Request,res:Response,next:NextFunction)=>{

}

export const RequestOtp = async (req:Request,res:Response,next:NextFunction)=>{

}
export const GetCustomerProfile = async (req:Request,res:Response,next:NextFunction)=>{

}
export const EditCustomerProfile = async (req:Request,res:Response,next:NextFunction)=>{

}