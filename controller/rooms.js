import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import {createError} from "../utils/error.js"

export const createRoom = async (req,res,next) => {
        const HotelId = req.params.hotelid;
        const newRoom = new Room(req.body)

        try {
            const savedRoom = await newRoom.save()
            try {
                await Hotel.findByIdAndUpdate(HotelId, {$push : {rooms:savedRoom._id},})
            } catch (error) {
                next(error)
            }
            res.status(200).json(savedRoom)
        } catch (error) {
            next(error);
        }
}
export const updateRoom = async (req,res,next) => {
    try {
        const updateRoom = await Room.findByIdAndUpdate(
            req.params.id,
            {$set : req.body},
            {new: true }

        );
        res.status(200).json(updateRoom);
    } catch (error) {
       next(error);
    }
}
export const deleteRoom = async (req,res,next) => {
    const HotelId = req.params.hotelid;

    try {
         await Room.findByIdAndDelete(req.params.id);
         try {
            await Hotel.findByIdAndUpdate(HotelId, {$pull : {rooms:req.params.id,}})
        } catch (error) {
            next(error)
        }
        res.status(200).json("Room has been deleted");
    } catch (error) {
        next(error);
    }
}
export const getRoom = async (req,res,next) => {
    

    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
}
export const getAllRooms = async (req,res,next) => {

    try {
        const allRooms = await Room.find();
        res.status(200).json(allRooms);
    } catch (error) {
       next(error);
    }
}