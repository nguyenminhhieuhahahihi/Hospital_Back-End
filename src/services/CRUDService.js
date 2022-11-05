import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);


let createNewUser = async (data) =>{
    return new Promise( async (resolve, reject) =>{
        try {
            let hashPassWordFromBcrypt = await mahoapass(data.password)
        await db.User.create({
            email: data.email,
            password: hashPassWordFromBcrypt,
            firstName: data.firstname,
            lastName: data.lastname,
            address: data.address,
            phoneNumber: data.phonenumber,
            gender: data.gender === '1' ? true : false,
            roleId: data.roleId,
            
        })
        resolve('ok! Create a new user succeed!');  // backend
        } catch (e) {
            reject(e);
        }
    })
    
}

let mahoapass = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
           
            let hashPassWord = await bcrypt.hashSync(password, salt);

            resolve(hashPassWord);
        } catch (e) {
            reject(e);
        }

    })
}

let getAllUser = (id) =>{
    return new Promise( async (resolve, reject) =>{
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let getUserInfoById = (userId) =>{
    return new Promise( async (resolve, reject) =>{
        try {
            let user = await db.User.findOne({
                where: {id: userId},
                raw: true,
            })
            if(user){
                resolve(user);
            }else{
                resolve({});
            }

        } catch (e) {
            reject(e);
        }
    })
}

let updateUserData = (data) =>{
    return new Promise ( async (resolve, reject) =>{
        try {
            let user = await db.User.findOne({
                where: {id: data.id},
                raw: false,
            })
            if(user){
                user.firstName = data.firstname;
                user.lastName  = data.lastname;
                user.address   = data.address;

                await user.save();
               let allUsers = await db.User.findAll();
                resolve(allUsers);
            }else{
                resolve();
            }
            
        } catch (e) {
            console.log(e);
        }
    })
}

let deleteUserById = (userId) =>{
    return new Promise( async (resolve, reject) =>{
        try {
            let user = await db.User.findOne({
                where: {id: userId}
            })
            if(user){
                await user.destroy();
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}