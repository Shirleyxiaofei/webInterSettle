<template>
  <div style="width:100%;height:72.4%;" id="user_flow"></div>
</template>

<script>
import echarts from "echarts";

const option = {
  // title: {
  //     text: '折线图堆叠'
  // },
  tooltip: {
    trigger: "axis"
  },
  legend: {
    data: ["美国", "欧洲", "国际", "集团"]
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true
  },
  xAxis: {
    type: "category",
    data: [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月"
    ],
    normal: {
      show: true,
      width: "20"
    }
  },
  yAxis: {
    axisTick: {
      show: false
    }
  },
  series: [
    {
      name: "美国",
      type: "line",
      label: {
        normal: {
          show: true,
          position: "top",
          color: "#333"
        }
      },
      itemStyle: {
        normal: {
          color: "#003366"
        }
      },
      data: [120, 132, 101, 134, 90, 230, 210, 300, 200, 310, 330, 220]
    },
    {
      name: "欧洲",
      type: "line",
      label: {
        normal: {
          show: true,
          position: "top",
          color: "#333"
        }
      },
      itemStyle: {
        normal: {
          color: "#4cabce"
        }
      },
      data: [220, 182, 191, 234, 290, 330, 310, 360, 380, 320, 390, 300]
    },
    {
      name: "国际",
      type: "line",
      label: {
        normal: {
          show: true,
          position: "top",
          color: "#333"
        }
      },
      itemStyle: {
        normal: {
          color: "#006699"
        }
      },
      data: [150, 232, 201, 154, 190, 330, 410, 420, 430, 450, 420, 400]
    },
    {
      name: "集团",
      type: "line",
      label: {
        normal: {
          show: true,
          position: "top",
          color: "#333"
        }
      },
      itemStyle: {
        normal: {
          color: "#e5323e"
        }
      },
      data: [320, 332, 301, 334, 390, 330, 320, 320, 320, 320, 320, 310]
    }
  ]
};

export default {
  name: "userFlow",
  mounted() {
    let userFlow = echarts.init(document.getElementById("user_flow"));
    userFlow.setOption(option);

    window.addEventListener("resize", function() {
      userFlow.resize();
    });
  }
};
</script>
