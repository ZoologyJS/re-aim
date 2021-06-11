import Vuex from "vuex";

export default new Vuex.Store({
  state: {
    initiatedChats: {},
    currUser: "snake",
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
        username: "vjetpack",
        online: false,
      },
      {
        username: "avril16th",
        online: false,
      },
   ]
  },
  // "Commit" a mutation
  mutations: {
    initChat(state, payload) {
        const { userToChat, winBox } = payload;
        if (!state.initiatedChats[userToChat]) {
            state.initiatedChats[userToChat] = {
                username: userToChat,
                id: btoa(userToChat),
                timestamp: (new Date()).toString(),
                active: true,
                messageHistory: []
            }
        }
        console.dir(state.initiatedChats)
    },
    messageLogger(state, payload) {
      state.initiatedChats[payload.recipient].messageHistory.push(payload);
    },
    toggleChatActivity(state, payload) {
        state.initiatedChats[payload.recipient].active = payload.activity;
    }
  },
  getters: {
    getChatHistory: (state) => state.initiatedChats,
    getBuddyList: (state) => state.buddyList
  }
});