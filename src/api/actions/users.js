import * as api from '../index'

export const signin = async (formData) => {
    try {
        const {data} = await api.signIn(formData)

        return data


    } catch (error) {
        return error
    }
}

export const sendVerificationCode = async (formData) => {
    try {
        const {data} = await api.sendVerificationCode(formData)
        
        return data

    } catch (error) {
        return error
    }
}

export const changeUserPassWithVerificationCode = async (formData) => {
    try {
        const {data} = await api.changeUserPassWithVerificationCode(formData)
        
        return data

    } catch (error) {
        return error
    }
}

export const signup = async (formData) => {
    try {
        const {data} = await api.signUp(formData)
        return data


    } catch (error) {
        return error
    }
}

export const updateUserInfo = async (updatedInfo) => {
    try {
        const {data} = await api.updateUserInfo(updatedInfo)
        return data
    } catch (error) {
        return error
    }
}

export const changeUserPass = async (updatedInfo) => {
    try {
        const {data} = await api.changeUserPass(updatedInfo)
        return data
    } catch (error) {
        return error
    }
}

export const updateUserAvatar = async (updatedAvatar) => {
    try {
        const {data} = await api.updateUserAvatar(updatedAvatar)
        return data
    } catch (error) {
        return error
    }
}

export const saveATool = async (id) => {
    try {
        const {data} = await api.saveATool(id)
        return data
    } catch (error) {
        return error
    }
}