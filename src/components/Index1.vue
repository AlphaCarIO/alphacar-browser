<template>
<div class="container">
  <div class="row">
      <div class="col-sm">
        <token_price></token_price>
      </div>
      <div class="col-sm">
        <txs_history></txs_history>
      </div>
  </div>
  <div class="row mt-4">
      <div class="col-sm">
        <latest_ubiinfos></latest_ubiinfos>
      </div>
  </div>
</div>
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