<template>
<div>
<div v-if="show_cond == 0" class="display-1 text-lg-center">
  {{ $t("message.loading") }}
</div>
<div v-else-if="show_cond == 1" class="body-1">
  <v-container fluid>

  <v-layout row wrap class='headline'>
    <v-spacer></v-spacer>
    <v-flex class="text-lg-center">
      {{ $t("message.tx_list") }}
    </v-flex>
    <v-spacer></v-spacer>
  </v-layout>

  <v-data-table hide-actions
        :headers="fields"
        :items="tableData"
        :loading="loading"
        class="elevation-1 mt-2">
    <template slot="items" slot-scope="data">
      <tr class="text-xs-left table_tr" @click="viewDetail(data.item.ubi_code)">
        <td>{{ data.item.ubi_code }}</td>
        <td>{{ data.item.user.name }}</td>
        <td>{{ data.item.user.driving_license }}</td>
        <td>{{ data.item.car_info.vin_code }}</td>
        <td>{{ data.item.start_date }}-{{ data.item.end_date }}</td>
        <td>
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
        </td>
      </tr>
    </template>
  </v-data-table>

  <v-layout row wrap class="mt-2">
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
</div>
</div>
</template>

<style scoped>

.table_tr:hover {
  cursor: pointer;
}

</style>

<script>
import bus from "@/utils/event";
import qs from "qs";
import {ipfs_server_addr} from "@/config/app_config";

export default {
  components: {},
  computed: { 
    fields: function() {
        return [
        {
          value : 'ubi_code',
          align: 'left',
          sortable: false,
          text: this.$t("message.tbl_ubi_code")
        },
        {
          value : 'user.name',
          align: 'left',
          sortable: false,
          text: this.$t("message.tbl_name")
        },
        {
          value : 'user.driving_license',
          align: 'left',
          sortable: false,
          text: this.$t("message.tbl_driving_license")
        },
        {
          value : 'car_info.vin_code',
          align: 'left',
          sortable: false,
          text: this.$t("message.tbl_vincode")
        },
        {
          value : 'duration',
          align: 'left',
          sortable: false,
          text: this.$t("message.tbl_duration")
        },
        {
          value : 'hash',
          align: 'left',
          sortable: false,
          text: this.$t("message.tbl_hash")
        }
      ]
    },
  },
  data() {
    return {
      loading: true,
      ipfs_addr: ipfs_server_addr,
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
    viewDetail(ubi_code) {
      this.$router.push({ path: "/ubi_detail/" + ubi_code });
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
      this.onSearch();
    },
    handleCurrentChange(val) {
      this.page = val;
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