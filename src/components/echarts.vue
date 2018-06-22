<template>
  <div class="chart-container">
    <el-row>
      <el-col :span="24" class="chart chart_left">
        <div id="userChart" style="height: 250px" >图表加载失败</div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import moment from 'moment'
  import echarts from 'echarts'
  export default {
    data() {
      return {
        dates: null,
        datas: null,
      };
    },
    methods: {
      getUserChartInit() {
        let self = this;
        const myChart = echarts.init(document.getElementById('userChart'));
        myChart.showLoading();
        var option = {
          title: {
            text: self.$t('Transactions')
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: [self.$t('TxsPerDay')]
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: this.dates,
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: self.$t('TxsPerDay'),
              type: 'line',
              stack: 'Total',
              areaStyle: {normal: {}},
              data: this.datas,
            }
          ]
        };
        myChart.setOption(option, true);
        myChart.hideLoading();

        window.onresize = function() {
          myChart.resize();
        }
      }
    },
    mounted () {
      let days = 13;
      var dt = moment().subtract(days, 'days');
      this.dates = [];
      this.datas = [];
      for (var i = 0; i<= days; i++) {
        this.dates.push(dt.format("MMM/Do"));
        this.datas.push(Math.floor(50 + Math.random() * Math.floor(500)));
        dt = dt.add(1, 'days');
      }
      
      this.$nextTick(function () {
        this.getUserChartInit();
      })
    }
  };
</script>
<style>
  .chart{
    background-color: white;
    border-radius: 4px;
  }
  .chart_left{
    border-right:#F2F2F2 10px solid;
  }
</style>
