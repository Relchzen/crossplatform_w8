import axios from 'axios'

const ENV = process.env.EXPO_PUBLIC_API_URL

export const getUsers = () => {
    return axios.get(ENV+'users')
}

export const getPosts = () => {
    return axios.get(ENV+'posts')
}

export const postData = (data : any) => {
    return axios.post(ENV + 'posts', data)
}

export const getPost = (id: Number) => {
    return axios.get(ENV + `posts/${id}`)
}

export const updatePost = (id: Number, data: any) => {
    return axios.put(ENV + `posts/${id}`, data)
}