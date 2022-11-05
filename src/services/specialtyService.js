const db = require("../models");

let createSpecialtyFromService = (data) =>{
    return new Promise(async(resolve, reject) =>{
      
        try {
            if(!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
             }else{
                await db.Specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })

                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
             }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllSpecialtyFromService= () =>{
    return new Promise(async(resolve, reject) =>{
        
        try {
            let data = await db.Specialty.findAll({
                
            });
            if(data && data.length > 0){
                data.map(item =>{
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })
            }
            resolve({
                errMessage: 'OK',
                errCode: 0,
                data
            })
        } catch (e) {
            reject(e);
        }
    })
}

let getDetailSpecialtyByIdFromService = (inputId, location) =>{
    return new Promise(async(resolve, reject) =>{
        
        try {
           if(!inputId || !location){
            resolve({
                errMessage: 'Missing parameter',
                errCode: 1,
            })
           }else{
                 let data = await db.Specialty.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['descriptionHTML', 'descriptionMarkdown']
                })
                if(data){
                    let doctorSpecialty = [];
                    if(location === 'ALL'){
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: {specialtyId: inputId},
                            attributes: ['doctorId', 'provinceId'],
                            })
                    }else{
                        //find by location
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: {specialtyId: inputId, 
                                    provinceId: location
                            },
                            attributes: ['doctorId', 'provinceId'],
                            })
                    }
                    
                    data.doctorSpecialty = doctorSpecialty;
                    console.log('check doctorSpecialty', data.doctorSpecialty);
                 }else{
                     data = {}
                 }
                 resolve({
                     errMessage: 'OK',
                     errCode: 0,
                     data
                 })
            }
           
          
           
            
        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    createSpecialtyFromService: createSpecialtyFromService,
    getAllSpecialtyFromService: getAllSpecialtyFromService,
    getDetailSpecialtyByIdFromService: getDetailSpecialtyByIdFromService,
}