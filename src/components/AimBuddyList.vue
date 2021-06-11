<template>
  <teleport to=".buddy-list">
    <div class="toolbar">
      <div class="my-aim-toolbar">My AIM</div>
      <div class="people-toolbar">People</div>
      <div class="help-toolbar">Help</div>
    </div>
    <img class="buddy-list-logo" src="../assets/aim-bl2.png" />
    <div class="buddy-list-divider"></div>
    <div class="online-text">Online Friends</div>
    <div class="friends">
      <div 
        class="buddies-text"
        @click="toggleBuddyCollapse">
          {{ buddiesCollapsed 
              ? "▸" 
              : "▾" }} Buddies (3/5)
      </div>
      <div 
        class="buddy-online" 
        v-for="buddy in buddyList" 
        :key="buddy"
        @click="initChatWindow">
          {{ buddy.online && !buddiesCollapsed 
              ? buddy.username 
              : null }}
      </div>
      <div 
        class="offline-text" 
        @click="toggleOfflineCollapse">
          {{ offlineCollapsed 
              ? "▸" 
              : "▾" }} Offline (2/5)
      </div>
      <div 
        class="buddy-offline" 
        v-for="buddy in buddyList" 
        :key="buddy">
          {{ !buddy.online && !offlineCollapsed 
              ? buddy.username 
              : null }}
      </div>
    </div>
  </teleport>
</template>

<script>
import { mitter } from "../eventHub.js";
import WinBox from "winbox/src/js/winbox.js";
import "winbox/src/css/winbox.css";

export default {
  name: 'AimBuddyList',
  components: {

  },
  data() {
    return {
      buddiesCollapsed: false,
      offlineCollapsed: false,
      buddyList: [
        {
          username: "SmarterChild",
          online: true,
        },
        {
          username: "garfield231",
          online: true,
        },
        {
          username: "senatoralbatross",
          online: true,
        },
        {
          username: "cubsfan126",
          online: false,
        },
        {
          username: "avril16th",
          online: false,
        },
     ]
    }
  },
  methods: {
    initChatWindow(e) {
      const userToChat = e.target.innerText;
      console.log(this.$store.getters.getChatHistory[userToChat]?.active)
      if (this.$store.getters.getChatHistory[userToChat]?.active) return;
      this.$store.commit("initChat", { userToChat });  
      mitter.emit("initChat", userToChat);
    },
    preventSubmit(e) {
      e.preventDefault();
    },
    toggleBuddyCollapse() {
      this.buddiesCollapsed = !this.buddiesCollapsed;
    },
    toggleOfflineCollapse() {
      this.offlineCollapsed = !this.offlineCollapsed;
    },
  },
  created() {
    const buddyList = new WinBox({ 
      title: "Buddy List",
      background: "#0567f7",
      height: "600vh",
      minheight: "600vh",
      width: "270px",
      minwidth: "270px",
      right: 50,
      x: "right",
      y: "center",
      border: 5,
      html: '<div class="buddy-list"></div>',
      onfocus: function(){
        this.setBackground("#0367FD");
        this.removeClass("unfocused-window");
        },
      onblur: function(){
        this.setBackground("#7C9CE2");
        this.addClass("unfocused-window");
      },
    });
    const aolLogo = document.createElement("img");
    aolLogo.src = require("../assets/aol-icon.png");
    aolLogo.style.height = "17px";
    aolLogo.style.float = "left";
    aolLogo.style.margin = "9px 5px 0px 0px";
    buddyList.dom.querySelector(".wb-title").appendChild(aolLogo);
  },
}
</script>

<style > 
  * {
    font-family: Arial, Helvetica, sans-serif;
  }

  /* Buddy List */
  .buddy-list {
    height: 100%;
    padding: 0px 5px 5px 5px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    background-color: #ECE9D8;
  }

  .friends {
    height: 100%;
    width: 99%;
    flex: 1 1 auto;
    /* padding: 5px; */
    border: 3px solid;
    border-style: inset;
    border-radius: 2px;
    background-color: white;
  }

  .buddy-list-logo {
    margin: 10px 0px;
    height: 22%;
    border-radius: 1px;
  }

  .buddy-list-divider {
    width: 100%;
    height: 5px;
    border-bottom: 1px solid;
    border-style: none none outset none;
  }

  .online-text, .buddies-text, .offline-text, .buddy-online, .buddy-offline  {
    font-family: Arial, Helvetica, sans-serif;
    margin-right: auto;
    font-weight: bold;
    margin-bottom: 3px;
    font-size: 12px;
    cursor: pointer;
    text-decoration: none;
  }

  .online-text::selection, .buddies-text::selection, .offline-text::selection {
      color: none;
      background: none;
  }

  .buddies-text {
    padding-left: 5px;
  }

  .offline-text {
    padding-left: 5px;
    color: grey;
    font-weight: normal;
  }

  .online-text {
    font-size: 13px;
    padding: 5px 0px 0px 2px;
  }

  .buddy-online {
    width: 100%;
    padding-left: 35px;
    font-weight: inherit;
  }

  .buddy-online:hover {
    background-color: rgb(243, 243, 243);
  }

  .buddy-offline {
    width: 100%;
    color: grey;
    padding-left: 35px;
    font-weight: inherit;
  }

  .buddy-offline:hover {
    background-color: rgb(243, 243, 243);
  }

  /* Toolbar */
  .toolbar {
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

  .toolbar > *:not(:first-child) {
    cursor: pointer;
    padding: 2px 6px 2px 6px;
  }

  .toolbar > *:first-child {
    cursor: pointer;
    padding: 2px 7px 2px 0px;
  }

  .toolbar > *:hover {
    background-color: lightgrey;
  }

  .toolbar > *::selection {
    color: none;
    background: none;
  }

</style>
