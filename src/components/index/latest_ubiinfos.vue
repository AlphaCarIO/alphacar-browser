<template>
  <v-data-table hide-actions
        :headers="fields"
        :items="tableData"
        :loading="loading"
        class="elevation-1">
    <template slot="items" slot-scope="props">
      <tr class="text-xs-left" @click="viewDetail(props.item.ubi_code)">
        <td>{{ props.item.ubi_code }}</td>
        <td>{{ props.item.user.name }}</td>
        <td>{{ props.item.user.driving_license }}</td>
        <td>{{ props.item.car_info.vin_code }}</td>
        <td>{{ props.item.start_date }}-{{ props.item.end_date }}</td>
        <td>{{ props.item.hash }}</td>
      </tr>
    </template>
  </v-data-table>
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