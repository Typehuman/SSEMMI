<template>
<div id="token-table-container">
    <h1 id="token-table-title">Your Active Tokens</h1>
    <mdb-tbl hover>
      <mdb-tbl-head>
        <tr>
          <th>Reference</th>
          <th>Token</th>
          <th></th>
          <th></th>
        </tr>
      </mdb-tbl-head>
      <mdb-tbl-body>
        <tr>
          <th>1</th>
          <td id="userToken">{{userToken}}</td>
          <td v-clipboard="copyToken" style="cursor: pointer;">Copy to clipboard</td>
          <td style="cursor: pointer;">Delete</td>
        </tr>
        <tr>
          <th>2</th>
          <td id="userToken">fake.tOken.Here.For.tesTing</td>
          <td v-clipboard="copyToken" style="cursor: pointer;">Copy to clipboard</td>
          <td style="cursor: pointer;">Delete</td>
        </tr>
      </mdb-tbl-body>
    </mdb-tbl>
</div>    
</template>

<script>
import { mdbTbl, mdbTblHead, mdbTblBody } from 'mdbvue'
export default {
    name: "Dashboard",
    components: {
        mdbTbl,
        mdbTblHead,
        mdbTblBody
    },
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

<style scoped>
#token-table-container {
    width: 50%;
    padding: 10px;
    margin: auto;
    display: inline-table;
}

#token-table-title {
    float: left;
}
</style>