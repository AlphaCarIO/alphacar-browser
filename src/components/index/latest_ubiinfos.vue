<template>
<div class="content">
  <el-table
    :data="tableData"
    border
    style="width: 100%;min-height: 500px;" :header-cell-style="changeHead">
    <el-table-column
      prop="ubi_code"
      :label="tbl_ubi_code"
      width="100">
    </el-table-column>
    <el-table-column
      prop="user.name"
      :label="tbl_name"
      width="120">
    </el-table-column>
    <el-table-column
      prop="user.driving_license"
      :label="tbl_driving_license"
      width="130">
    </el-table-column>
    <el-table-column
      prop="car_info.vin_code"
      :label="tbl_vincode"
      width="120">
    </el-table-column>
    <el-table-column
      :label="tbl_duration"
      width="200">
      <template slot-scope="scope">
        <div>{{ scope.row.start_date }}-{{ scope.row.end_date }}</div>
      </template>
    </el-table-column>
    <el-table-column
      prop="hash"
      :label="tbl_hash">
    </el-table-column>
  </el-table>
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

.el-table th, .el-table tr {
  background-color:transparent !important;
}

.el-table {
  background-color:transparent !important;
}

</style>
<script>
import bus from "@/utils/event";
import * as cc from "@/config/constants";
import qs from "qs";

export default {
  components: {
  },
  computed: {
    tbl_ubi_code: function() {
      return this.$t("message.tbl_ubi_code")
    },
    tbl_name: function() {
      return this.$t("message.tbl_name")
    },
    tbl_driving_license: function() {
      return this.$t("message.tbl_driving_license")
    },
    tbl_vincode: function() {
      return this.$t("message.tbl_vincode")
    },
    tbl_duration: function() {
      return this.$t("message.tbl_duration")
    },
    tbl_hash: function() {
      return this.$t("message.tbl_hash")
    }
  },
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    bus.$on(cc.DO_SEARCH, (query_cond) => {
      //console.log('on DO_SEARCH query_cond=', query_cond);
      this.fetchData();
    })
    this.fetchData();
  },
  mounted() {
  },
  watch: {
    //'$route': 'fetchData'
  },
  methods: {
    changeHead({row, column, rowIndex, columnIndex}) {
      return { backgroundColor: '#000000ff', width: '100%' };
    },

    fetchData () {
      let self = this;

      let params = {
        'search_type': '0',
        'search_txt': '',
        'page': 0,
        'page_size': 3,
      }

      self.$http.get('/ubi_info/list?' + qs.stringify(params)).then(response => {
          if (response.status == 200) {
            self.tableData = response.data.data.lst;
          }
　　　　}, response => {
　　　　　　console.log(response);
　　　　});
    },
  },
};
</script>