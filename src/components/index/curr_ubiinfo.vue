<template>
<div v-bind:class="['content', this.isUp == 1 ? 'whiteColor' : this.isUp > 0 ? 'redColor' : 'greenColor']">
ETH_USDT {{ $t("message.quote_last") }}:{{ eth_price }}
<div class='small_content'>
  {{ $t("message.quote_percentChange") }} :{{ percentChange }}%
</div>
<div class='small_content2'>
  {{ $t("message.quote_baseVolume") }}:{{ baseVolume }}
</div>
<div class='small_content2'>
  {{ $t("message.quote_high24hr") }}:{{ high24hr }}&nbsp;&nbsp;&nbsp;{{ $t("message.quote_low24hr") }}:{{ low24hr }}
</div>
</div>
</template>
<style scoped>

.content {
  font-size: 30px;
  width: 100%;
  height: 100%;
  text-align: left;
}

.small_content {
  font-size: 18px;
  text-align: left;
}

.small_content2 {
  color: #000000;
  font-size: 18px;
  text-align: left;
}

.whiteColor {
  color: #ffffff;
}

.redColor {
  color: #ff0000;
}

.greenColor {
  color: #028302;
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
      isUp: 0,
      eth_price: '',
      percentChange: '',
      baseVolume: '',
      high24hr: '',
      low24hr: '',
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

      self.$http.get('/gateio/ticker/eth_usdt').then(response => {
          if (response.status == 200) {
            self.eth_price = response.data.data.last;
            self.baseVolume = response.data.data.baseVolume.toFixed(4);
            self.high24hr = response.data.data.high24hr;
            self.low24hr = response.data.data.low24hr;
            let percentChange = response.data.data.percentChange;
            self.percentChange = (percentChange * 100).toFixed(2);
            if (percentChange == 0) {
              self.isUp = 0;
            } else if (percentChange > 0) {
              self.isUp = 1;
            } else {
              self.isUp = -1;
            }
          }
　　　　}, response => {
　　　　　　console.log(response);
　　　　});

    },
  },
};
</script>