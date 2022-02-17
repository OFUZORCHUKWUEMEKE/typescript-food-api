import {Request,Response,NextFunction} from 'express'
import { FoodDocs, Vandor } from '../models'


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
   const result =await Vandor.find({pincode,serviceAvailable:false}).sort([['rating','descending']]).limit(1)

   if(result.length>0){
    return res.status(200).json(result)
  }
  return res.status(400).json({message:"data not found"})
}



export const GetFoodsIn30min = async (req:Request,res:Response,next:NextFunction)=>{
  const pincode = req.params.pincode
  const result =await Vandor.find({pincode,serviceAvailable:false}).populate("foods")

  if(result.length> 0){

    let foodResult : any =[]

    result.map(vandor=>{
      const foods = vandor.foods as [FoodDocs]

      foodResult.push(...foods.filter(food=>food.readyTime<=15))
    })
    return res.status(200).json(foodResult)
 }
 return res.status(400).json({message:"data not found"})

}
export const SearchFoods = async (req:Request,res:Response,next:NextFunction)=>{
  const pincode = req.params.pincode

  const result = await Vandor.find({pincode,serviceAvailable:false}).populate("foods")
  if(result.length>0){
      return res.status(200).json(result)
  }
  return res.status(400).json({message:"data not found+"})
}
export const RestaurantById = async (req:Request,res:Response,next:NextFunction)=>{
   const id = req.params.id

   const result = await Vandor.findById(id).populate("foods")
   
   if(result){
     return res.status(200).json(result)

   }
   return res.status(400).json({message:'na wa ooo'})
}