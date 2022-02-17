import express, {Request,Response,NextFunction} from 'express'
import { GetFoodAvailability, GetFoodsIn30min, GetTopRestuarants, RestaurantById, SearchFoods } from '../controllers/ShoppingController';



const router = express.Router();

router.get('/:pincode',GetFoodAvailability)

router.get('/top-restuarants/:pincode',GetTopRestuarants)

router.get('/food-in-30-min/:pincode',GetFoodsIn30min)

router.get('/search/:pincode',SearchFoods)
router.get('/restaurant/:pincode',RestaurantById)

export {router as ShoppingRoutes}