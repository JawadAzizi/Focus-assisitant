<script lang="ts">
    import {El, Progress, ProgressBar} from 'yesvelte'
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher()
    import Arrow from './Arrow.svelte';
    export let title=undefined
    export let description=undefined
    export let progress =0
    export let status =undefined
    export let id = undefined
   
    console.log(title , description, progress)

    const handleDragEnd = (e)=>{
        console.log('dragEnd: ', e)
    }
    const handleDragStart = (e)=>{
        e.dataTransfer.dropEffect = 'move'
        e.dataTransfer.setData('todoId', e.target.getAttribute('id'))
        console.log('dragStart element:', e.target.getAttribute('id'))
    }
   
</script>

<div id={id} class="todo" draggable="true"  on:dragstart={handleDragStart}>
    <div  class="progBar" style={`background: linear-gradient(to right, #006aff ${progress}%, #d0d0d0 0px);`}>
        {#if title !== undefined}
        <El style="pointer-events: none;margin: 5px" tag='h2' >
            {title}
        </El>
        {/if}
        {#if description !== undefined}
                <El style="pointer-events: none; margin: 5px" tag='p' >
                    {description}
                </El> 
        {/if}
        
        <El textAlign='center' tag='p' style='margin:5px; text-align:center;pointer-events: none '>
            status: { status},
            progress: { progress}
        </El>

        {#if status == 'progress'}
           <El style='display:flex; flex-direction: row; justify-content: space-between'>
               <Arrow on:progress={()=>dispatch('progress', -10)} direction='left' />
               <Arrow on:progress={()=>dispatch('progress', 10)} />
           </El>
        {/if}
    </div>
</div>

<style>
    .todo{
        box-sizing: border-box;
        width: 100%;
        overflow-wrap: break-word;
        padding: 5px;
        background-color: transparent;
        background: transparent;
        border: none;
        
    }
    .progBar{
        padding: 5px;
        border-radius: 10px;
        position: static;    
   }
</style>
    
    



