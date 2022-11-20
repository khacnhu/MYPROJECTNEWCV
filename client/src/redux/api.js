import axios from "axios";

const API = axios.create({withcredentials: true, baseURL : "http://localhost:5000"})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).accessToken} `
    }
    return req
})

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const googleSignIn = (result) => API.post("/users/googleSignIn", result);
export const changePassword = (formData, id) => API.patch(`/users/changepassword/${id}`, formData)


export const createTour = (UploadTourData) => API.post("/tour", UploadTourData);
export const getTours = (page) => API.get(`/tour?page=${page}`)
export const getTour = (id) => API.get(`/tour/${id}`)
export const getToursByUser = (userId) => API.get(`/tour/userTours/${userId}`);
export const deleteTour = (id) => API.delete(`/tour/${id}`);
export const updateTour = (updatedTourData, id) => API.patch(`/tour/${id}`, updatedTourData);
export const getToursBySearch = (searchQuery) => API.get(`/tour/search?searchQuery=${searchQuery}`)

export const getToursByTag = (tag) => API.get(`/tour/tag/${tag}`)
export const getRelatedTours = (tags) => API.post(`/tour/relatedTours`, tags);

export const likeTour = (id) => API.patch(`/tour/like/${id}`)


// export const getTours = (page) => API.get(`/tour?page=${page}`);
// export const getTour = (id) => API.get(`/tour/${id}`);

// export const getToursBySearch = (searchQuery) =>
//   API.get(`/tour/search?searchQuery=${searchQuery}`);

// export const getTagTours = (tag) => API.get(`/tour/tag/${tag}`);
// export const likeTour = (id) => API.patch(`/tour/like/${id}`);




