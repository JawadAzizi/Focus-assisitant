<script lang="ts">
    import store from '../../store/store'
    import {El, Progress} from 'yesvelte'
    import Todo from './Todo.svelte';
    let todo 
    store.subscribe(todos =>{
        todo= todos.filter((val)=>val.status == 'planed')
    })
    

    

</script>

<El on:dragstart = {(e)=>console.log('dragevent: ',e)} style='width: 100%; overflow-x:auto'>
    {#each todo as todo (todo.id)}
    <Todo  description={todo.description} {...todo} ></Todo>
    {/each}
</El>




