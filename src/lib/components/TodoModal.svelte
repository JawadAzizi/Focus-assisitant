<script  lang='ts'>
    import { Modal,Input, ModalBody, ModalFooter, ModalHeader, Button, El, FormInput } from "yesvelte";
    import { createEventDispatcher } from "svelte";
    import store from '../../store/store'
    import Planed from "./Planed.svelte";

    let showModal = false
    let data = {
        title: undefined,
        description: undefined
    }


    const createNewTodo = (e)=>{
        e.preventDefault()
        e.stopPropagation()
        document.forms[0].reset()
        showModal = !showModal
        console.log('showmodal: ', showModal)
    }
    const saveTodo = (e)=>{
        console.log('form submited: ', e)
        e.preventDefault()
        e.stopPropagation()
        //handle aveing
        let todo = {
                title: data.title??'No title',
                description: data.description??"",
                progress: 0,
                status: "planed",
                id: Math.max(...$store.map(e=>e.id))+1
            }
        store.update( todos => [todo, ...todos])
        console.log("dataSaved")
        console.log("store", $store)

        showModal = !showModal
    }

</script>

<button title="Create new todo" on:click={createNewTodo}><img alt ='New todo' src="./create.svg" ></button>
<Modal title='Create a ToDo' placement='top' bind:show={showModal} {...$$props}>
    <form on:submit={saveTodo} >
        <ModalBody>
            <FormInput bind:value={data.title} label='Title' type = 'text'  placeholder='Todo Title'/>
            <FormInput bind:value={data.description} label='Description' type = 'textarea' placeholder='descrpion' />
    
        </ModalBody>
        <ModalFooter >
            <Button bgColor='danger' type='reset' on:click={()=>showModal = !showModal} >Cancel</Button>
            <Button type='submit' bgColor='azure' ms='auto'  >Create</Button>
        </ModalFooter>
    </form>
</Modal>


