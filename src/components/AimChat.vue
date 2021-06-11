<template>
  <teleport :to="getIdClass">
      <div class="chat-toolbar">
        <div class="my-aim-toolbar">File</div>
        <div class="people-toolbar">Edit</div>
        <div class="help-toolbar">Insert</div>
        <div class="help-toolbar">People</div>
      </div>  
      <div class="chat-list-divider"></div>
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
      <audio class="send-message-notification">
        <source src="../assets/send-message-notification.mp3" type="audio/mpeg">
      </audio>
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

      // Handles notifying the Vuex store of new sent messages
      this.$store.commit("messageLogger", { 
        username: this.$store.state.currUser,
        recipient: this.username,
        message: e.target.innerText,
        foreign: false
      });
      
      // Resets the chat typing window and scrolls to the bottom of the chat log
      e.target.innerText = "";
      this.$refs.chatLog.scrollTop = (this.$refs.chatLog.scrollHeight + 100);
      document.querySelector(".send-message-notification").play();
    },
    // Creates a WinBox for a new chat room instance
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
      // Below options help add a custom window title with icon
      const chatLogo = document.createElement("img");
      chatLogo.src = require("../assets/wave-icon.png");
      chatLogo.style.height = "1.2em";
      chatLogo.style.float = "left";
      chatLogo.style.margin = "9px 5px 0px 0px";
      chatBox.dom.querySelector(".wb-title").appendChild(chatLogo);
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
    padding: 0px 5px 3px 5px;
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
    font-family: "Times New Roman", Times, serif !important;
  }

  .chat-log {
    height: 100%;
    flex: 1 3 auto;
    overflow: scroll;
    box-sizing: border-box;
  }

  .chatbox-text, .chat-log {
    padding: 2px 5px;
    width: 100%;
    border: 3px solid;
    border-style: inset;
    border-radius: 3px;
    box-sizing: border-box;
    background-color: white;
  }

  .chat-list-divider {
    width: 100%;
    margin-bottom: 5px;
    border-bottom: 1px solid;
    border-style: none none inset none;
  }

  .chat-bottom-toolbar {
    margin-top: 13px;
    width: 430px;
    position: relative;
    right: 1px;
  }

  .chat-styling-bar {
    position: relative;
    width: 430px; 
    right: 1px;
    margin: 4px 0px 1px 0px;
  }

  .chat-bottom-toolbar:hover, .chat-styling-bar:hover {
    cursor: pointer;
  }

  /* Toolbar */
  .chat-toolbar {
    width: 100%;
    margin-right: auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    font-size: 12px;
    border-bottom: 1px solid;
    border-style: none none outset none;
  }

  .chat-toolbar > *:not(:first-child) {
    cursor: pointer;
    padding: 2px 6px 4px 6px;
  }

  .chat-toolbar > *:first-child {
    cursor: pointer;
    padding: 2px 7px 4px 0px;
  }

  .chat-toolbar > *:hover {
    background-color: lightgrey;
  }

</style>
