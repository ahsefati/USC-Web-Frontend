import * as api from '../index'

export const getPoints = async (formdata) => {
    try {
        const {data} = await api.getPoints(formdata)
        return data
    } catch (error) {
        return error
    }
}


export const getAllSources = async () => {
    try {
        const {data} = await api.getAllSources()
        return data        
    } catch (error) {
        return error
    }
}

export const getAllUsers = async () => {
    try {
        const {data} = await api.getAllUsers()
        return data        
    } catch (error) {
        return error
    }
}

export const getHistogramInfo = async (formdata) => {
    try {
        const {data} = await api.getHistogramInfo(formdata)
        return data
    } catch (error) {
        return error
    }
}