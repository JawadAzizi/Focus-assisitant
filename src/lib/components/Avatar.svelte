<script>
    import {Button ,Popover, Avatar, Icon, Dropdown, DropdownItem,DropdownMenu, El } from "yesvelte";
    import store from '../../store/store'
    import { User } from "../../services/auth";
    import user from "../../store/store";
    export let img = undefined;

    const handleLogout=()=>{
        const user = new User()
        user.logOut()

    }

</script>


<Avatar shape='circle' mx='3' shadow='sm' > 
    <Dropdown   autoClose arrow={true} value='something'  >
        {#if !img}
            <Icon name='user' slot='target' />
        {:else}
            <img src="{$store.img}"  alt="profile" />
        {/if}
        <DropdownMenu  >
            <DropdownItem tag='h3' >{$store.userName}</DropdownItem>
            <DropdownItem tag= 'h3' >{$store.email}</DropdownItem>
            <DropdownItem on:click={handleLogout} tag = 'h3' >Logout</DropdownItem>
        </DropdownMenu>
    </Dropdown>
   
</Avatar>