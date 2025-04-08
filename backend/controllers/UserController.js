const userSchema = require('../models/userSchema');

const get = async () => {
    try {
        const data = await userSchema.find();
        return data
    } catch (error) {
        throw new Error(error.message)
    }
}

const getUserIdByUsername = async (username) => {
    try {
        const user = await userSchema.findOne({ username });
        if (!user) {
            throw new Error(`User with username ${username} not found.`)
        }
        return user
    } catch (error) {
        throw new Error(error.message)
    }
}

const getuserbyname = async (username) => {
    try {
        const data = await userSchema.findOne({ username });
        return data
    } catch (error) {
        throw new Error(error.message)
    }
}

const adduser = async (username, password, photo) => {
    try {
        const existingUser = await userSchema.findOne({ username });
        if (existingUser) {
            throw new Error("User already Exists.")
        }
        const newUser = new userSchema({
            username,
            password,
            photo
        });
        const result = await newUser.save();
        return ({ message: "User created successfully", user: result });

    }
    catch (error) {
        throw new Error(error.message || "Something went wrong.")
    }
}


const userlogin = async (username, password) => {
    try {
        const user = await userSchema.findOne({ username });
        if (!user) {
            throw new Error("User not found")
        }

        if (password == user.password) {
            return { message: "Login successful", user };
        }
        else {
            throw new Error("Invalid Password")
        }
    } catch (error) {
        throw new Error(error.message || "Something went wrong while logging in.")
    }
}

const deleteUserByUsername = async (username) => {
    try {
        const user = await userSchema.findOne({ username });
        if (!user) {
            throw new Error("User not found")
        }
        const deletedUser = await userSchema.deleteOne({ username });
        return {
            message: "User deleted successfully",
            deletedUser: deletedUser
        };
    } catch (error) {
        throw new Error(error.message || "Something went wrong while logging in.")
    }
}

module.exports = {
    get,
    getuserbyname,
    adduser,
    getUserIdByUsername,
    userlogin,
    deleteUserByUsername
}