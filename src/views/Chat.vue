<template>
    <div class="container chat-box">
        <div class="box-left">
            <h2>Room chat</h2>
            <ul>
                <div class="add-room-container">
                    <p style="text-align: left ">User Name 
                    </p>
                    <svg v-on:click="showPopup" class="add-room" width="20" height="20" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1344 800v64q0 14-9 23t-23 9h-352v352q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-352h-352q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h352v-352q0-14 9-23t23-9h64q14 0 23 9t9 23v352h352q14 0 23 9t9 23zm128 448v-832q0-66-47-113t-113-47h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113zm128-832v832q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q119 0 203.5 84.5t84.5 203.5z"/></svg>
                </div>
                <li>Trò chuyện bốn phương</li>
                <li>aadafdafasdf</li>
            </ul>
        </div>
        <div class="box-center">
            <div class="display-content">
                <h2>trò chuyện bốn phương</h2>
                <hr>
            </div>
            <div contenteditable="true" class="box-chat">
                dafads
            </div>
        </div>
        <transition name="fade">
            <div class="popup" v-show="popupDl">
                <div class="room-popup"> 
                    <h1> Create a room chat</h1>
                    <div>
                        <label>Room name</label>
                        <input type="text" name="" id="" class="in-type-1" 
                        v-bind:class="{'err-inp' : errEmpty}"
                        @input="handleChange" @keyup.enter="handleCreateUser">
                        <p class="err" v-if="errEmpty">Not empty</p>
                    </div>
                    <div>
                        <button class="cancel" @click="closePopup" v-bind:class="{'err' : errEmpty}">Cancel</button>
                        <button class="create" v-bind:class="{'active' : !errBtn}" @click="createRoom">Create Channel</button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import fb, { functions } from 'firebase';
    import LoadingTemplate from '@/components/Loading.vue'
    import _lo from 'lodash'
    import { debuglog } from 'util';

    export default {
        name: "chat",
        components: {
            LoadingTemplate
        },
        data() {
            return {
                popupDl: false,
                errEmpty: false,
                errBtn: true,
            };
        },
        methods: {
            showPopup: function(){
                this.popupDl = true
            },
            closePopup(){
                this.popupDl = false;
            },
            handleChange(e){
                const val = e.target.value;
                if(val === ""){
                    this.errEmpty = true;
                    this.errBtn = true;
                }else{
                    this.errEmpty = false;
                    this.errBtn = false;
                }
            },
            createRoom(){

            }
        },
        created: function() {

            var ref = fb.database().ref('rooms');

            ref.once('value')
            .then(function(snapshot){
                console.log(snapshot.val());
            })

            debugger
            ref.on('child_added', function (data){
                debugger
            });
            
        }
    };
</script>

<style scoped>
    
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    .add-room-container{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }
    .add-room{
        margin-left: auto;
        cursor: pointer;
        fill: #fff
    }
    .add-room:hover{
        fill: #E25D33
    }
    .chat-box {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        margin: 0 auto;
    }

    .box-left {
        width: 250px;
        background: #222930;
        height: 100vh;
        color: #fff;
    }

    .box-center {
        width: calc(100% - 250px);
        height: 100vh;
        display: flex;
        flex-direction: column;
        flex: 1;
    }
        

    .popup{
        position: absolute;
        width: 100%;
        height: 100vh;
        background: #fff;
    }
    
    .popup .room-popup{
        display: inline-block;
        margin-top: 100px;
        width: 30rem;
        text-align: left;
    }

    .popup .room-popup input{
        display: block;
        width: 100%;
        margin-bottom: 1rem;
        width: 100%;
         box-sizing: border-box;
    }

    .popup .room-popup h1{
        font-weight: 800;
        font-size: 1.8rem;
    }

    .popup .room-popup label{
        color: black;
        font-size: 1rem;
        font-weight: 700;
    }

    .popup .room-popup button{
        float: right;
        padding: 10px;
        background: #fff;
        border: 1px solid gray;
        border-radius: 2px;
        margin: 2px;
        color: black;
        font-weight: 700;
        font-size: .9rem;
        cursor: pointer;
    }

    .popup .room-popup button.create{
        background: lightgray;
        border-color: transparent;
        pointer-events: none;
    }

    .popup .room-popup button.create.active{
        background: #007a5a;
        pointer-events: visible;
    }

    .in-type-1{
        padding: 15px;
        border: 1px solid gray;
        border-radius: 5px;
    }

    ul {
        list-style: none;
        text-align: left;
        padding: 10px 0px;
    }

    ul li {
        cursor: pointer;
        padding: 5px 0px 5px 10px
    }

    ul li:hover {
        background: #E25D33;
        transition: 0.8s;
    }

    .box-chat {
        margin-top: auto;
        max-height: 250px;
        overflow: hidden;
        overflow-y: auto;
        border: 2px solid grey;
        cursor: pointer;
        text-align: left;
        padding: 10px 5px;
        font-size: .8rem;
    }

    .box-chat:focus {
        outline: none;
    }

    .box-chat::-webkit-scrollbar {
        width: 12px;
        background-color: #F5F5F5;
    }

    .box-chat::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 0px;
        background-color: #F5F5F5;
    }

    .box-chat::-webkit-scrollbar {
        width: 12px;
        background-color: #F5F5F5;
    }

    .box-chat::-webkit-scrollbar-thumb {
        border-radius: 0px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: #607D8B;
    }
</style>