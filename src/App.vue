<template>
  <AimChat v-for="chat in chats" :key="chat" :username="chat.username" :chatId="chat.id" ref="AimChat" />
  <AimBuddyList ref="AimBuddyList" />
</template>

<script>
import AimChat from './components/AimChat.vue'
import AimBuddyList from './components/AimBuddyList.vue'
import { mitter } from "./eventHub.js";
// import { mixy } from "./mixin.js";

export default {
  name: 'App',
  components: {
    AimChat,
    AimBuddyList
  },
  data() {
    return {
      chats: [
        {
          id: 1, 
          username: "ekjgekrt"
        }
      ]
    }
  },
  methods: {
    initChat(username) {
      const nextId = this.chats[this.chats.length-1].id + 1;
      this.chats.push({ id: nextId, username: username });
    }
  },
  mounted() {
    mitter.on("initChat", (payload) => {
      console.log(payload)
      this.initChat(payload);
    })
  }
}
</script>

<style>
  body {
    height: 100vh;
    background-image: url("~@/assets/windows-background.jpeg");
  }

  /* Global WinBox styling */
  .winbox {
    border: 1px solid #387aff;
    border-radius: 10px;
    /* background: radial-gradient(circle, rgba(22,111,246,1) 68%, rgba(83,151,255,1) 92%, rgba(22,111,246,1) 100%); */
  }

  .wb-max {
    display: none;
  }

  .wb-close {
    background-image: url("~@/assets/close.png");
    background-size: 29px;
    /* transform: scale(1.7); */
    /* position: relative; */
    margin-right: 5px;

  }
  
  .wb-min {
    background-image: url("~@/assets/minimize.png");
    background-size: 29px;
    background-position: 0;
    /* transform: scale(1.8); */
    /* position: relative; */
    /* top: 1px; */
    /* left: 7px; */
    /* margin-right: 5px; */
  }

  .wb-full {
    background-image: url("~@/assets/fullscreen.png");
        background-size: 29px;
    /* transform: scale(1.7); */
    /* position: relative; */
    /* left: 4px; */
    /* margin-right: 5px; */
  }
</style>
