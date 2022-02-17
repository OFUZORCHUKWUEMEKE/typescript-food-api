import express , { Application } from 'express';
import path from 'path';

import {AdminRoutes, ShoppingRoutes, VandorRoutes} from '../routes'


 

export default async(app: Application) => {

    app.use(express.json());
    app.use(express.urlencoded({ extended: true}))
    
    app.use(express.json());
 
    const imagePath = path.join(__dirname,'../images');
    
    app.use('/images', express.static(imagePath));
    
    app.use('/admin', AdminRoutes);
    app.use('/vandor', VandorRoutes)
    app.use(ShoppingRoutes)
  


    return app;

}