import store from '../store/store'
import { get } from 'svelte/store'
let baseUrl = 'http://localhost:3000'


export async function request(url, method = 'get', body?){
    console.log('requesting')
    let options:RequestInit  = {
        method,
        headers: {
            'Content-type': 'application/json',
            'Authorization': get(store).accessToken ? `Bearer ${get(store).accessToken}`: ''
        },
        credentials: 'include',
    }
    if(body)options.body = JSON.stringify(body) 
   return fetch(baseUrl+ url, options)
}
    


