import { writable } from 'svelte/store'



type ProjectType = {
    title: String,
    users: any,
    todos: any

}
 let user = writable({} as {
    userName : string,
    email: string,
    projects : ProjectType[],
    selectedProject: string,
    img: string,
    accessToken : string
 })
 user.subscribe(subscriber=>{
    console.log('Strore just uptaded: ', subscriber)
 })



 export default user
