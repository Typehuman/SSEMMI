<template>
<div>
    <div id="token-table-heading">
        <h1 id="token-table-title">Your Active Tokens</h1>
        <mdb-btn outline="black" id="token-table-btn-new" @click.native="modal = true">Create Token</mdb-btn>
    </div>
  <mdb-modal :show="modal" @close="modal = false" centered>
  <mdb-modal-header>
    <mdb-modal-title>Create Token</mdb-modal-title>
  </mdb-modal-header>
  <mdb-modal-body class="grey-text">
        <mdb-input label="Add a name for your token" group type="text" validate error="wrong" success="right" v-model="tokenName"/>
  </mdb-modal-body>
  <mdb-modal-footer>
    <mdb-btn color="secondary" @click.native="modal = false">Cancel</mdb-btn>
    <mdb-btn color="primary" :disabled="tokenName === ''" @click="createToken()">Create Token</mdb-btn>
  </mdb-modal-footer>
  </mdb-modal>
  <div class="token-table-container">
    <mdb-tbl responsive>
      <mdb-tbl-head>
        <tr>
          <th>Name</th>
          <th>Token</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </mdb-tbl-head>
      <mdb-tbl-body>
        <tr v-for="item in userTokenTable.rows" :key="item.reference">
          <td>{{ item.name }}</td>
          <td>{{ item.token }}</td>
          <td>{{ item.createdAt }}</td>
          <td><mdb-btn size="sm" to="/" v-clipboard="() => copyToken(item)" class="btn">Copy</mdb-btn>
             <mdb-btn size="sm" to="/" @click="deleteToken(item)"  class="btn">Delete</mdb-btn></td>
        </tr>
      </mdb-tbl-body>
    </mdb-tbl>
  </div>
</div>
</template>

<script>
import { mdbTbl, mdbTblHead, mdbTblBody, mdbBtn, mdbModal, mdbInput,
  mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter } from 'mdbvue'
import axios from 'axios'

export default {
  name: "Dashboard",
  components: {
    mdbTbl,
    mdbTblHead,
    mdbTblBody,
    mdbBtn,
    mdbModal,
    mdbInput,
    mdbModalBody,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalFooter
  },
  data () {
    return {
      userToken: '',
      modal: false,
      tokenName: '',
      userTokenTable: {
        columns: [
          {
            label: 'Name',
            field: 'name',
            sort: 'asc'
          },
          {
            label: 'Token',
            field: 'token',
            sort: 'asc'
          },
          {
            label: 'Created At',
            field: 'createdAt',
            sort: 'asc'
          }
        ],
        rows: []
      },
    }
  },
  methods: {
    copyToken (item) {
      try {
        alert('Token copied!')
        return item.token
      } catch (error) {
        alert('Sorry, unable to copy your token :(')
      }
    },
    loadUserTokens () {
      this.$store.dispatch("get_user_tokens")
        .then(res => {
          let getList = JSON.parse(JSON.stringify(res.data))
          this.userTokenTable.rows = [];
          for (let i = 0; i < getList.length; i++) {
            let userMap = {
              reference: i + 1,
              name: getList[i].name,
              token: getList[i].token,
              createdAt: getList[i].createdAt,
              id: getList[i]._id
            }
            this.userTokenTable.rows.push(userMap)
          }
        })
    },
    createToken () {
      // Hide login message before clicking on submit login details
      this.modal = false

      this.$store.dispatch('create_token', this.tokenName)
        .then(() => {
          this.loadUserTokens()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteToken (item) {
      // Check for event error to prevent propagation
      event.preventDefault()
      const requestAuth = {
        headers: {
          'Authorization': 'Bearer ' + this.$store.getters.getUserToken,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }

      //Header post method to pass user details by passing created user details
      axios.delete(`${process.env.VUE_APP_WEB_SERVER_URL}/apiv1/users/tokens/${item.id}`, requestAuth)
        // Redirect to requested page
        .then(regUser => {
          console.log(`Deleted ${regUser.data}`)

          this.loadUserTokens()
        })
        // Check for request errors
        .catch(err => {
          console.log(err)
        })
    }
  },
    mounted () {
      this.loadUserTokens()
      if (sessionStorage.userToken) {
        this.userToken = sessionStorage.userToken
      }
    }
  }

</script>

<style scoped>
.token-table-container {
  width: 50%;
  padding: 10px;
  margin: auto;
  position: relative;
}

#token-table-heading {
    padding: 5%;
}

#token-table-title {
    float: left;
}

.btn-right {
  float: right;
}

#token-table-btn-new {
    float: right;
}
</style>
