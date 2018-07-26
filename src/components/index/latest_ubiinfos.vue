<template>
  <v-layout>
      <v-data-table hide-actions
        :headers="fields"
        :items="tableData"
        :loading="loading"
        class="elevation-1">
        <template slot="items" slot-scope="props">
          <tr @click="viewDetail(props.item.ubi_code)">
          <td>{{ props.item.ubi_code }}</td>
          <td class="text-xs-right">{{ props.item.user.name }}</td>
          <td class="text-xs-right">{{ props.item.user.driving_license }}</td>
          <td class="text-xs-right">{{ props.item.car_info.vin_code }}</td>
          <td class="text-xs-right">{{ props.item.start_date }}-{{ props.item.end_date }}</td>
          <td class="text-xs-right">{{ props.item.hash }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-layout>
</template>

<style scoped>
.content {
  font-size: 30px;
  color: #ffffff;
  width: 100%;
  height: 300px;
  text-align: center;
}

</style>
<script>
import bus from "@/utils/event";
import * as cc from "@/config/constants";
import qs from "qs";

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
      tableData: []
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {},
  methods: {

    viewDetail(ubi_code) {
      this.$router.push({ path: "/ubi_detail/" + ubi_code });
    },

    fetchData() {
      let self = this;

      let params = {
        search_type: "0",
        search_txt: "",
        page: 0,
        page_size: 3
      };

      self.$http.get("/api/ubi_info/list?" + qs.stringify(params)).then(
        response => {
          if (response.status == 200) {
            self.tableData = response.data.data.lst;
            self.loading = false;
          }
        },
        response => {
          console.log(response);
        }
      );
    }
  }
};
</script>