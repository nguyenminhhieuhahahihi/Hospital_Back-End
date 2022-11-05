import clinicService from '../services/clinicService';


let createClinic = async (req, res) =>{
    try {
      
        let infor = await clinicService.createClinicFromService(req.body);
        return res.status(200).json(infor)
       
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllClinic = async (req, res) =>{
    try {
      
        let infor = await clinicService.getAllClinicFromService();
        return res.status(200).json(infor)
       
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getDetailClinicById = async (req, res) =>{
    try {
      
        let infor = await clinicService.getDetailClinicByIdFromService(req.query.id);
        return res.status(200).json(infor)
       
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById,
}