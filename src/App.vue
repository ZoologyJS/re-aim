<template>
  <AimChat v-for="chat in chats" :key="chat" :chatId="chat" ref="AimChat" />
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
      chats: [1]
    }
  },
  methods: {
    initChat() {
      this.chats.push(this.chats[this.chats.length + 1]);
    }
  },
  mounted() {
    mitter.on("initChat", () => {
      console.log("inc")
      this.initChat();
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
