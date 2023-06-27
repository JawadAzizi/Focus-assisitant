<script lang='ts'>
    import store from '../../store/store'
    import {El, Progress} from 'yesvelte'
    import Todo from './Todo.svelte';
    let todo
    $:{ todo = $store?.projects?.find(pro=>pro.title == $store.selectedProject)?.todos?.filter((val)=>val.status == 'completed')}
    

</script>



<El style='width: 100%; overflow-x:auto'>
    <!-- {#each todo as todo}
    <Todo {...todo}></Todo>
    {/each} -->
</El>



