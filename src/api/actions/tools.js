import * as api from '../index'

export const getToolsInfo = async () => {
    try {
        const {data} = await api.getToolsInfo()
        return data

    } catch (error) {
        return error
    }
}

export const likeATool = async (id) => {
    try {
        const {data} = await api.likeATool(id)
        return data
        
    } catch (error) {
        return error
    }
}

export const getUniversitiesInfo = async () => {
    try {
        const {data} = await api.getUniversitiesInfo()
        return data        
    } catch (error) {
        return error
    }
}

export const getCountriesInfo = async () => {
    try {
        const {data} = await api.getCountriesInfo()
        return data        
    } catch (error) {
        return error
    }
}

export const getGeneralCosts = async () => {
    try {
        const {data} = await api.getGeneralCosts()
        return data        
    } catch (error) {
        return error
    }
}

export const getAllJobs = async () => {
    try {
        const {data} = await api.getAllJobs()
        return data
    } catch (error) {
        return error
    }
}


export const searchJobsByNJ = async (formData) => {
    try {
        const {data} = await api.searchJobsByNJ(formData)
        return data
    } catch (error) {
        return error
    }
}

export const searchFieldsByNF = async (formData) => {
    try {
        console.log("OK!!")
        console.log(formData)
        const {data} = await api.searchFieldsByNF(formData)
        return data
    } catch (error) {
        return error
    }
}