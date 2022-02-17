import mongoose,{Schema,Document,Model} from 'mongoose'

export interface FoodDocs extends Document{
    vandorId:string
    name:string
    description:string
    category:string
    foodType:string
    readyTime:number
    price:number
    rating:number
    image:[string]
}

const FoodSchema = new Schema({
    vandorId:{type:String},
    name:{type:String,required:true},
    description:{type:String,required:true},
    category:{type:String,rewuired:true},
    foodType:{type:String,required:true},
    readyTime:{type:Number},
    price:{type:Number,required:true},
    rating:{type:Number},
    image:{type:[String]}
},{
    toJSON:{
        transform(doc,ret){
            delete ret.__v,
            delete ret.createdAt,
            delete ret.updatedAt
        }
    },
    timestamps:true
})

const Food = mongoose.model<FoodDocs>('food',FoodSchema)

export {Food}