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
      :label="tbl_hash">
      <template slot-scope="scope">
        <div v-if="scope.row.hash=='' || scope.row.hash==undefined">
          {{ $t("message.empty_hash") }}
        </div>
        <div v-else>
          <div>
          <a :href="'http://127.0.0.1:8080/ipfs/' + scope.row.hash">http://127.0.0.1:8080/ipfs/{{ scope.row.hash }}
          </a>
        </div>
        <div>
          <a :href="'https://gateway.ipfs.guide/' + scope.row.hash">https://gateway.ipfs.guide/{{ scope.row.hash }}
          </a>
        </div>
        <div>
          <a :href="'http://ipfs.io/ipfs/' + scope.row.hash">http://ipfs.io/ipfs/{{ scope.row.hash }}
          </a>
        </div>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <div style="align: center;margin-top:2px;">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="page_sizes"
      :page-size="page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total_count">
    </el-pagination>
  </div>
  <div style="align: center;margin-top:5px; margin-bottom=10px;">
    <el-button class="bk_btn" @click="onBack" plain>{{$t("message.Back")}}</el-button>
  </div>
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

.bk_btn {
  margin: auto;
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
      currentPage: 1,
      total_count: 0,
      greeting_msg: '',
      tableData: [],
      page_sizes: [5, 10, 20, 50],
      page_size: 5,
    };
  },
  created() {
    bus.$on(cc.DO_SEARCH, (query_cond) => {
      //console.log('on DO_SEARCH query_cond=', query_cond);
      this.fetchData(true);
    })
    this.fetchData(false);
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

    handleSizeChange(val) {
      this.page_size = val
      bus.$emit(cc.ON_PAGE_SIZE_CHANGE, val);
      this.fetchData(false)
    },

    handleCurrentChange(val) {
      this.currentPage = val
      bus.$emit(cc.ON_PAGE_CHANGE, val);
      this.fetchData(false)
    },

    fetchData (isFromEvent) {
      console.log('isFromEvent:', isFromEvent);
      let self = this;
      let search_type = self.$route.query.search_type.trim();
      let search_txt = self.$route.query.search_txt.trim();
      let page = parseInt(self.$route.query.page);
      let page_size = parseInt(self.$route.query.page_size);
      console.log('page=', page, ' page_size=', page_size);

      if (page == undefined || isNaN(page)) {
        self.currentPage = page;
      }

      if (page_size == undefined || isNaN(page_size) || self.page_sizes.indexOf(page_size) == -1) {
        console.log(' page_size=', page_size);
        page_size = self.page_sizes[0];
      }
      self.page_size = page_size;

      let params = {
        'search_type': search_type,
        'search_txt': search_txt,
        'page': self.currentPage - 1,
        'page_size': self.page_size,
      }
      console.log('params=', params);

      self.$http.get('/ubi_info/list?' + qs.stringify(params)).then(response => {
          //console.log('response:', response);
          if (response.status == 200) {
            self.total_count = response.data.data.total_count;
            self.tableData = response.data.data.lst;
            //console.log('lst length', self.tableData.length)
            //console.log('self.total_count:', self.total_count);
          }
　　　　}, response => {
　　　　　　console.log(response);
　　　　});
    },

    onBack() {
      let self = this;
      self.$router.push({path: '/'});
    }
  },
};
</script>