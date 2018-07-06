<template>
<div class="content">
 ETH_USDT price:{{ eth_price }}
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

</style>
<script>
import bus from "@/utils/event";
import gate from "@/utils/gate"
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
      eth_price: '',
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {
  },
  methods: {

    fetchData () {
      let self = this;
      
      gate.service.get(gate.TICKER_URL).then(response => {
          if (response.status == 200) {
　　　　　　  console.log(response);
            //self.tableData = response.data.data.lst;
          }
　　　　}, response => {
　　　　　　console.log(response);
　　　　})

    },
  },
};
</script>