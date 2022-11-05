import doctorService from '../services/doctorService';



let getTopDoctorHome = async (req, res) =>{
    let limit = req.query.limit;
    if(!limit) limit = 10;
    try {
        let response = await doctorService.getTopDoctorHomeService(+limit);
       // console.log('check response: ',response);
        return res.status(200).json(response);
        
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server!'
        })
    }
}

let getAllDoctors = async (req, res) =>{
    try {
        let doctors = await doctorService.getAllDoctorsService();
       // console.log('check doctors: ', doctors)
        return res.status(200).json(doctors);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server!'
        })
    }
}

let postInforDoctor = async (req, res) =>{
    try {
        let response = await doctorService.saveDetailInforDoctor(req.body);
        // console.log('check doctors: ', doctors)
         return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server!'
        })
    }
}

let getDetailDoctorById = async (req, res) =>{
    try {
      
        let infor = await doctorService.getDetailDoctorByIdFromService(req.query.id);
        return res.status(200).json(infor)
       
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let bulkCreateSchedule = async (req, res) =>{
    try {
      
        let infor = await doctorService.bulkCreateScheduleService(req.body);
        return res.status(200).json(infor)
       
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getScheduleByDate =  async (req, res) =>{
    try {
      
        let infor = await doctorService.getScheduleByDateFromService(req.query.doctorId, req.query.date);
        return res.status(200).json(infor)
       
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getExtraInforDoctorById = async (req, res) =>{
    try {
      
        let infor = await doctorService.getExtraInforDoctorByIdFromService(req.query.doctorId);
        return res.status(200).json(infor)
       
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getProfileDoctorById = async (req, res) =>{
    try {
      
        let infor = await doctorService.getProfileDoctorByIdFromService(req.query.doctorId);
        return res.status(200).json(infor)
       
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getListPatient = async (req, res) =>{
    try {
      
        let infor = await doctorService.getListPatientFromService(req.query.doctorId, req.query.date);
        return res.status(200).json(infor)
       
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let sendRemedy  = async (req, res) =>{
    try {
      
        let infor = await doctorService.sendRemedyFromService(req.body);
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
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    postInforDoctor: postInforDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraInforDoctorById: getExtraInforDoctorById,
    getProfileDoctorById: getProfileDoctorById,
    getListPatient: getListPatient,
    sendRemedy: sendRemedy,
}