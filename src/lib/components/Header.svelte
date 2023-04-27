<script lang='ts'>
    import { Button, El, Modal, ModalBody } from "yesvelte";
    import store from '../../store/store'
    import TodoModal from "./TodoModal.svelte";
   
    const deleteTodo = (e)=>{
        e.preventDefault()
        let todoId = e.dataTransfer.getData('todoId')
        store.update((todos)=>{
            console.log("before", $store)
            return todos.filter(val=> val.id !== Number(todoId))
        })
        console.log("after", $store)
    }
    
    const handleDragOver = (e)=>{
        e.preventDefault()
        e.dataTransfer.dropEffect='move'
        e.target.setAttribute('class', 'dropover')
    }
  
    </script>
    
<El p=1 pt=2>
    <El>
        <TodoModal  >
        </TodoModal>
        <button title="Drop todo to Delete"  on:drop={deleteTodo} on:dragover={handleDragOver} ><img alt="Delete" src = './trashbin.svg'></button>
    </El>
    <El>
    </El>
</El>

<style>
   
</style>