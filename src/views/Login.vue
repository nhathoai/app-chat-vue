<template>
  <div class="container">
    <div class="box">
      <h1>Login</h1>
      <label for="inp" class="inp" v-bind:class="{'err' : errors.has('email')}">
        <input type="text" name="email" placeholder=" " v-validate="'required'" v-model="email" @input="handleChange" @keyup.enter="handleLogin">
        <span class="label">What's your name?</span>
      </label>
      <p class="error" v-if="errors.has('email')">{{errors.first('email')}}</p>

      <label for="inp" class="inp" v-bind:class="{'err' : errors.has('password')}">
        <input type="password" name="password" placeholder=" " v-validate="'required'" v-model="password" @input="handleChange" @keyup.enter="handleLogin"> 
        <span class="label">Password</span>
      </label>
      <p class="error" v-if="errors.has('password')">{{errors.first('password')}}</p>

      <!-- <p class="err">{{ errMess }}</p> -->
      <button class="btn-info" v-on:click="handleLogin" >Login</button>
    </div>
    <LoadingTemplate v-bind:hidden="hidden" />  
  </div>
</template>

<script>
import fb, { functions } from 'firebase';
import LoadingTemplate from '@/components/Loading.vue'
import _lo from 'lodash'

export default {
  name: "login",
  components: {
     LoadingTemplate
  },
  data() {
    return {
      message: "",
      email: "",
      password: "",
      errMess: '',
      hidden: false,
      errEmail: true
    };
  },
  methods: {
    handleLogin: function() {
      this.$validator.validateAll();
      const rs = this.checkEmpty();
      if(!rs) return;
      this.hidden = true;
      this.login();
    },
    handleChange: function(){
      this.errMess = '';
      this.errors.clear();
    },
    login: _lo.debounce(function(){
      const _this = this;
      
      fb.auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(function (data, err){
            console.log("vào rồi")
          })
          .catch(function(error) {
            _this.hidden = false;
            _this.errMess = "User or password in incorrect";
            _this.email = _this.password = '';
          })
    }, 500),
    checkEmpty: function(){
      var rs = true;
      if(this.email == ""){
        this.errMess = "Not Empty";
        rs = false;
      }
      if(this.password == ""){
        this.errMess = "Not Empty";
        rs = false;
      }
      return rs;
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
  .inp.err{
    color: red;
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
