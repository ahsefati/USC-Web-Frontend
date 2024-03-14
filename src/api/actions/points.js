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