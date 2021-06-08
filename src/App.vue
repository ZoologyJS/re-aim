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

</style>
