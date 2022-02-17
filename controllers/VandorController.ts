import  {Request,Response,NextFunction} from 'express'
import {EditVandorInput, VandorLoginInputs,CreateFoodInput} from '../dto'
import {findVandor } from '../controllers'
import { ValidatePassword } from '../utility'
import { GenerateSignature } from '../utility'
import { Food } from '../models'

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
        }else{
            return res.json('password is not valid')
        }
     }
     res.json({"message":'Login Credentials not valid'})
}

export const GetVandorProfile = async(req:Request,res:Response,next:NextFunction)=>{
     const user = req.user
     if(user){
         const existingVandor = await findVandor(user._id)
        return res.json(existingVandor)
     }
     return  res.json({"message":'Login Credentials not valid'})

}
export const UpdateVandorProfile = async(req:Request,res:Response,next:NextFunction)=>{
     const {foodTypes,name,address,email}=<EditVandorInput>req.body
     const user = req.user
     if(user){
         const existingUser = await findVandor(user._id)
        res.json(existingUser)
      
     }
       return  res.json({"message":'Login Credentials not valid'})

}
export const UpdateVandorService = async(req:Request,res:Response,next:NextFunction)=>{
    const {foodTypes,name,address,email}=<EditVandorInput>req.body
    const user = req.user
    if(user){
        const existingVandor= await findVandor(user._id)
       if(existingVandor!==null){
               existingVandor.serviceAvailable != existingVandor.serviceAvailable
               const savedResult = await existingVandor.save()
               return res.json(savedResult)
       }
       return  res.json({"message":'Login Credentials not valid'})
    }
      
}
export const Addfood = async(req:Request,res:Response,next:NextFunction)=>{
   
    const user = req.user
    if(user){
      const {name,description,category,foodType,readyTime,price} = <CreateFoodInput>req.body

      const vandor = await findVandor(user._id)

      if(vandor!==null){

        const files = req.files as [Express.Multer.File]
        
        const images = files.map((file:Express.Multer.File)=>file.filename)

          const createdFood = await Food.create({
              vandorId:vandor._id,
              name:name,
              description,
              category,
              foodType,
              images:images,
              price:price,
              rating:0,
              readyTime:readyTime
          })
          vandor.foods.push(createdFood)

          const result = await vandor.save()

          return res.json(result)
      }
      
    }
    return  res.json({"message":'Something went wrong with foods'})
}
export const Getfoods = async(req:Request,res:Response,next:NextFunction)=>{
   
    const user = req.user
    if(user){
      const foods = await Food.find({vandorId:user._id})

      if(foods!==null){
         return res.json(foods)
      }
     
    }
    return  res.json({"message":'food matter don cast'})
      
}
