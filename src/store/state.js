// https://vuex.vuejs.org/en/state.html

// Vuex uses a single state tree - that is, this single object contains
// all your application level state and serves as the "single source of truth".
// This also means usually you will have only one store for each application.

// Pass a function that returns an object, the returned object is used as the root state.
// This is useful when you want to reuse the state object especially for module reuse.
// https://vuex.vuejs.org/en/modules.html#module-reuse

import { mapState } from 'vuex';

export default () => ({
  app_info: {
    lang: '',
  },
});
