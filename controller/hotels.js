import Hotel from "../models/Hotel.js";
export const createHotel = async (req,res,next) => {
    const newHotels = new Hotel(req.body)

    try {
        const savedHotels = await newHotels.save();
        res.status(200).json(savedHotels);
    } catch (error) {
        res.status(500).json(error);
    }
}
export const updateHotel = async (req,res,next) => {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            {$set : req.body},
            {new: true }

        );
        res.status(200).json(updateHotel);
    } catch (error) {
       next(error);
    }
}
export const deleteHotel = async (req,res,next) => {
    try {
         await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted");
    } catch (error) {
        next(error);
    }
}
export const getHotel = async (req,res,next) => {
    

    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (error) {
        next(error);
    }
}
export const getAllHotels = async (req,res,next) => {
    const {min,max,...other} = req.query;
    

    try {
        const allHotels = await Hotel.find({...other,cheapestPrice: {$gt:min || 1,$lt:max || 2}}).limit(4);
        res.status(200).json(allHotels);
    } catch (error) {
       next(error);
    }
}
export const countByCity = async (req,res,next) => {
    const cities = req.query.cities.split(',');
    console.log(cities);
    try {
        const list = await Promise.all(cities.map(city =>{
            return Hotel.countDocuments({city: city})
        }))
        console.log(list);
        res.status(200).json(list);
    } catch (error) {
       next(error);
    }
}
export const countByType = async (req,res,next) => {
    try {
        const countHotel = await Hotel.countDocuments({type: 'hotel'});
        const countApartment = await Hotel.countDocuments({type: 'apartment'});
        const countResort = await Hotel.countDocuments({type: 'resort'});
        const countVilla = await Hotel.countDocuments({type: 'villa'});
        const countCabin = await Hotel.countDocuments({type: 'cabin'});
       
        res.status(200).json([
            {type:'hotels',count: countHotel},
             {type:'apartments',count:countApartment},
             {type:'resorts',count:countResort},
             {type:'villas',count:countVilla},
              {type:'cabins',count:countCabin},
        ]);
    } catch (error) {
       next(error);
    }
}
