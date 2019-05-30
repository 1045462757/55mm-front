import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

var state = {
    actions: [],
    userInfo: "",
    myActions: [],
    collections: [],
    focus: [],
    fans: []
}

var mutations = {
    addActions(state, data) {
        state.actions = data;
        // state.actions.push(data);
        // console.log(state.actions);
    },
    addUserInfo(state, data) {
        state.userInfo = data
    },
    addMyActions(state, data) {
        state.myActions = data;
        // state.myActions.push(data)
    },
    addCollections(state, data) {
        state.collections = data;
        // state.myActions.push(data)
    },
    addFocus(state, data) {
        state.focus = data;
        // state.myActions.push(data)
    },
    addFans(state, data) {
        state.fans = data;
        // state.myActions.push(data)
    },
}

const store = new Vuex.Store({
    state,
    mutations
})

export default store;