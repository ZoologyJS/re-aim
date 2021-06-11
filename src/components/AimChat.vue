<template>
  <teleport :to="getIdClass">
      <div class="toolbar">
        <div class="my-aim-toolbar">File</div>
        <div class="people-toolbar">Edit</div>
        <div class="help-toolbar">Insert</div>
        <div class="help-toolbar">People</div>
      </div>  
      <!-- <div class="chat-list-divider"></div> -->
      <div ref="chatLog" class="chat-log">
        <div v-for="msg in getChatHistory" :key="msg.message">
          <AimMessage 
            :username="msg.foreign ? msg.recipient : msg.username" 
            :message="msg.message"
            :userColor="msg.foreign ? 'red' : 'blue'"
          />
        </div>
      </div>
      <img class="chat-styling-bar" src="../assets/styling-bar.png" />
      <div 
        class="chatbox-text"
        ref="chatboxText" 
        contenteditable="true" 
        @keydown.enter="sendMessage">
      </div>
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
    }
  },
  methods: {
    preventSubmit(e) {
      e.preventDefault();
    },
    sendMessage(e) {
      e.preventDefault();

      this.$store.commit("messageLogger", { 
        username: this.$store.state.currUser,
        recipient: this.username,
        message: e.target.innerText,
        foreign: false
      });
      
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
        onfocus: function() {
          this.setBackground("#0367FD");
          this.removeClass("unfocused-window");
        },
        onblur: function() {
          this.setBackground("#7C9CE2");
          this.addClass("unfocused-window");
        },
        onclose: function() {
          this.$store.commit("toggleChatActivity", { recipient: this.username, activity: false });
        }.bind(this)

      });
      const chatLogo = document.createElement("img");
      chatLogo.src = require("../assets/wave-icon.png");
      chatLogo.style.height = "1.2em";
      chatLogo.style.float = "left";
      chatLogo.style.margin = "9px 5px 0px 0px";
      chatBox.dom.querySelector(".wb-title").appendChild(chatLogo);
      // this.$store.commit("toggleWindowState", { username: this.username, payload: chatBox });
    },
  },
  computed: {
    getIdClass() {
      return ".chat-template" + this.chatId;
    },
    getChatHistory() {
      console.log("getChatHistory called from AimChat componenet", this.$store.getters.getChatHistory)
      return this.$store.getters.getChatHistory[this.username]?.messageHistory;
    },
  },
  created() {
      this.initWinBox()
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
    width: 425px;
  }

  .chat-styling-bar {
    margin: 2px 0px;
    width: 424px;
  }

  .chat-bottom-toolbar:hover, .chat-styling-bar:hover {
    cursor: pointer;
  }
</style>
