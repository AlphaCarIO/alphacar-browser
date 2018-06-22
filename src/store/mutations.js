// https://vuex.vuejs.org/en/mutations.html

// The only way to actually change state in a Vuex store is by committing a mutation.

// You cannot directly call a mutation handler.
// Think of it more like event registration: "When a mutation with type increment is triggered,
// call this handler." To invoke a mutation handler, you need to call store.commit with its type.

// Mutation handler functions must be synchronous
// One important rule to remember is that mutation handler functions must be synchronous.

// Using Constants for Mutation Types
// import * as types from './mutation-types';

import Vue from 'vue';

export default {

  registerWeb3Instance(state, payload) {
    console.log('registerWeb3instance Mutation being executed', payload)
    let result = payload
    let web3Copy = state.web3
    web3Copy.coinbase = result.coinbase
    web3Copy.networkId = result.networkId
    web3Copy.balance = parseInt(result.balance, 10)
    web3Copy.isInjected = result.injectedWeb3
    web3Copy.web3Instance = result.web3
    state.web3 = web3Copy
  },
  pollWeb3Instance(state, payload) {
    console.log('pollWeb3Instance mutation being executed', payload)
    state.web3.coinbase = payload.coinbase
    state.web3.balance = parseInt(payload.balance, 10)
  },
  registerContractInstance(state, payload) {
    console.log('Casino contract instance: ', payload)
    state.contractInstance = () => payload
  },

  setIndex(state, { index }) {
    state.curr_index = index;
  },

  setNetVersion(state, { networkVersion }) {
    state.networkVersion = networkVersion;
  },

  setNetInfo(state, { netInfo }) {
    state.netInfo = netInfo;
  },

};
