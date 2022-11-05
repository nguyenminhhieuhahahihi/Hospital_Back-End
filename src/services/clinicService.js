const db = require("../models");

let createClinicFromService = (data) =>{
    return new Promise(async(resolve, reject) =>{
      
        try {
            if(!data.name || !data.imageBase64 || !data.address ||
                 !data.descriptionHTML || !data.descriptionMarkdown){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
             }else{
                await db.Clinic.create({
                    name: data.name,
                    image: data.imageBase64,
                    address: data.address,
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

let getAllClinicFromService = () =>{
    return new Promise(async(resolve, reject) =>{
      
        try {
            let data = await db.Clinic.findAll({
                
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

let getDetailClinicByIdFromService = (inputId) =>{
    
    return new Promise(async(resolve, reject) =>{
        
        try {
           if(!inputId ){
            resolve({
                errMessage: 'Missing parameter',
                errCode: 1,
            })
           }else{
                 let data = await db.Clinic.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: [ 'name', 'address' ,'descriptionHTML', 'descriptionMarkdown']
                })
                if(data){
                    let doctorClinic = [];
                        doctorClinic = await db.Doctor_Infor.findAll({
                            where: {clinicId: inputId},
                            attributes: ['doctorId', 'provinceId'],
                            })
                            data.doctorClinic = doctorClinic;
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
    createClinicFromService: createClinicFromService,
    getAllClinicFromService: getAllClinicFromService,
    getDetailClinicByIdFromService: getDetailClinicByIdFromService,
}