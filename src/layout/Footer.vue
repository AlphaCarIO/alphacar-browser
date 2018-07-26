<template>
<v-footer dark justify-center row wrap>
<v-flex py-3 text-xs-center white--text xs12>
  {{ $t("message.copyright") }}
</v-flex>
</v-footer>
</template>

<style scoped>

.lc_f {
  margin-top: 0px;
  padding-top: 10px;
  height: 100%;
  text-align: center;
  align-content: center;
  vertical-align: center;
  font-size: 14px;
  color: #050505;
  padding: 0% !important;
}

</style>

<script>
  export default {
    name: "Footer",
    methods: {
    }
  }
</script>