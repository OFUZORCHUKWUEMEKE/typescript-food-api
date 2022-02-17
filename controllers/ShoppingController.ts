import {Request,Response,NextFunction} from 'express'
import { Vandor } from '../models'


export const GetFoodAvailability = async (req:Request,res:Response,next:NextFunction)=>{
     const pincode = req.params.pincode

     const result = await Vandor.find({pincode,serviceAvailble:false}).sort([['rating','descending']]).populate("foods")

     if(result.length>0){
         return res.status(200).json(result)
     }
     return res.status(400).json({message:"data not found+"})
}
export const GetTopRestuarants = async (req:Request,res:Response,next:NextFunction)=>{
   const pincode = req.params.pincode
   const result =await Vandor.find({pincode,serviceAvailable:false}).sort([['rating','descending']]).limit(10)

   if(result.length>0){
    return res.status(200).json(result)
  }
  return res.status(400).json({message:"data not found+"})
}
export const GetFoodsIn30min = async (req:Request,res:Response,next:NextFunction)=>{

}
export const SearchFoods = async (req:Request,res:Response,next:NextFunction)=>{

}
export const RestaurantById = async (req:Request,res:Response,next:NextFunction)=>{

}