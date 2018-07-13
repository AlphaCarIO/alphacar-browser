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
  <div class="row">
      <div class="col-sm">
        <latest_ubiinfos></latest_ubiinfos>
      </div>
  </div>
</div>
</template>

<style scoped>
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-row {
  margin-top: 20px;
  padding: 0 30px 0 30px;
}

.line1 {
  height: 250px;
  padding: 0 50px 0 50px;
  min-height: 250px;
}

.line2 {
  height: 300px;
  min-height: 300px;
}

.el-col {
  border-radius: 5px;
}

.bg-purple {
  background: #d3dce6;
}

.grid-content {
  border-radius: 4px;
  opacity: 0.7 !important;
  filter: alpha(opacity=70) !important;
}

.content {
  text-align: left;
  font-size: 30px;
  color: #ffffff;
  width: 100%;
}
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