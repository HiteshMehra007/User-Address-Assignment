import { User } from "../models/user.model.js";
import { Address } from "../models/address.model.js";

const postAddress = async (req, res) => {
    try {
        const { fullName, address } = req.body;
        const name = fullName.split(" ").join("");
        
        const username = name.toLowerCase();

        const existedUser = await User.findOne({username});
        let newAddress, newUser = existedUser;
        if(existedUser){
            newAddress = await Address.create({
                address,
                user: existedUser,
            });
        }
        else{
            newUser = await User.create({
                username,
                fullName,
            })

            newAddress = await Address.create({
                address,
                user: newUser,
            });
        }

        return res.status(200).json({
            message: "Response revieved successfully !!!",
            address: newAddress,
            username: newUser

        })
    } catch (error) {
        console.error("Error in posting address !!!\n", error);
        return res.status(500).json({
            error: "Internal Server Eror",
        })
    }
};

const getAddress = async (req, res) => {
    try {
        const { fullName } = req.body;
        
        const name = fullName.split(" ").join("");
        
        const username = name.toLowerCase();

        if(username.length == 0){
            return res.status(200).json({
                message: "Username can't be empty",
            })
        }

        const existedUser = await User.findOne({ username });
        if(!existedUser){
            return res.status(200).json({
                message: "User not found !!",
            })
        }

        const allAddress = await Address.find({ username });

        return res.status(200).json({
            message: "Address found !",
        })

    } catch (error) {
        console.error("Error in get Address Controller !!!\n", error);
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export { postAddress, getAddress };