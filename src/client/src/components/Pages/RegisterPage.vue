<template>
  <div>
  
        <mdb-btn @click.native="showModal = true" color="info">New and want to register?</mdb-btn>
        <mdb-modal :show="showModal" @close="showModal = false" cascade class="text-left">
          <mdb-modal-header class="primary-color white-text title">
            <h4>Register a new account</h4>
          </mdb-modal-header>
          <mdb-modal-body class="grey-text">
            <mdb-input size="sm" label="Your name" icon="user" group type="text" validate error="wrong" success="right"/>
            <mdb-input size="sm" label="Your email" icon="envelope" group type="email" validate error="wrong" success="right"/>
            <mdb-input size="sm" label="Your password" icon="key" group type="text" validate error="wrong" success="right"/>
          </mdb-modal-body>
          <mdb-modal-footer>
            <mdb-btn color="secondary" @click.native="showModal = false">Close</mdb-btn>
            <mdb-btn color="primary">Save changes</mdb-btn>
          </mdb-modal-footer>
        </mdb-modal>

  </div>
</template>

<script>
  import { mdbInput, mdbBtn, mdbModal, mdbModalHeader, mdbModalBody, mdbModalFooter } from 'mdbvue';
  export default {
    name: 'Register',
    components: {
      mdbInput,
      mdbBtn,
      mdbModal,
      mdbModalHeader,
      mdbModalBody,
      mdbModalFooter
    },
    data() {
      return {
        showModal: false
      };
    }
  }
</script>

