<template>
  <div
    class="box"
    :style="{ background: `url(${bg}) no-repeat`, backgroundSize: '100% 100%' }"
  >
    <div class="box-left"></div>
    <div class="box-middle" id="china"></div>
    <div class="box-right"></div>
  </div>
</template>

<script setup lang="ts">
import bg from "@/assets/1.jpg";
import { useStore } from "./stores";
import { onMounted } from "vue";
import * as echarts from "echarts";
import chinaJson from "@/assets/china.json";

const store = useStore();

onMounted(async () => {
  await store.getList();
  const city = store.list.diseaseh5Shelf.areaTree[0].children;
  const data = city.map((item) => {
    let center: Array<number> = [];
    chinaJson.features.map((i) => {
      if (i.properties.adcode == item.adcode) {
        center = JSON.parse(JSON.stringify(i.properties.center));
        center.push(item.total.confirm);
      }
    });
    return {
      name: item.name,
      value: center,
    };
  });
  console.log(data)
  const chart = echarts.init(document.querySelector("#china") as HTMLElement);
  echarts.registerMap("china", chinaJson as any);
  chart.setOption({
    backgroundColor: "black",
    geo: {
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "65%"],
      layoutSize: "120%",
      emphasis: {
        itemStyle: {
          areaColor: "#0f5d9d",
        },
      },
      itemStyle: {
        areaColor: {
          type: "linear-gradient",
          x: 0,
          y: 1200,
          x2: 1000,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#152E6E", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#0673AD", // 50% 处的颜色
            },
          ],
          global: true, // 缺省为 false
        },
        shadowColor: "#0f5d9d",
        shadowOffsetX: 0,
        shadowOffsetY: 15,
        opacity: 0.5,
      },

      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",
            opacity: 0,
            label: {
              show: false,
              color: "#009cc9",
            },
          },
          label: {
            show: false,
            color: "#FFFFFF",
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      {
        type: "map",
        selectedMode: "multiple",
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "65%"], //地图位置
        layoutSize: "120%",
        zoom: 1, //当前视角的缩放比例
        // roam: true, //是否开启平游或缩放
        scaleLimit: {
          //滚轮缩放的极限控制
          min: 1,
          max: 2,
        },
        label: {
          show: true,
          color: "#FFFFFF",
          fontSize: 12,
        },
        emphasis: {
          itemStyle: {
            areaColor: "#56b1da",
          },
        },
        itemStyle: {
          areaColor: "#0c3653",
          borderColor: "#1cccff",
          borderWidth: 1.8,
          label: {
            show: true,
            color: "#fff",
          },
        },
        data: data,
      },
      {
        type: "scatter",
        coordinateSystem: "geo",
        //   symbol: 'image://http://ssq168.shupf.cn/data/biaoji.png',
        // symbolSize: [30,120],
        // symbolOffset:[0, '-40%'] ,
        symbol: "pin",
        symbolSize: [45, 45],
        label: {
          show: true,
          formatter: (params: any) => {
            return params.data.value[2];
          },
        },
        itemStyle: {
          color: "#D8BC37", //标志颜色
        },
        data: data,
        showEffectOn: "render",
        rippleEffect: {
          brushType: "stroke",
        },
        zlevel: 1,
      },
    ],
  });
});
</script>

<style lang='scss' scoped>
.box {
  display: flex;
  height: 100%;
  &-left {
    width: 200px;
  }
  &-middle {
    flex: 1;
  }
  &-right {
    width: 200px;
  }
}
</style>