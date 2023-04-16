import express from 'express'
import { updateUser,deleteUser, getAllUsers,getUser } from '../controller/users.js';
import { verifyToken,verfiUser, verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router()
// Create
// Get

// router.get('/checkauthentication', verifyToken,(req,res,next) => {
//     res.send("Hello user, you are now logged in!");
// })
// router.get('/checkuser/:id', verfiUser,(req,res,next) => {
//     res.send("Hello user, you are now logged in and you can delete your account");
// })
// router.get('/checkadmin/:id', verifyAdmin,(req,res,next) => {
//     res.send("Hello admin, you can do anything you want");
// })
//Update
    router.put('/:id',verfiUser ,updateUser
)
 

// delete
router.delete('/:id',verfiUser, deleteUser)
// get
router.get('/:id',verfiUser, getUser)
//Get all
router.get('/',verifyAdmin,getAllUsers)

export default router
