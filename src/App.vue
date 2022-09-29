<template>
  <div
    class="box"
    :style="{ background: `url(${bg}) no-repeat`, backgroundSize: '100% 100%' }"
  >
    <div class="box-left"></div>
    <div class="box-middle" id="china"></div>
    <div class="box-right">
      <table class="table" cellspacing="0" border="1">
        <thead>
          <tr>
            <th>地区</th>
            <th>新增确诊</th>
            <th>累计确诊</th>
            <th>治愈</th>
            <th>死亡</th>
          </tr>
        </thead>
        <transition-group
          tag="tbody"
          enter-active-class="animate__animated animate__flipInY"
        >
          <tr v-for="item in store.item" :key="item.name">
            <td align="center">{{ item.name }}</td>
            <td align="center">{{ item.today.confirm }}</td>
            <td align="center">{{ item.total.confirm }}</td>
            <td align="center">{{ item.total.heal }}</td>
            <td align="center">{{ item.total.dead }}</td>
          </tr>
        </transition-group>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import bg from "@/assets/1.jpg";
import { useStore } from "./stores";
import { onMounted } from "vue";
import * as echarts from "echarts";
import chinaJson from "@/assets/china.json";
import type { Children } from "./stores/type";
import "animate.css";

const store = useStore();
onMounted(async () => {
  await store.getList();
  initChart();
});
const initChart = () => {
  const city = store.list.diseaseh5Shelf.areaTree[0].children;
  const data: {
    name: string;
    value: Array<number>;
  }[] = [];
  const mapData: {
    name: string;
    son: Array<Children>;
  }[] = [];
  city.map((item) => {
    let center: Array<number> = [];
    let areaName = "";
    chinaJson.features.map((i) => {
      if (i.properties.adcode == item.adcode) {
        areaName = i.properties.name;
        center = JSON.parse(JSON.stringify(i.properties.center));
        center.push(item.total.confirm);
      }
    });
    data.push({
      name: item.name,
      value: center,
    });
    mapData.push({
      name: areaName,
      son: item.children,
    });
  });
  console.log(data);

  const chart = echarts.init(document.querySelector("#china") as HTMLElement);
  echarts.registerMap("china", chinaJson as any);
  chart.setOption({
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
    },
    series: [
      {
        type: "map",
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
        data: mapData,
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
  chart.on("click", (e: any) => {
    console.log(e);
    store.item = e.data.son;
  });
};
</script>

<style lang='scss' scoped>
.box {
  display: flex;
  height: 100%;
  &-left {
    width: 400px;
  }
  &-middle {
    flex: 1;
  }
  &-right {
    width: 400px;
    color: white;
    .table {
      width: 100%;
      background: #212028;
      tr {
        th {
          padding: 5px;
          white-space: nowrap;
        }
        td {
          padding: 5px 10px;
          width: 100px;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>