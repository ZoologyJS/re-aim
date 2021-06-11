import Vuex from "vuex";

export default new Vuex.Store({
  state: {
    initiatedChats: {},
    currUser: "snake"
  },
  // "Commit" a mutation
  mutations: {
    setJoke(state, payload) {
      state.setOfJokes.push(payload);
    },
    initChat(state, payload) {
        const { userToChat, winBox } = payload;
        if (!state.initiatedChats[userToChat]) {
            state.initiatedChats[userToChat] = {
                username: userToChat,
                id: btoa(userToChat),
                timestamp: (new Date()).toString(),
                active: true,
                // windowRef: winBox,
                messageHistory: []
            }
        }
        console.dir(state.initiatedChats)
        // const { username, foreign, message } = payload;
        // state.initiatedChats.push({username: payload.username})
    },
    messageLogger(state, payload) {
      console.log("Message Logger called", state.initiatedChats[payload.recipient].messageHistory)
      state.initiatedChats[payload.recipient].messageHistory.push(payload);
    },
    toggleChatActivity(state, payload) {
        state.initiatedChats[payload.recipient].active = payload.activity;
    }
    // toggleWindowState(state, payload) {
    //     console.log(payload)
    //     state.initiatedChats[payload.username].windowRef = payload.payload;
    // }
  },
  getters: {
    getChatHistory: (state) => state.initiatedChats
  }
});