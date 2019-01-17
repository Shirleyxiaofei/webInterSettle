<template>
  <div style="width:100%;height:100%;" id="current-warning"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "currentWarning",
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
      let currentWarning = echarts.init(
        document.getElementById("current-warning")
      );
      console.log(1);

      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        color: ["#d77a7b", "#8bc1e5", "#99d478", "#b094e1"],
        legend: {
          orient: "horizontal",
          x: "center",
          data: ["集团", "国际", "欧洲", "美洲"]
        },
        series: [
          {
            name: "当前预警情况",
            type: "pie",
            radius: [50, 104],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            lableLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 35, name: "集团" },
              { value: 20, name: "国际" },
              { value: 40, name: "欧洲" },
              { value: 15, name: "美洲" }
            ]
          }
        ]
      };
      currentWarning.setOption(option);

      window.addEventListener("resize", function() {
        currentWarning.resize();
      });
    });
  }
};
</script>
