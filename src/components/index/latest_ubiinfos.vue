<template>
<div class="container">
  <b-table striped hover responsive :items="tableData" :fields="fields">
    <template slot="index" slot-scope="data">
      {{data.index + 1}}
    </template>
    <template slot="duration" slot-scope="data">
      {{data.item.start_date}}---{{data.item.end_date}}
    </template>
  </b-table>
</div>
</template>

<style>
</style>

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
      /*
      fields: [
        'index',
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
      ],*/
      tableData: []
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {},
  methods: {

    handleRowClick(row, event, column) {
      this.$router.push({ path: "/ubi_detail/" + row.ubi_code });
    },

    fetchData() {
      let self = this;

      let params = {
        search_type: "0",
        search_txt: "",
        page: 0,
        page_size: 3
      };

      self.$http.get("/ubi_info/list?" + qs.stringify(params)).then(
        response => {
          if (response.status == 200) {
            self.tableData = response.data.data.lst;
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