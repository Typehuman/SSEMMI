<template>
    <div id="user-table">
        <mdb-datatable-2
            v-model="userReqTable"
            striped
            bordered
            fixedHeader
            selectable
            @selected="selected = $event"
        />
        <button to="/" @click="approveUserMethod" class="btn">Approve Selected Users</button>
    </div>
</template>

<script>
  import axios from 'axios'
  import { mdbDatatable2 } from 'mdbvue'

  export default {
    name: 'DatatablePage',
    components: {
      mdbDatatable2
    },
    data() {
      return {
        selected: null,
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
            },
            {
              label: 'id',
              field: 'id',
              sort: 'asc'
            }
          ],
          rows: []
        }
      }
    },
    mounted() {
      this.loadUserRequest()
    },
    methods: {
      approveUserMethod() {
        // Check for event error to prevent propagation
        event.preventDefault()

        const regUserRequst = {
          'isApproved': true,
          'name': this.selected.name,
          'access_token': this.$store.getters.getUserToken
        }

        //Header post method to pass user details by passing created user details
        axios.put(`${process.env.VUE_APP_WEB_SERVER_URL}/apiv1/users/${this.selected.id}`, regUserRequst)
        // Redirect to requested page
        .then( regUser => {
          console.log(`Added ${regUser.data}`)
          location.reload()
        })
        // Check for request errors
        .catch(err => {
          console.log(err)
        })
      },
      loadUserRequest() {
        this.$store.dispatch("get_user_requests")
        .then(res => {
          let getList = JSON.parse(JSON.stringify(res.data))

          for (let i = 0; i < getList.length; i++) {
            let userMap = {
              name: getList[i].name,
              email: getList[i].email,
              createdAt: getList[i].createdAt,
              id: getList[i]._id
            }
            this.userReqTable.rows.push(userMap)
          }
        })
      }
    }
  }
</script>

<style scoped>
  #user-table {
    width: 800px;
    height: 450px;
    margin: auto;
    position: relative;
  }
</style>
