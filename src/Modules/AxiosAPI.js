import React from "react";
import axios from "axios";


const AxiosAPI = (link, method, isToasted, content) => {

    let headers = content?.headers ? content.headers : {}
    let body = content?.body ? content.body : {}
    let params = content?.params ? content.params : {}

    return new Promise((resolve, reject) => {
        let axiosInstance = axios.create()
        axiosInstance.interceptors.response.use((response) => {

            resolve(response?.data)
            return null
        }, (error) => {

            reject(error)
        });

        axiosInstance({
            url: link,
            method: method,
            headers: {
                ...headers,
                'Accept': 'application/json',
            },
            data: body,
            params: params
        })

    })


}

export default AxiosAPI
