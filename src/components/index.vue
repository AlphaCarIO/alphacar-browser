<template>
<div class="content">
  <el-row type="flex" :gutter="20">
    <el-col :span="12">
      <div class="line1 grid-content bg-purple">
        <v-token_price></v-token_price>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="grid-content bg-purple">
        <v-charts></v-charts>
      </div>
    </el-col>
  </el-row>
  <el-row type="flex" :gutter="20">
    <el-col :span="24">
      <div class="line2 grid-content bg-purple">
        <v-latest_ubiinfos></v-latest_ubiinfos>
      </div>
    </el-col>
  </el-row>
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
  border-radius: 4px;
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
    "v-token_price": token_price,
    "v-charts": txs_history,
    "v-latest_ubiinfos": latest_ubiinfos
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>