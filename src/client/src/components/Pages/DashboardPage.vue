<template>
<div>
    <h1>Welcome to SSEMMI</h1>
    <h4>Grab your token here:</h4>
    <h6 id="userToken">{{userToken}}</h6>
    <button v-clipboard="copyToken" class="btn">Copy your token</button>
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
            try {
                alert('Token copied!')
                return this.userToken
            } catch (error) {
                alert('Sorry, unable to copy your token :(')
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
