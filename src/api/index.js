import axios from 'axios'

// const API = axios.create({baseURL: 'http://localhost:5000/'})

const API = axios.create({baseURL: 'https://usc-web-backend.onrender.com/'})

API.interceptors.request.use((req)=>{
    if (localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req
})


// User
export const signIn = (formData) => API.post("/users/signin", formData)
export const signUp = (formData) => API.post("/users/signup", formData)
export const sendVerificationCode = (formData) => API.patch("/users/sendVerificationCode", formData)
export const changeUserPassWithVerificationCode = (formData) => API.patch("/users/changeUserPassWithVerificationCode", formData)

export const updateUserInfo = (updatedInfo) => API.patch("/users/updateUserInfo", updatedInfo)
export const changeUserPass = (updatedInfo) => API.patch("/users/changeUserPass", updatedInfo)
export const updateUserAvatar = (updatedAvatar) => API.patch("/users/updateUserAvatar", updatedAvatar)
export const saveATool = (id) => API.patch(`/users/saveatool/${id}`)


// Tools - Dashboard
export const getToolsInfo = () => API.get("/tools")
export const likeATool = (id) => API.patch(`/tools/${id}/likeatool`)
export const getUniversitiesInfo = () => API.get("/tools/universities")
export const getCountriesInfo = () => API.get("/tools/countries")
export const getGeneralCosts = () => API.get("/tools/generalcosts")
export const getAllJobs = () => API.get("/tools/jobs")
export const searchJobsByNJ = (formData) => API.post("/tools/searchJobsByNJ", formData)
export const searchFieldsByNF = (formData) => API.post("/tools/searchFieldsByNF", formData)


// coins
export const getTransactions = () => API.get("/tools/transactions")
export const getLatestCoinsInfo = () => API.get("/tools/livecoinsdata")
export const getLatestCoinInfo = (formData) => API.post(`/tools/livecoindata`, formData)
export const addCash = (formData) => API.patch(`/tools/addcash`, formData)
export const withdrawCash = (formData) => API.patch(`/tools/withdrawcash`, formData)
export const buyCoin = (formData) => API.patch(`/tools/buycoin`, formData)
export const sellCoin = (formData) => API.patch(`/tools/sellcoin`, formData)

