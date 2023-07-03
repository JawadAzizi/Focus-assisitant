<script lang="ts">
	import {Pane, Splitpanes} from 'svelte-splitpanes'
	import Planed from './lib/components/Planed.svelte';
	import Fineshed from './lib/components/Fineshed.svelte';
    import InProgress from './lib/components/InProgress.svelte'
    import Header from './lib/components/Header.svelte';
    import 'yesvelte/css/tabler.min.css'
    import {onMount} from 'svelte'

	import store from './store/store'
    import Todo from './lib/components/Todo.svelte';
    import { User } from './services/auth';
  
	// load the todos to store
        type T ={
        name:string,
        description: string,
        progress: number
        }
	
    let todos = []
  

    type ProjectType = {
        title: string,
        users: any,
        todos: any

    }
    let project:ProjectType[] = [] 
    type UserStoreType={
        userName: string,
        email: string,
        projects: ProjectType[],
        selectedProject: string,
        img: string,
        accessToken: string
    }
    let userStore: UserStoreType = {
        userName : '',
        email: "",
        projects : project,
        selectedProject: '',
        img: '',
        accessToken : ''
    }

	$store = userStore
    console.log("store: ", $store)
//todo: 
//1. we should authenticate
//2. we load the data
//3. if we could not determine the user then we serve it as guest

let user = new User()

onMount(async ()=>{
        
        await user.authunticate()
        console.log('autheticated1')

        try{
            if($store.accessToken){
                console.log('autheticated')
                //load the projects 
                //load the todos
                

            }else{
                //if the user is not authenticated 
                //check the local storage for projects and todos
                
            }
        }catch(e){
            console.log("Error: ", e.message)
        }
    })

$: if($store.accessToken) user.getProjects()


</script>



<Header></Header>
<Splitpanes >
	<Pane >
        <Planed ></Planed>
	</Pane>
	<Pane>
		<InProgress></InProgress>
	</Pane>
	<Pane>
		<Fineshed></Fineshed>
	</Pane>
</Splitpanes>

<style>
    :global(.splitpanes__pane ){
        display: flex;
    }
    
</style>



