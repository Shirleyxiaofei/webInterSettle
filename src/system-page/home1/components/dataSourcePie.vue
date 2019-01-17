<template>
  <div style="width:100%;height:72.4%;" id="data_source_con"></div>
</template><script>
import echarts from "echarts";
export default {
  name: "dataSourcePie",
  data() {
    return {
      posList: [
        "left",
        "right",
        "top",
        "bottom",
        "inside",
        "insideTop",
        "insideLeft",
        "insideRight",
        "insideBottom",
        "insideTopLeft",
        "insideTopRight",
        "insideBottomLeft",
        "insideBottomRight"
      ] //
    };
  },
  mounted() {
    this.$nextTick(() => {
      var dataSourcePie = echarts.init(
        document.getElementById("data_source_con")
      );
      let app = [];
      app.configParameters = {
        rotate: {
          min: -90,
          max: 90
        },
        align: {
          options: {
            left: "left",
            center: "center",
            right: "right"
          }
        },
        verticalAlign: {
          options: {
            top: "top",
            middle: "middle",
            bottom: "bottom"
          }
        },
        position: {
          options: echarts.util.reduce(
            this.posList,
            function(map, pos) {
              map[pos] = pos;
              return map;
            },
            {}
          )
        },
        distance: {
          min: 0,
          max: 100
        }
      };
      app.config = {
        position: "insideTop",
        distance: -16,
        onChange: function() {
          var labelOption = {
            normal: {
              rotate: app.config.rotate,
              align: app.config.align,
              verticalAlign: app.config.verticalAlign,
              position: app.config.position,
              distance: app.config.distance
            }
          };
          myChart.setOption({
            series: [
              {
                label: labelOption
              },
              {
                label: labelOption
              },
              {
                label: labelOption
              },
              {
                label: labelOption
              }
            ]
          });
        }
      };
      var labelOption = {
        normal: {
          show: true,
          position: app.config.position,
          distance: app.config.distance,
          formatter: "{c}",
          textStyle: {
            color: "#333",
            fontSize: "12"
          }
        }
      };
      let option = {
        color: ["#003366", "#006699"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["来话时长", "来话次数"]
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            axisTick: {
              show: false
            },
            data: ["集团公司", "国际公司", "欧洲公司", "美洲公司"]
          }
        ],
        yAxis: [
          {
            type: "value",
            show: false
          }
        ],
        series: [
          {
            name: "来话时长",
            type: "bar",
            barGap: 0,
            barWidth: 20,
            label: labelOption,
            data: [320, 332, 301, 334]
          },
          {
            name: "来话次数",
            type: "bar",
            barWidth: 20,
            label: labelOption,
            data: [220, 182, 191, 234]
          }
        ]
      };
      dataSourcePie.setOption(option);
      window.addEventListener("resize", function() {
        dataSourcePie.resize();
      });
    });
  }
};
</script>