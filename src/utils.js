import axios from "axios";
import {baseURL} from "./constants/baseURL";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVyYXlfZ3VsNGJAaG90bWFpbC5jb20iLCJpYXQiOjE2NzkwNzEyNjMsImV4cCI6MTY3OTgwMDI2M30.zcR03X_6MrKRv00Qn9xJWLTgEZGsC8nDYrYB-YyF-sY";
export const completeTodo = (id) => {
    return new Promise(async (resolve, reject) => {
        const data = JSON.stringify({
            "id": id
        });
        axios({
            method: 'put',
            maxBodyLength: Infinity,
            url: `${baseURL}/todo/markTodoCompleted`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        })
            .then(function (response) {
                resolve(response)

            })
            .catch(function (error) {
                reject(error);
            });
    })
}

export const incompleteTodo = (id) => {
    return new Promise(async (resolve, reject) => {
        const data = JSON.stringify({
            "id": id
        });
        axios({
            method: 'put',
            maxBodyLength: Infinity,
            url: `${baseURL}/todo/markTodoUncompleted`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        })
            .then(function (response) {
                resolve(response)

            })
            .catch(function (error) {
                reject(error);
            });
    })
}

export const deleteTodo = (id) => {
    return new Promise(async (resolve, reject) => {
        const data = JSON.stringify({
            "id": id
        });
        axios({
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${baseURL}/todo/deleteTodo`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        })
            .then(function (response) {
                resolve(response)

            })
            .catch(function (error) {
                reject(error)
            });
    });
}

export const addTodo = async (e) => {
    return new Promise(async (resolve, reject) => {
        const value = e.target[0].value;
        if (value === "") {
            resolve("empty")
        } else {
            let data = JSON.stringify({
                "title": value
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${baseURL}/todo/createTodo`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            await axios(config)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error);
                });
        }
    });

}
