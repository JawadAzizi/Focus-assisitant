<script>
    import store from '../../store/store'
    import {Dropdown, El, Progress} from 'yesvelte'
    import Todo from './Todo.svelte';
    let todo
    $:{todo = $store.filter((val)=> val.status=='progress')}
     
    const progressTodo =({detail}, todo)=>{
        store.update((str)=>{
            let newStore= str.map((st)=>{
                if(st.id == todo.id) st = {...st, progress: st.progress+detail} 
                if(st.progress >= 100) st.status='completed' 
                if(st.progress <=0) st .status='planed'
                return st
            } )
            return newStore
        })
    }
    const handleDragOver =(e)=>{
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
    }
    const handleDrop = (e)=>{
        e.preventDefault()
        console.log('id', Number(e.dataTransfer.getData('todoId')))
        store.update(todo=>{
            return todo.map( val=>{
                if(val.id == Number(e.dataTransfer.getData('todoId')) && val.status!='progress'){
                    val.status='progress'
                }
                return val
            })
        })
    }
</script>

<div style='width: 100%; overflow-x:auto' on:dragover={handleDragOver} on:drop={handleDrop}>
    {#each todo as todo}
    <Todo on:progress={(e)=>progressTodo(e, todo)} {...todo}></Todo>
    {/each}
</div>



