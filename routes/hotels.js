import express from 'express'
import { createError } from '../utils/error.js';
import Hotel from '../models/Hotel.js';
import { createHotel, updateHotel,deleteHotel, getAllHotels,getHotel,countByCity, countByType } from '../controller/hotels.js';
import { verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router()
// Create

    router.post('/',verifyAdmin, createHotel)


//Update
    router.put('/:id',verifyAdmin, updateHotel
)
 

// delete
router.delete('/:id',verifyAdmin, deleteHotel)
// get
router.get('/find/:id', getHotel)
//Get all
router.get('/', getAllHotels)
router.get('/countByCity', countByCity)
router.get('/countByType', countByType)

export default router
