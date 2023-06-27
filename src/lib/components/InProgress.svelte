<script>
    import store from '../../store/store'
    import {Dropdown, El, Progress} from 'yesvelte'
    import Todo from './Todo.svelte';
    let todo
    $:{todo = $store.projects?.find(pro=>pro.title == $store.selectedProject)?.todos?.filter((val)=>val.status == 'progress')}
     
    const progressTodo =({detail}, todo)=>{
        store.update((str)=>{
            str.projects =str.projects.map(pro=>{
                if(pro.title == str.selectedProject){
                    pro.todos = pro.todos.map((st)=>{
                        if(st.id == todo.id){
                            if(st.progress <= 0 && detail< 0) st.status = 'planed'
                            else st.progress = st.progress+ detail
                        } 
                        if(st.progress >= 100) st.status='completed' 
                        if(st.progress < 0) st.status='planed'
                        return st
                    })
                } 
                return pro 
            })
            return str
        })
    }
    const handleDragOver =(e)=>{
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
    }
    const handleDrop = (e)=>{
        e.preventDefault()
        console.log('id', Number(e.dataTransfer.getData('todoId')))
        store.update(str=>{
            str.projects = str.projects.map(pro =>{
                if(pro.title == str.selectedProject){
                    pro.todos = pro.todos.map( td=>{
                        if(td.id == Number(e.dataTransfer.getData('todoId')) && td.status!='progress'){
                            td.status='progress'
                        }
                        return td
                    })
                }
                return pro
            })
            return str
        })
    }
</script>

<div style='width: 100%; overflow-x:auto' on:dragover={handleDragOver} on:drop={handleDrop}>
    <!-- {#each todo as todo}
    <Todo on:progress={(e)=>progressTodo(e, todo)} {...todo}></Todo>
    {/each} -->
</div>



