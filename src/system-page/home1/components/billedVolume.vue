<template>
  <div style="width:100%;height:72.4%;" id="billed_volume_con"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "billedVolume",
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
      ]

      //
    };
  },
  mounted() {
    this.$nextTick(() => {
      let billedVolume = echarts.init(
        document.getElementById("billed_volume_con")
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
          textStyle: { color: "#333", fontSize: "12" }
        }
      };

      let option = {
        color: ["#003366", "#006699", "#4cabce", "#e5323e"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["来话时长", "来话次数", "转话时长", "转话次数"]
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
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
            barWidth: 20,
            barGap: 0,
            label: labelOption,
            data: [320, 332, 301, 334]
          },
          {
            name: "来话次数",
            type: "bar",
            barWidth: 20,
            label: labelOption,
            data: [220, 182, 191, 234]
          },
          {
            name: "转话时长",
            type: "bar",
            barWidth: 20,
            label: labelOption,
            data: [150, 232, 201, 154]
          },
          {
            name: "转话次数",
            type: "bar",
            barWidth: 20,
            label: labelOption,
            data: [98, 77, 101, 99]
          }
        ]
      };
      // let xAxisData = [];
      // let data1 = [];
      // let data2 = [];
      // for (let i = 0; i < 20; i++) {
      //   xAxisData.push("类目" + i);
      //   data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      //   data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
      // }

      // const option = {
      //   tooltip: {
      //     trigger: "axis",
      //     axisPointer: {
      //       type: "shadow"
      //     }
      //   },
      //   grid: {
      //     top: 0,
      //     left: "2%",
      //     right: "4%",
      //     bottom: "3%",
      //     containLabel: true
      //   },
      //   xAxis: {
      //     type: "value",
      //     boundaryGap: [0, 0.01]
      //   },
      //   yAxis: {
      //     type: "category",
      //     data: ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"],
      //     nameTextStyle: {
      //       color: "#c3c3c3"
      //     }
      //   },
      //   series: [
      //     {
      //       name: "访问量",
      //       type: "bar",
      //       data: [
      //         {
      //           value: 453682,
      //           name: "Mon",
      //           itemStyle: { normal: { color: "#2d8cf0" } }
      //         },
      //         {
      //           value: 879545,
      //           name: "Tues",
      //           itemStyle: { normal: { color: "#2d8cf0" } }
      //         },
      //         {
      //           value: 2354678,
      //           name: "Wed",
      //           itemStyle: { normal: { color: "#2d8cf0" } }
      //         },
      //         {
      //           value: 1598403,
      //           name: "Thur",
      //           itemStyle: { normal: { color: "#2d8cf0" } }
      //         },
      //         {
      //           value: 543250,
      //           name: "Fri",
      //           itemStyle: { normal: { color: "#2d8cf0" } }
      //         },
      //         {
      //           value: 1305923,
      //           name: "Sat",
      //           itemStyle: { normal: { color: "#2d8cf0" } }
      //         },
      //         {
      //           value: 1103456,
      //           name: "Sun",
      //           itemStyle: { normal: { color: "#2d8cf0" } }
      //         }
      //       ]
      //     }
      //   ]
      // };

      billedVolume.setOption(option);

      window.addEventListener("resize", function() {
        billedVolume.resize();
      });
    });
  }
};
</script>
