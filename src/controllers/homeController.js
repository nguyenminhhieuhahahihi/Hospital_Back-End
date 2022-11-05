
import db from '../models/index';
import CRUDSerview from '../services/CRUDService'



let getHomePage = async (req, res) =>{
    try{
        // let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify({})
        });
    }catch(e){
        console.log(e);
    }
}

let getCRUD = (req,res) =>{
        return res.render('crud.ejs');
}

let postCRUD = async (req,res) =>{ 
    let message = await CRUDSerview.createNewUser(req.body);
        console.log(message);
        return res.send('post crud from server');
}

let displayGetCRUD = async (req, res) =>{
    let data = await CRUDSerview.getAllUser();
    console.log(data); 
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}

let getEditCRUD = async (req, res) =>{
        let userId = req.query.id;
        console.log(userId);
        if(userId){
            let userData = await CRUDSerview.getUserInfoById(userId);
          //  console.log(userData);

            return res.render('editCRUD.ejs', {
                user: userData
            });
        }else{
            return res.send('Users not found!');
        } 
}

let putCRUD = async (req, res) =>{
    let data = req.body;
    let allUsers = await CRUDSerview.updateUserData(data);
    console.log('This is new User: ',data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    })
}

let deleteCRUD = async (req, res) =>{
    let id = req.query.id;
    if(id){
        await CRUDSerview.deleteUserById(id);
        return res.send('Delete the user succeed!');

    }else{
        return res.send('User not found!');
    }
    
}

// obj: key: ' ', value: ' '
module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}