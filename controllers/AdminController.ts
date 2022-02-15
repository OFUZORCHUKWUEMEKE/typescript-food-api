import {Request,Response,NextFunction} from 'express'
import { CreateVandorInput } from '../dto'
import { Vandor } from '../models'
import { GeneratePassword, GenerateSalt } from '../utility'


export  const findVandor = async(id:undefined|string ,email?:string)=>{
      if(email){
          return await Vandor.findOne({email})
      }else{
          return await Vandor.findById(id)
      }
}

export const CreateVandor = async (req:Request,res:Response,next:NextFunction)=>{
    const {name,pincode,address,foodType,phone,email,password,orderName} = <CreateVandorInput>req.body
    
    
    const existingVandor = await findVandor('',email)
    if(existingVandor!==null){
        return res.json('vandor already exists')
    }

    const salt = await GenerateSalt()
    const userPassword = await GeneratePassword(password,salt)
    const createVandor = await Vandor.create({
        name,pincode,address,foodType,phone,email,password:userPassword,orderName,salt:salt,serviceAvailable:false,coverImages:[],rating:0
    })

    return res.json(createVandor)
    
}
export const GetVandor = async (req:Request,res:Response,next:NextFunction)=>{
     const vandors = await Vandor.find()
     if(vandors!==null){
         res.status(200).json(vandors)
     }
     return res.status(400).json('no vandors found in your location')
}
export const GetVandorById = async (req:Request,res:Response,next:NextFunction)=>{
      const id = req.params.id
      const vandors = await findVandor(id)
      if(vandors!==null){
          res.status(200).json(vandors)  
      }
      res.status(400).json('No vandor found')
} 