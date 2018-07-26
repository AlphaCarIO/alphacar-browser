<template>
<v-container>
<div v-if="show_cond == 0" class="display-3 text-lg-center">
  {{ $t("message.loading") }}
</div>
<v-layout row wrap v-else-if="show_cond == 1" class="body-1">

  <b-table striped hover responsive :items="tableData" :fields="fields" @row-clicked="viewDetail">
    <template slot="index" slot-scope="data">
      {{ data.index + 1 }}
    </template>
    <template slot="duration" slot-scope="data">
      {{ data.item.start_date }}---{{ data.item.end_date }}
    </template>
    <template slot="hash" slot-scope="data">
      <div v-if="data.item.hash=='' || data.item.hash==undefined">
          {{ $t("message.empty_hash") }}
        </div>
        <div v-else>
          <div>
          <a :href="ipfs_addr + '/ipfs/' + data.item.hash">{{ ipfs_addr }}/ipfs/{{ data.item.hash }}
          </a>
        </div>
        <div>
          <a :href="'https://gateway.ipfs.guide/' + data.item.hash">https://gateway.ipfs.guide/{{ data.item.hash }}
          </a>
        </div>
        <div>
          <a :href="'http://ipfs.io/ipfs/' + data.item.hash">http://ipfs.io/ipfs/{{ data.item.hash }}
          </a>
        </div>
        </div>
    </template>
  </b-table>
  </v-layout>

  <v-layout row wrap>
    <v-spacer></v-spacer>
    <v-flex class="text-lg-right">
      <b-select style="width:70px" @change="handleSizeChange" v-model="page_size" :options="page_sizes" />
    </v-flex>
    <v-flex class="text-lg-left">
      <b-pagination @change='handleCurrentChange' size="md" 
        :total-rows="total_count" v-model="page" :per-page="page_size">
      </b-pagination>
    </v-flex>
    <v-spacer></v-spacer>
  </v-layout>

  <v-layout row wrap>
    <v-spacer></v-spacer>
    <v-btn dark @click="onBack">{{ $t("message.Back") }}</v-btn>
    <v-spacer></v-spacer>
  </v-layout>
</v-container>
</template>

<style scoped>
</style>

<script>
import bus from "@/utils/event";
import * as cc from "@/config/constants";
import qs from "qs";
import * as app_config from "@/config/app_config";
export default {
  components: {},
  computed: {fields: function() {
        return [
        {
          key : 'index',
          label: this.$t("message.tbl_index")
        },
        {
          key : 'ubi_code',
          label: this.$t("message.tbl_ubi_code")
        },
        {
          key : 'user.name',
          label: this.$t("message.tbl_name")
        },
        {
          key : 'user.driving_license',
          label: this.$t("message.tbl_driving_license")
        },
        {
          key : 'car_info.vin_code',
          label: this.$t("message.tbl_vincode")
        },
        {
          key : 'duration',
          label: this.$t("message.tbl_duration")
        },
        {
          key : 'hash',
          label: this.$t("message.tbl_hash")
        }
      ]
      },
  },
  data() {
    return {
      ipfs_addr: app_config.ipfs_server_addr,
      total_count: 0,
      greeting_msg: "",
      tableData: [],
      page: 1,
      page_sizes: [5, 10, 20, 50],
      page_size: 5,
      search_type: 0,
      search_txt: "",
      show_cond: 0
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {},
  watch: {
    $route: "fetchData"
  },
  methods: {
    viewDetail(item, index, event) {
      if (item != undefined && item.ubi_code != undefined) {
        this.$router.push({ path: "/ubi_detail/" + item.ubi_code });
      }
    },
    onSearch() {
      let self = this;
      let query_cond = {
        search_type: self.search_type,
        search_txt: self.search_txt,
        page: self.page,
        page_size: self.page_size
      };
      self.$router.push({
        path: "/search",
        query: query_cond
      });
    },
    handleSizeChange(val) {
      this.page_size = val;
      this.page = 1;
      /*
      bus.$emit(cc.ON_PAGE_CHANGE, this.page);
      bus.$emit(cc.ON_PAGE_SIZE_CHANGE, val);
      */
      this.onSearch();
    },
    handleCurrentChange(val) {
      this.page = val;
      //bus.$emit(cc.ON_PAGE_CHANGE, val);
      this.onSearch();
    },
    fetchData() {
      let self = this;
      let search_type = self.$route.query.search_type;
      let search_txt = self.$route.query.search_txt;
      let page = parseInt(self.$route.query.page);
      let page_size = parseInt(self.$route.query.page_size);
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
        self.page = 1;
      }
      if (
        page_size == undefined ||
        isNaN(page_size) ||
        self.page_sizes.indexOf(page_size) == -1
      ) {
        page_size = self.page_sizes[0];
      }
      self.page_size = page_size;
      let params = {
        search_type: self.search_type,
        search_txt: self.search_txt,
        page: self.page - 1,
        page_size: self.page_size
      };
      self.$http.get("/api/ubi_info/list?" + qs.stringify(params)).then(
        response => {
          //console.log('response:', response);
          if (response.status == 200) {
            self.total_count = response.data.data.total_count;
            self.tableData = response.data.data.lst;
            self.show_cond = 1
          }
        },
        response => {
          console.log(response);
        }
      );
    },
    onBack() {
      let self = this;
      self.$router.go(-1);
      //self.$router.push({ path: "/" });
    }
  }
};
</script>