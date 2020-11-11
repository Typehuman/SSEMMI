<template>
    <div id="user-table">
        <mdb-datatable
            :data="userReqTable"
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
        userReqTable: {
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
              field: 'createdAt',
              sort: 'asc'
            }
          ],
          rows: []
        }
      }
    },
    mounted() {
      try {
        this.$store.dispatch("get_user_requests")
        let getList = this.$store.getters.getUserRequestList
        getList.forEach(user => {
          let userMap = {
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
          }
          console.log(userMap)
          this.userReqTable.rows.push(userMap)
        })
        // this.userReqTable.rows.push(getList)
      } catch (error) {
        console.error(error)
      }
    },
    computed: {
      loadUserRequest: () => {
        this.data.rows = JSON.stringify(this.$store.getters.getUserRequestList)
      }
    },
    methods: {
      approveUserMethod(userId) {
        // Check for event error to prevent propagation
        event.preventDefault()

        const regUserRequst = {
          'isApproved': true,
          'access_token': this.$store.userDetails.user.token
        }

        //Header post method to pass user details by passing created user details
        axios.post(`http://localhost:9000/apiv1/users/${userId}`, regUserRequst)
        // Redirect to requested page
        .then( regUser => {
          console.log(`Added ${regUser.data}`)
          this.$router.go()
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