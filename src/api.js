const axios = require('axios');

const URL = 'http://localhost:3001/'

const headers = {
    'Content-Type': 'text/plain'
};

export async function getDialogList(){
    return axios.get(`${URL}dialogList`, { headers });
}

export async function getMessageList(id){
    console.log(id);
    return axios.get(`${URL}message-list`, { headers });
}

export async function getUserInfo(){
    return axios.get(`${URL}user-info`, { headers });
}

export async function getDialog(){
    return axios.get(`${URL}dialog`, { headers });
}
