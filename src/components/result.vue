<template>
<div class="content">
<div class="internal">
  <el-table
    :data="tableData"
    style="width: 100%" :header-cell-style="changeHead">
    <el-table-column
      prop="timestamp"
      :label="tbl_timestamp"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      :label="tbl_name"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      :label="tbl_address">
    </el-table-column>
  </el-table>

</div>
  <el-button class="bk_btn" @click="onBack" plain>{{$t("message.Back")}}</el-button>
</div>
</template>
<style scoped>

.content {
  font-size: 30px;
  color: #ffffff;
  width: 100%;
  height: 100%;
  text-align: center;
}

.internal {
  height: 560px;
}

.el-table th, .el-table tr {
  background-color:transparent !important;
}

.el-table {
  background-color:transparent !important;
}

.bk_btn {
  margin: auto;
}
</style>
<script>
import bus from "@/utils/event";
import * as cc from "@/config/constants";
import charts from '@/components/echarts.vue';

export default {
  components: {
    'v-charts': charts
  },
  computed: {
    tbl_timestamp: function() {
      return this.$t("message.tbl_timestamp")
    },
    tbl_name: function() {
      return this.$t("message.tbl_name")
    },
    tbl_address: function() {
      return this.$t("message.tbl_address")
    }
  },
  data() {
    return {
      tableData: [],
    };
  },
  created() {
  },
  mounted() {
    this.fetchData();
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    changeHead({row, column, rowIndex, columnIndex}) {
      return { backgroundColor: '#000000ff', width: '100%' };
    },

    fetchData () {
      let search_type = this.$route.query.search_type.trim();
      let search_txt = this.$route.query.search_txt.trim();
      console.log('fetchData search_type=', search_type, " search_txt=", search_txt);
    },

    onBack() {
      let self = this;
      self.$router.push({path: '/'});
    }
  },
};
</script>