import express, {Request,Response,NextFunction} from 'express'
import {VandorLoginInputs} from '../dto'
import {findVandor } from '../controllers'
import { ValidatePassword } from '../utility'
import { GenerateSignature } from '../utility'

export const VandorLogin = async(req:Request,res:Response,next:NextFunction)=>{
     const {email,password} = <VandorLoginInputs>req.body

     const existingVandor =await findVandor('',email)

     if(existingVandor!==null){
        //  ?validation
        const validation = await ValidatePassword(password,existingVandor.password,existingVandor.salt)

        if(validation){
            const signature=GenerateSignature({
                _id:existingVandor._id,
                email:existingVandor.email,
                name:existingVandor.name,
                foodTypes:existingVandor.foodType
            })   
           return res.json(signature)
           console.log(signature)
        }else{
            return res.json('password is not valid')
        }
     }
     res.json({"message":'Login Credentials not valid'})
}

export const GetVandorProfile = async(req:Request,res:Response,next:NextFunction)=>{
   
}
export const UpdateVandorProfile = async(req:Request,res:Response,next:NextFunction)=>{
   
}
export const UpdateVandorService = async(req:Request,res:Response,next:NextFunction)=>{
   
}
