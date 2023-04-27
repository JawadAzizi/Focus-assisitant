<script lang="ts">
	import {Pane, Splitpanes} from 'svelte-splitpanes'
    import { Button, El } from 'yesvelte';
	import Planed from './lib/components/Planed.svelte';
	import Fineshed from './lib/components/Fineshed.svelte';
    import InProgress from './lib/components/InProgress.svelte'
    import TodoModal from './lib/components/TodoModal.svelte';
    import Header from './lib/components/Header.svelte';
    import 'yesvelte/css/tabler.min.css'

	import store from './store/store'

  
	// load the todos to store
        // type T ={
        // name:string,
        // description: string,
        // progress: number
        // }
	
    let todos = [
        {
        id: 1,
        title:" first todo",
        description: 'this is first',
        progress: 0,
        status: "planed"
        },
        {
        id: 2,
        title:" second todo",
        description: 'this is first',
        progress: 90,
        status: "progress"
        },
        {
          id:3,  
        title:" third todo",
        description: 'this is first',
        progress: 90,
        status: "progress"
        },
        {
            id: 4,
        title:" forth todo",
        description: 'this is second',
        progress: 10,
        status: "progress"
        },
        {
            id: 5,
        title:" fifth todo",
        description: 'this is second',
        progress: 50,
        status: "progress"
        },
        {
            id: 6,
        title:" sixth todo",
        description: 'this is second',
        progress: 100,
        status: "completed"
        },
        {
            id: 7,
        title:" seventh todo",
        description: 'this is second',
        progress: 100,
        status: "completed"
        },
        {
            id: 8,
        title:" eight todo",
        description: 'this is second',
        progress: 100,
        status: "completed"
        },
        {
            id: 9,
        title:" nineth todo",
        description: 'this is second',
        progress: 100,
        status: "completed"
        },
    ]
	$store = todos

    console.log($store)

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



