<template>
  <div class="container">
    <div class="box">
      <h1>New user</h1>
      <label for="inp" class="inp" v-bind:class="{'err' : errEmail}">
        <input type="text" name="email" placeholder=" " v-model="email" @input="handleChange" @keyup.enter="handleCreateUser">
        <!-- <input type="text" name="email" placeholder=" " v-validate="'required'" v-model="email" @input="handleChange" @keyup.enter="handleCreateUser"> -->
        <span class="label">What's your name?</span>
      </label>
      <p class="error" v-if="errPass">The email field is required.</p>

      <label for="inp" class="inp" v-bind:class="{'err' : errPass}">
        <input type="password" name="password" placeholder=" " v-model="password" @input="handleChange" @keyup.enter="handleCreateUser"> 
        <!-- <input type="password" name="password" placeholder=" " v-validate="'required'" v-model="password" @input="handleChange" @keyup.enter="handleCreateUser">  -->
        <span class="label">Password</span>
      </label>
      <p class="error" v-if="errPass">The password field is required.</p>

      <p style="text-align: right">You want <router-link to="/login">Login</router-link> </a> here</p>
      <p class="err" >{{ errMess }}</p>
      <button class="btn-info" v-on:click="handleCreateUser" >Create</button>
    </div>
    <LoadingTemplate v-bind:hidden="hidden" />  
  </div>
</template>

<script>
import fb, { functions } from 'firebase';
import LoadingTemplate from '@/components/Loading.vue'
import _ from 'lodash'
import Swal from 'sweetalert2';

export default {
  name: "login",
  components: {
     LoadingTemplate
  },
  data() {
    return {
      email: "",
      password: "",
      errMess: '',
      hidden: false,
      errEmail: false,
      errPass: false
    };
  },
  created() {
    const _this = this;
    this.fbData = [];

    fb.firestore().collection('users').get().then(function (datas, index){
      datas.docs.forEach(function (data, index) {
        _this.fbData.push(data.data());
      });
    });

  },
  methods: {
    handleCreateUser: function() {

      const _this = this
      this.hidden = true;
      
      if(this.email == "" && this.password == ""){
        this.errPass = true;
        this.errEmail = true;
        this.hidden = false;
        return;
      }
      
      var rs  = _.find(this.fbData, {'username': _this.email, 'password': _this.password});
      if(rs) {
        this.errMess = "Account already exists!!!";
        this.hidden = false;
        return;
      }

      _this.create();

    },
    handleChange: function(){
      this.errMess = '';
      this.errPass = false;
      this.errEmail = false;
    },
    create: _.debounce(function(){
      const _this = this;

      fb.firestore().collection("users").doc(this.createId()).set({
        username: _this.email,
        password: _this.password
      })
      .then(function() {
          _this.hidden = false;
          Swal.fire({
          type: 'success',
          title: 'Register Success',
          showConfirmButton: false,
          timer: 2000
        }).then(
          (result) => {
             _this.$router.push('/login')
          }
        )
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });

    }, 500),
    createId: function(){
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  }
};
</script>

<style scoped>
  .btn-info {
    color: #fff;
    background-color: #17a2b8;
    border-color: #17a2b8;
  }
  .btn-info:hover {
    color: #fff;
    background-color: #138496;
    border-color: #117a8b;
  }
  .box {
    margin: 0 auto;
    display: inline-block;
    padding: 50px 10px;
    margin-top: 2rem;
    background: #fff;
    border-radius: 5px;
  }
  .box input,
  .box button {
    display: block;
    width: 250px;
    padding: 5px;
  }
  .box button {
    /* padding: 5px 10px; */
    margin: 40px 0px -40px;
    border-radius: 3px;
    cursor: pointer;
    border: 1px solid transparent;
    width: 100%;
  }
  .box h1 {
    font-weight: 700;
    text-transform: uppercase;
    font-family: "Times New Roman", Times, serif;
    font-size: 2rem;
    margin-top: -1rem;
  }
  
  .inp.err input{
    border-bottom: 1px solid red;
  }
  .inp {
    position: relative;
    margin: 25px 0px;
    display: block;
  }
  .inp .label {
    position: absolute;
    top: 10px;
    left: 10px;
    transition: all 0.4s ease;
    font-size: 0.8rem;
    /* color: lightgray; */
  }
  .inp input {
    border: none;
    border-bottom: 1px solid rgb(0, 0, 0, 0.7);
    padding: 10px;
  }
  .inp input:hover {
    background: rgba(#223254, 0.03);
  }

  .inp input:focus {
    border-bottom: 1px solid #0077ff;
    outline: none;
    background: #edf3fe;
  }
  .inp input:active {
    background: #edf3fe;
  }
  .inp input:not(:placeholder-shown) + .label {
    color: #0077ff;
    top: -20px;
  }
  .inp input:focus + .label {
    color: #0077ff;
    top: -20px;
  }
  p.error {
    color: red;
    text-align: left;
  }
</style>
