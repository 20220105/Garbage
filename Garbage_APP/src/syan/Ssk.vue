<template>
  <div>
    <input type="text" placeholder="请搜索" @input="searchAction($event)" />
    <ul v-if="searchResult.length > 0">
      <li v-for="(item, index) of searchResult" :key="index">
        <div>
          <img :src="item.img" :alt="item.course_name" />
        </div>
        <h1>{{ item.course_name }}</h1>
      </li>
    </ul>
    <ul v-else>
      <li v-for="(item, index) of courseData" :key="index">
        <div>
          <img :src="item.img" :alt="item.course_name" />
        </div>
        <h1>{{ item.course_name }}</h1>
      </li>
    </ul>
  </div>
</template>
<script>
import courseData from "../data/course";
// import { throttle } from "../libs/utils";   //这里报错了  是路径错误还是 utils.js写错了

export default {
  name: "App",
  data() {
    return {
      searchResult: [], //搜索的结果(暂为空)
      courseData: courseData,
      item: "",
    };
  },
  methods: {
    searchAction(e) {
      const inputValue = e.target.value;
      this.searchResult = this.courseData.filter((item) => {
        if (item.course_name.includes(inputValue)) {
          return item;
        }
      });
    }, //throttle(节流,这里错误了)
  },
};
</script>

<style lang="scss" scoped>
</style>