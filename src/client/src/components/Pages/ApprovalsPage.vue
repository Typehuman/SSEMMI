<template>
    <div id="user-table">
        <mdb-datatable
            :data="data"
            striped
            bordered
        />
    </div>
</template>

<script>
  import axios from 'axios'
  import { mdbDatatable } from 'mdbvue'
  
  export default {
    name: 'DatatablePage',
    components: {
      mdbDatatable
    },
    data() {
      return {
        data: {
          columns: [
            {
              label: 'Name',
              field: 'name',
              sort: 'asc'
            },
            {
              label: 'Email',
              field: 'email',
              sort: 'asc'
            },
            {
              label: 'Requested At',
              field: 'requestedAt',
              sort: 'asc'
            }
          ],
          rows: [
            {
              name: 'Tiger Nixon',
              email: 'tiger@man.com',
              requestedAt: '2011/04/25'
            }
          ]
        }
      }
    },
    methods: {
      addUserMethod(event) {
        // Check for event error to prevent propagation
        event.preventDefault()

        const regUserRequst = {
          'email': this.registerUserData.email,
          'password': this.registerUserData.password,
          'access_token': this.VUE_APP_MASTER_KEY
        }

        //Header post method to pass user details by passing created user details
        axios.post('http://localhost:9000/apiv1/users/', regUserRequst)
        // Redirect to requested page
        .then( regUser => {
          console.log(`Successfully added ${regUser.data}`)
          this.$router.push({name: 'Dashboard'})
        })
        // Check for request errors
        .catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>
  #user-table {
    width: 700px;
    height: 450px;
    margin: auto;
    position: relative;
  }
</style>