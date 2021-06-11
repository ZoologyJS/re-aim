// import Vue from "vue";
import Vuex from "vuex";

// Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentJoke: "This is a joke",
    setOfJokes: [],
    initiatedChats: {},
    currUser: "snake"
  },
  // "Commit" a mutation
  mutations: {
    setJoke(state, payload) {
      state.setOfJokes.push(payload);
    },
    initChat(state, payload) {
        const { userToChat } = payload;
        if (!state.initiatedChats[userToChat]) {
            console.log("Chat Initiated!")
            state.initiatedChats[userToChat] = {
                username: userToChat,
                id: btoa(userToChat),
                timestamp: (new Date()).toString(),
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
    }
  },
  getters: {
    getCurrentJoke: state => state.currentJoke,
    grabJokeList: state => state.setOfJokes,
    getChatHistory: (state) => {
        console.log("getChatHistory from state called")
        return state.initiatedChats
    }
  }
});