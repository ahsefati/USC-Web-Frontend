import * as api from '../index'

export const getPointsInBoxTest = async (formdata) => {
    try {
        console.log(formdata)
        const {data} = await api.getPointsInBoxTest(formdata)
        return data
    } catch (error) {
        return error
    }
}