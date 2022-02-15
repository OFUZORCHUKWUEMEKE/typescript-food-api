export interface CreateVandorInput {
    name:string
    orderName:string
    foodType:[string]
    pincode:string
    address:string
    phone:string
    email:string
    password:string
}

export interface VandorLoginInputs{
    email:string;
    password:string;
}

export interface VandorPayload{
    _id:string
    email:string
    name:string
    foodTypes:[string]
}