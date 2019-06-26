<template>
    <div class="container chat-box">
        <div class="box-left">
            <h2>Room chat</h2>
            <ul>
                <p style="text-align: left ">User Name</p>
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
            };
        },
        methods: {

        }
    };
</script>

<style scoped>
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
        flex: 1
    }

    ul {
        list-style: none;
        text-align: left;
        padding: 10px 0px
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