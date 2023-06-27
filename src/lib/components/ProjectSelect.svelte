<script>
    import { Select, Modal, ModalBody, ModalFooter,Dropdown,DropdownMenu, DropdownItem, Button, FormInput, SidebarItem } from "yesvelte";
    import store from '../../store/store'
    import { get } from "svelte/store";
    import { onMount } from "svelte";
    let items
    let value
    $:{items= $store?.projects?.map((pro)=>pro.title)}
    $:{value = $store?.selectedProject } 
    let data = {title: ''}

    store.subscribe((v)=>{
        value = v.selectedProject
    }) 

    console.log('items', items)
    console.log('value', value)
    let showModal = false

    const createNewProject =(e) =>{
        // console.log("createing new project, projects: " ,$store.projects)
        showModal = true
        
    }
    const saveProject = ()=>{
        console.log('saveing projects: title: ', data.title)
        
        let newProject = {
            title: data.title,
            users: [{
                name: 'this user'
            }],
            todos: [
            ]
        }
        $store.projects = [...$store.projects, newProject]
        showModal = false
        $store.selectedProject = newProject.title
    }

    const selectItem = (e)=>{
        $store.selectedProject = e
    }


    onMount(()=>{

    })
    
    

</script>

<Dropdown   autoClose={true} bind:value >
    <Button p=2  slot='target'>{value}</Button>
    <DropdownMenu >
        <!-- {#each items as  item}
            <DropdownItem  on:click={()=>selectItem(item)}>{item}</DropdownItem>        
        {/each} -->
        <DropdownItem id ='create-new-project' on:click={createNewProject} >Create new project <img alt ='New todo' src="./create.svg" ></DropdownItem>
    </DropdownMenu>
</Dropdown>

   
<Modal on:close = {()=>showModal =false} title='Create a ToDo' placement='top' show={showModal} {...$$props}>
    <form on:submit|preventDefault={saveProject} >
        <ModalBody>
            <FormInput bind:value={data.title} label='Title' type = 'text'  placeholder='Todo Title'/>
        </ModalBody>
        <ModalFooter>
            <Button bgColor='danger' type='reset' on:click={()=>showModal = false} >Cancel</Button>
            <Button type='submit' bgColor='azure' ms='auto'  >Create</Button>
        </ModalFooter>
    </form>
</Modal>