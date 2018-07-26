<template>
<v-container>
  <v-layout row wrap>
      <v-flex>
        <token_price></token_price>
      </v-flex>
      <v-flex>
        <txs_history></txs_history>
      </v-flex>
  </v-layout>
  <v-layout row wrap>
        <latest_ubiinfos></latest_ubiinfos>
  </v-layout>
</v-container>
</template>

<style scoped>
</style>

<script>
import bus from "@/utils/event";
import * as cc from "@/config/constants";

import token_price from "@/components/index/token_price.vue";
import txs_history from "@/components/index/txs_history.vue";
import latest_ubiinfos from "@/components/index/latest_ubiinfos.vue";

export default {
  components: {
    token_price,
    txs_history,
    latest_ubiinfos
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>