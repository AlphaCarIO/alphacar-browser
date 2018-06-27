<template>
<div class="content">
<div class="internal">
  <el-table
    :data="tableData"
    border
    style="width: 100%" :header-cell-style="changeHead">
    <el-table-column
      prop="datetime"
      :label="tbl_timestamp"
      width="180">
    </el-table-column>
    <el-table-column
      prop="user.name"
      :label="tbl_name"
      width="180">
    </el-table-column>
    <el-table-column
      :label="tbl_hash">
      <template slot-scope="scope">
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
      </template>
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
    },
    tbl_hash: function() {
      return this.$t("message.tbl_hash")
    }
  },
  data() {
    return {
      greeting_msg: '',
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
      let search_type = this.$route.query.search_type.trim();
      let search_txt = this.$route.query.search_txt.trim();
      console.log('result fetchData search_type=', search_type, " search_txt=", search_txt);

      self.$http.get('/infos/' + search_txt).then(response => {
          console.log('response:', response);
          if (response.status == 200) {
            self.tableData = response.data;
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