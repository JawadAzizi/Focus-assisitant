import { request } from "./index";
import user from '../store/store'

class User {
    userName: string
    password:string;
    accessToken:string;   
    email: string;
    constructor(){
        
    }

    login(userName, password){
        //log th user in
        request('/signin', 'post' ,{userName : userName, password: password})
        .then(res=>{
            if(res.ok){
                return res.json()
            }else{
                throw new Error('Error logining'+res.status)
            }

        })
        .then(data =>{
            console.log('data', data)
            this.accessToken = data.accessToken
            this.email = data.email
            this.password = password
            this.userName = userName

            user.update(updater=>{
                updater.userName = userName
                updater.accessToken = data.accessToken
                updater.email = data.email
                return updater
            })
        })
        .catch(error => console.log('errror: ', error))
    }
    async authunticate() {
        //authinticate
        request('/refresh', 'get' )
        .then(res=>{
            if(res.ok){
                return res.json()
            }else{
                throw new Error('error authenticating: '+ res.status)
            }
        })
        .then(data =>{
            console.log('authenticated successfully', data.userName)
            this.accessToken = data.accessToken
            this.email = data.email
            this.userName = data.userName

            user.update(updater=>{
                updater.userName = data.userName
                updater.accessToken = data.accessToken
                updater.email = data.email
                return updater
            })
        })
        .catch(error => console.log('errror: ', error))

    }
    async register(userName: string, password: string, email: string){
        request('/signup', 'post' ,{userName : userName, password: password, email: email})
        .then(async res=>{
            if(res.ok)
                return res.ok;

        })
        .catch(error => console.log('errror: ', error))

    }
    logOut(){
        request('/logout', 'post', {})
        .then(async res=> {
            if(res.ok){
                user.set({})
                console.log('logout successfull')
            }else{
                throw new Error('error logingout')
            }
        })
        
        .catch(error => console.log('errror: ', error))
    }
    isAuthenticated(){

    }
    getProjects (){
        request('/projects/'+this.userName, 'get', {})
        .then(res => res.json())
        .then(data => {
            console.log('projects loaded sucessfully ', data)
        })
        .catch(error=>{
            console.error('error getting projects : ', error)
        })
    }

}


export {User}