import vocalApiService from '../services/vocalApiService'

const readFunc = async (req, res) => {
    try {
        let data = await vocalApiService.readFunc()
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT,  // data
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1', // error code
            DT: '',  // data
        })
    }
}

const createFunc = async (req, res) => {
    try {
        let data = await vocalApiService.createFunc(req.body)
        if (data && data.EC === 2) {
            return res.status(200).json({
                EM: data.EM, // error message
                EC: data.EC, // error code
                DT: data.DT,  // data
            })
        }
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT,  // data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1', // error code
            DT: '',  // data
        })
    }
}

const updateFunc = async (req, res) => {
    try {
        let data = await vocalApiService.updateVocal(req.body)
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT,  // data
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1', // error code
            DT: '',  // data
        })
    }
}

const deleteFunc = async (req, res) => {
    try {
        let data = await vocalApiService.deleteVocal(req.body.id)
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT,  // data
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1', // error code
            DT: '',  // data
        })
    }
}

const assignVocalToUser = async (req, res) => {
    try {
        let data = await vocalApiService.assignVocalToUser(req.body)
        if (data && data.EC === 2) {
            return res.status(200).json({
                EM: data.EM, // error message
                EC: data.EC, // error code
                DT: data.DT,  // data
            })
        }
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT,  // data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1', // error code
            DT: '',  // data
        })
    }
}

const getVocalByUser = async (req, res) => {
    try {
        let data = await vocalApiService.getVocalByUser()
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT,  // data
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1', // error code
            DT: '',  // data
        })
    }
}

module.exports = {
    readFunc,
    createFunc,
    updateFunc,
    deleteFunc, 
    assignVocalToUser,
    getVocalByUser
}