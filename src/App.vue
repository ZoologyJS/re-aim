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
      chats: []
    }
  },
  methods: {
    initChat(username) {
      if (this.chats.length) {
        const nextId = this.chats[this.chats.length-1].id + 1;
        this.chats.push({ id: nextId, username });
      } else {
        this.chats.push({ id: 1, username });
      }
    }
  },
  mounted() {
    mitter.on("initChat", (payload) => {
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
    border-radius: 10px 10px 4px 4px;
  }

  .wb-body {
    border-radius: 2px;
    margin: 2px;
  }

  .wb-max {
    display: none;
  }

  .wb-close {
    background-image: url("~@/assets/close.png");
    background-size: 29px;
    margin-right: 5px;

  }
  
  .wb-min {
    background-image: url("~@/assets/minimize.png");
    background-size: 29px;
    background-position: 0; /* Necessary override */ 
  }

  .wb-full {
    background-image: url("~@/assets/fullscreen.png");
    background-size: 29px;
  }

  .wb-title {
    font-weight: bold;
    font-size: 15px;
    cursor: default;
    color: rgb(240, 240, 240);
  }

  .unfocused-window {
    border: 1px solid #7C9CE2 !important;
  }
</style>
