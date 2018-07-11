<template>
<div class="content">
  <el-table class='result_table'
    :data="tableData"
    border
    style="width: 100%;min-height: 500px;">
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
          <a :href="ipfs_addr + '/ipfs/' + scope.row.hash">{{ ipfs_addr }}/ipfs/{{ scope.row.hash }}
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
  <div class="pagination_div">
    <el-pagination class="result_pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
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

<style>
.result_table.el-table th {
  background: #000000ff !important;
  font-size: middle;
}

.result_pagination .el-pagination {
  color: #0c0316 !important;
}

.result_pagination .el-pagination__total {
  color: #fbfafc !important;
}

.result_pagination .el-pagination__sizes {
  color: #fbfafc !important;
}

.result_pagination .el-pagination__jump {
  color: #fbfafc !important;
}

</style>
<style scoped>

.content {
  font-size: 30px;
  color: #ffffff;
  width: 100%;
  height: 100%;
  text-align: center;
}

.pagination_div {
  text-align: center;
  margin-top: 2px;
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
import * as app_config from '@/config/app_config'

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
      ipfs_addr: app_config.ipfs_server_addr,
      total_count: 0,
      greeting_msg: '',
      tableData: [],
      page: 1,
      page_sizes: [5, 10, 20, 50],
      page_size: 5,
      search_type: 0,
      search_txt: '',
    };
  },
  created() {
    /*
    bus.$on(cc.DO_SEARCH, (query_cond) => {
      //console.log('on DO_SEARCH query_cond=', query_cond);
      this.fetchData();
    })
    */
    this.fetchData();
  },
  mounted() {
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {

    onSearch() {
      let self = this;

      let query_cond = { 
        search_type: self.search_type, 
        search_txt: self.search_txt, 
        page: self.page,
        page_size: self.page_size
      }
      self.$router.push({
        path: "/search",
        query: query_cond
      });
      
    },

    handleSizeChange(val) {
      this.page_size = val
      this.page = 1
      /*
      bus.$emit(cc.ON_PAGE_CHANGE, this.page);
      bus.$emit(cc.ON_PAGE_SIZE_CHANGE, val);
      */
      this.onSearch()
    },

    handleCurrentChange(val) {
      this.page = val
      //bus.$emit(cc.ON_PAGE_CHANGE, val);
      this.onSearch()
    },

    fetchData () {
      let self = this;
      let search_type = self.$route.query.search_type;
      let search_txt = self.$route.query.search_txt;
      let page = parseInt(self.$route.query.page);
      let page_size = parseInt(self.$route.query.page_size);
      console.log('page=', page, ' page_size=', page_size);

      if (search_type != undefined) {
        self.search_type = search_type;
      }

      if (search_txt != undefined) {
        self.search_txt = search_txt;
      }

      if (page != undefined && !isNaN(page)) {
        self.page = page;
      }

      if (self.page < 1) {
        self.page = 1
      }

      if (page_size == undefined || isNaN(page_size) || self.page_sizes.indexOf(page_size) == -1) {
        page_size = self.page_sizes[0];
      }
      self.page_size = page_size;

      let params = {
        'search_type': self.search_type,
        'search_txt': self.search_txt,
        'page': self.page - 1,
        'page_size': self.page_size,
      }
      console.log('params=', params);

      self.$http.get('/ubi_info/list?' + qs.stringify(params)).then(response => {
          //console.log('response:', response);
          if (response.status == 200) {
            self.total_count = response.data.data.total_count;
            self.tableData = response.data.data.lst;
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