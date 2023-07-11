<script lang='ts'>
    import { Button, El, Modal,Input, ModalBody, ModalHeader, ModalFooter, ModalTitle, Label } from "yesvelte";
    import store from '../../store/store'
    import TodoModal from "./TodoModal.svelte";
    import ProjectSelect from "./ProjectSelect.svelte";
    import Avatar from "./Avatar.svelte";
    import { User } from "../../services/auth";
    let user = new User()

    let error = undefined
    let signInModal = false
    let signUpModal = false
    const data = {} as {userName: string, password: string, email: string}

    //deltes an existing todo from project
    const deleteTodo = (e)=>{
        e.preventDefault()
        let todoId = e.dataTransfer.getData('todoId')
        store.update((st)=>{
            console.log("before", $store)
            let newProjects =  st.projects.map(pro=>{
                if (pro.title == st.selectedProject){
                    pro.todos = pro.todos.filter(val=> val.id !== Number(todoId))
                }
                return pro
             })
            return {...st, projects: newProjects}
        })
        console.log("after", $store)
    }
    
    const handleDragOver = (e)=>{
        e.preventDefault()
        e.dataTransfer.dropEffect='move'
        e.target.setAttribute('class', `dropover ${e.target.getAttribute('class')}`)
    }
    const openLoginModal = (e)=>{
        e.preventDefault()
        signUpModal = false
        signInModal = true
        
    }
    const openSignUpModal = (e)=>{
        e.preventDefault()
        signInModal = false
        signUpModal = true
        
    }
    const handleSignIn = async (e)=>{
        e.preventDefault()
        await user.login(data.userName, data.password)
        signUpModal = false

        if($store.accessToken) {
            signUpModal = false
            user.getProjects()
        }else{
            error = 'usign in faild'
        }
    }
    const handleSignUp = async (e)=>{
        e.preventDefault()
        let result = user.register(data.userName, data.password, data.email)
        
        if(result) {
            signUpModal = false
            signInModal = true
        }else{
            error = 'error'
        }
    }
  
    </script>
    
<El p=1 pt=2 style = "display: flex; flex-direction: row; justify-content:space-between" >
    <El d='flex'>
        <ProjectSelect />
        <TodoModal  >
        </TodoModal>
        <button class="y-el y-button y-button-icon" title="Drop todo to Delete"  on:drop={deleteTodo} on:dragover={handleDragOver} ><img alt="Delete" src = './trashbin.svg'></button>
    </El>
    <El>
        <Button on:click={openLoginModal}>sign In</Button>
        <!-- sign in modal -->
        <Modal bind:show={signInModal}>
            <ModalHeader justifyContent='center'>
                <El tag='h3'>Login</El>
            </ModalHeader>
            <ModalBody>
                <Label>
                    User name

                    <Input bind:value={data.userName} type ='text'  title= 'User name' placeholder ='enter user name...' /> 
                </Label>
                <Label>
                    Password
                    
                    <Input bind:value={data.password} type ='password' title = 'Password' placeholder = 'enter password' />
                </Label>
                <El  justifyContent="between"  style="width: 100%; display: flex ; justify-content:space-between">
                    <Button bgColor='danger'  on:click={()=>{signInModal = false} }>Cancel</Button>
                    <Button bgColor='primary'   on:click={handleSignIn}>SignIn</Button>
                </El>
                {error}
            </ModalBody>
            <ModalFooter justifyContent='center' >
                <El  tag = 'a' style='cursor: pointer' on:click = {openSignUpModal} >
                    sign up
                </El>

            </ModalFooter>

        </Modal>

        <!-- signup modal -->
        <Modal bind:show={signUpModal}>
            <ModalHeader justifyContent='center'>
                <El tag='h3'>Rigister</El>
            </ModalHeader>
            <ModalBody>
                <Label>
                    User name
                    <Input bind:value={data.userName} type ='text'  title= 'User name' placeholder ='enter user name...' /> 
                </Label>
                <Label>
                    Email
                    <Input bind:value={data.email} type ='email'  title= 'Email' placeholder ='enter email...' /> 
                </Label>
                <Label>
                    Password
                    <Input bind:value={data.password} type ='password' title = 'Password' placeholder = 'enter password' />
                </Label>
                <El  justifyContent="between"  style="width: 100%; display: flex; justify-content: space-between">
                    <Button bgColor='danger'  on:click={()=>{signUpModal = false} }>Cancel</Button>
                    <Button bgColor='primary'   on:click={handleSignUp}>SignIn</Button>
                </El>
                {error}
            </ModalBody>
            <ModalFooter justifyContent='center' >
                <El  tag = 'a' style='cursor: pointer' on:click = {openLoginModal} >
                    sign in
                </El>
            </ModalFooter>
        </Modal>

        <Avatar >
        </Avatar>
    </El>
</El>

<style>
   
</style>