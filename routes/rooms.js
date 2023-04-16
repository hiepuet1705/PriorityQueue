import express from 'express'
import { verifyAdmin } from '../utils/verifyToken.js';
import { createRoom,updateRoom, deleteRoom,getRoom,getAllRooms } from '../controller/rooms.js';
const router = express.Router()

router.post('/:hotelid',verifyAdmin, createRoom)


//Update
    router.put('/:id',verifyAdmin, updateRoom
)
 

// delete
router.delete('/:id/:hotelid',verifyAdmin, deleteRoom)
// get
router.get('/:id', getRoom)
//Get all
router.get('/', getAllRooms)
export default router