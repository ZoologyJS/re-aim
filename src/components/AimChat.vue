<template>
  <teleport :to="getIdClass">
      <div class="toolbar">
        <div class="my-aim-toolbar">File</div>
        <div class="people-toolbar">Edit</div>
        <div class="help-toolbar">Insert</div>
        <div class="help-toolbar">People</div>
      </div>  
      <div class="chat-list-divider"></div>
      <div ref="chatLog" class="chat-log">
        <div v-for="msg in messages" :key="msg">
          <AimMessage 
            :username="msg.username" 
            :message="msg.message"
            :userColor="msg.color"  
          />
        </div>
      </div>
      <div ref="chatboxText" contenteditable="true" @keydown.enter="sendMessage" class="chatbox-text"></div>
      <img class="chat-bottom-toolbar" src="../assets/chat-bottom-toolbar.png" />
      <!-- <div 
        ref="chatboxSend"
        class="chatbox-send"
        @click="preventSubmit"
      /> -->
  </teleport>
</template>

<script>
import AimMessage from "./AimMessage";
import { mitter } from "../eventHub";
import WinBox from "winbox/src/js/winbox.js";
import "winbox/src/css/winbox.css";

export default {
  name: 'AimChat',
  components: {
    AimMessage
  },
  props: [ "chatId", "username" ],
  data() {
    return {
      coreChatInitiated: false,
      messages: [
        {
          username: "Chris",
          message: "What a beautiful day it is",
          color: "blue"
        },
        {
          username: "SmarterChild",
          message: "I agree with that!",
          color: "red"
        },
        {
          username: "Chris",
          message: "I would like a glass of water",
          color: "blue"
        },
     ]
    }
  },
  methods: {
    preventSubmit(e) {
      e.preventDefault();
    },
    sendMessage(e) {
      e.preventDefault();
      this.messages.push({
        username: "Chris",
        message: e.target.innerText,
        color: "blue"
      })
      e.target.innerText = "";
      this.$refs.chatLog.scrollTop = (this.$refs.chatLog.scrollHeight + 100);
    },
    initWinBox() {
      const chatIdInj = `<div class="chat-template${this.chatId} chat-template"></div>`;
      const chatBox = new WinBox(`Instant Message - ${this.username}`, { 
        background: "#0367FD",
        height: "320px",
        minheight: "320px",
        width: "450px",
        minwidth: "450px",
        left: 100,
        top: 100,
        border: 5,
        html: chatIdInj,
        onfocus: function(){
          this.setBackground("#0367FD");
          this.removeClass("unfocused-window");
        },
        onblur: function(){
          this.setBackground("#7C9CE2");
          this.addClass("unfocused-window");
        },

      });
      const chatLogo = document.createElement("img");
      chatLogo.src = require("../assets/wave-icon.png");
      chatLogo.style.height = "1.2em";
      chatLogo.style.float = "left";
      chatLogo.style.margin = "9px 5px 0px 0px";
      chatBox.dom.querySelector(".wb-title").appendChild(chatLogo);
      document.querySelector("#winbox-1").style.display = "none";
    },
  },
  computed: {
    getIdClass() {
      return ".chat-template" + this.chatId;
    }
  },
  created() {
    if (!this.coreChatInitiated) {
      this.initWinBox()
    }
    this.coreChatInitiated = true;
  },
  mounted() {
    // mitter.on("initChat", name => { 
    //   this.initWinBox();
    // }); 
  } 
}
</script>

<style>

  .chat-template {
    height: 100%;
    min-height: 100%;
    padding: 0px 10px 10px 10px;
    box-sizing: border-box;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    background-color: #ECE8D6;
  }

  .chatbox-text {
    height: 40%;
    flex: 1 2 auto;
    outline: 0px solid transparent;
  }

  .chat-log {
    height: 100%;
    flex: 1 3 auto;
    /* margin-top: 10px; */
    margin-bottom: 10px;
    overflow: scroll;
  }

  .chatbox-text, .chat-log {
    width: 100%;
    border: 3px solid;
    border-style: inset;
    border-radius: 3px;
    background-color: white;
  }

  .chat-list-divider {
    width: 100%;
    margin-bottom: 5px;
    border-bottom: 1px solid;
    border-style: outset none none none;
  }

  .chat-bottom-toolbar {
    margin-top: 5px;
    width: 425px;
  }

  .chat-bottom-toolbar:hover {
    cursor: pointer;
  }
</style>
