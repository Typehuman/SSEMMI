<template>
<div>
    <h1>Welcome to SSEMMI</h1>
    <h4>Grab your token here:</h4>
    <h6 id="userToken">{{userToken}}</h6>
    <button v-on:click="copyToken" >Copy your token</button>
</div>    
</template>

<script>
export default {
    name: "Dashboard",
    data() {
        return {
            userToken : ''
        }
    },
    methods: {
        copyToken() {
            let copy = document.getElementById("userToken")
            // copy.select()
            console.log(copy)
            try {
                document.execCommand("copy")
                alert("Token copied!")
            } catch (error) {
                alert(" :( Oops sorry, you have to manually copy the token.")
            }
        }
    },
    mounted() {
        if(sessionStorage.userToken) {
            this.userToken = sessionStorage.userToken
        }
    }
}
</script>