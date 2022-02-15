import mongoose,{Schema,Document,Model} from 'mongoose'

interface VandorDoc extends Document{
    name:string
    orderName:string
    foodType:[string]
    pincode:string
    address:string
    phone:string
    email:string
    password:string
    serviceAvailable:Boolean
    salt:string
    coverImages:[string]
    rating:number
}

const VandorSchema = new Schema({
    name:{type:String,required:true},
    orderName:{type:String,required:true},
    foodType:{type:[String]},
    pincode:{type:String,required:true},
    phone:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    salt:{type:String,required:true},
    serviceAvailable:{type:Boolean},
    coverImage:{type:[String]},
    rating:{type:Number}
 

},{
   toJSON:{
       transform(doc,ret){
           delete ret.password
           delete ret.salt
           delete ret.__v
           delete ret.createdAt
           delete ret.updatedAt
       }
   },
   timestamps:true
})


const Vandor = mongoose.model<VandorDoc>('vandor',VandorSchema)

export {Vandor}