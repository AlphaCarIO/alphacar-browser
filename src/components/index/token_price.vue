<template>
<div v-if="loading" class="display-3 text-lg-center">{{ $t("message.loading") }}</div>
<div v-else v-bind:class="['display-1 text-lg-left', price_color]">
  <v-layout row wrap class="font-weight-black font-italic black--text">
    ACAR/CNYT
  </v-layout>
  <v-divider/>
  <v-layout row wrap align-baseline>
    <v-flex>
      {{ $t("message.quote_last") }}:&nbsp;{{ price }}
    </v-flex>
    <v-flex class='caption'>
      {{ $t("message.quote_percentChange") }}:&nbsp;{{ daily_change }}%
    </v-flex>
  </v-layout>
  <v-divider/>
  <v-layout row wrap class='subheading'>
    {{ $t("message.quote_baseVolume") }}:&nbsp;{{ volume }}
  </v-layout>
  <v-divider/>
  <v-layout row wrap class='subheading'>
    <v-flex :class='high_color'>
    {{ $t("message.quote_high24hr") }}:&nbsp;{{ high }}
    </v-flex>
    <v-flex :class='low_color'>
      {{ $t("message.quote_low24hr") }}:&nbsp;{{ low }}
    </v-flex>
  </v-layout>
</div>
</template>

<style scoped>

.flatColor {
  color: #252525;
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
import qs from "qs";

export default {
  components: {},
  computed: {
    high_color: function() {

      let color = "red--text";
      
      if (this.$i18n.locale == "en") {
        color = "green--text";
      }
      
      return color;
    },
    low_color: function() {
      let color = "green--text";
      
      if (this.$i18n.locale == "en") {
        color = "red--text";
      }
      
      return color;
    },
    price_color: function() {
      let color = "flatColor";

      if (this.isUp == 1) {
        if (this.$i18n.locale == "cn") {
          color = "redColor";
        } else {
          color = "greenColor";
        }
      } else if (this.isUp == -1) {
        if (this.$i18n.locale == "cn") {
          color = "greenColor";
        } else {
          color = "redColor";
        }
      }
      
      return color;
    },
  },
  data() {
    return {
      isUp: 0,
      price: "",
      open: "",
      high: "",
      low: "",
      volume: "",
      daily_vol: "",
      daily_change: "",
      loading: true
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {},
  methods: {
    fetchData() {
      let self = this;

      //http://103.218.243.249/1.0/rest/market/ticker
      self.$http.get("/api/tok/ticker/ACAR-CNYT").then(
        response => {
          if (response.status == 200) {
            self.price = response.data.data.last_price;
            self.open = response.data.data.open;
            self.high = response.data.data.high;
            self.low = response.data.data.low;
            self.volume = response.data.data.volume//.toFixed(4);
            self.daily_vol = response.data.data.daily_vol;
            self.daily_change = response.data.data.daily_change * 100//.toFixed(2);
            if (self.daily_change == 0) {
              self.isUp = 0;
            } else if (self.daily_change > 0) {
              self.isUp = 1;
            } else {
              self.isUp = -1;
            }
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