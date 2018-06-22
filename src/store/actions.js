// https://vuex.vuejs.org/en/actions.html

// Actions are similar to mutations,
// the differences being that:
// Instead of mutating the state, actions commit mutations.
// Actions can contain arbitrary asynchronous operations.

// Action handlers receive a context object
// which exposes the same set of methods/properties on the store instance,
// so you can call context.commit to commit a mutation,
// or access the state and getters via context.state and context.getters.

// DO NOT directly modify the state in actions.
// Please use commit() to update the state.

// import * as types from './mutation-types';
import * as config from '@/config';
import * as cc from "@/config/constants";
import bus from "@/utils/event";

export default {
  registerWeb3 ({commit}) {
    console.log('registerWeb3 Action being executed')
  },
  pollWeb3 ({commit}, payload) {
    console.log('pollWeb3 action being executed')
    commit('pollWeb3Instance', payload)
  },
  getContractInstance ({commit}) {
    getContract.then(result => {
      commit('registerContractInstance', result)
    }).catch(e => console.log(e))
  },

  setIndex(context, { index }) {
    context.commit('setIndex', { index: index });
  },
  setIndexAsync({ commit }, { index }) {
    setTimeout(() => {
      commit('setIndex', index);
    }, 1000);
  },
  
  setNetVersion(context, { networkVersion }) {
    context.commit('setNetVersion', { networkVersion: networkVersion });
    context.commit('setNetInfo', { netInfo: config.network[networkVersion] });
  },
};
