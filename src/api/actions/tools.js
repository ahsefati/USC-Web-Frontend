import * as api from '../index'

export const addCash = async (formdata) => {
    try {
        console.log("OK---!")
        const {data} = await api.addCash(formdata)
        return data
    } catch (error) {
        return error
    }
}

export const withdrawCash = async (formdata) => {
    try {
        
        const {data} = await api.withdrawCash(formdata)
        return data
    } catch (error) {
        return error
    }
}

export const getLatestCoinsInfo = async () => {
    try {
        const {data} = await api.getLatestCoinsInfo()
        return data

    } catch (error) {
        return error
    }
}

export const getLatestCoinInfo = async (id, formdata) => {
    try {
        const {data} = await api.getLatestCoinInfo(id, formdata)
        return data

    } catch (error) {
        return error
    }
}

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
        const {data} = await api.searchFieldsByNF(formData)
        return data
    } catch (error) {
        return error
    }
}