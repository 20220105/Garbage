<template>
  <div :class="{ tag_container: true, tag_active: checked }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
// components/WeightRange样式
.tag_container {
  border: 0.0399rem solid rgba(192, 192, 192, 0.1);
  color: #e0e0e0;
  background-color: rgba(192, 192, 192, 0.1);
  border-radius: 0.6rem;
  height: 2.7999rem;
  width: 100%;
  text-align: center;
  line-height: 2.7999rem;
  overflow: hidden;
  font-size: 1.0401rem;
  user-select: none;
}
.tag_active {
  border: 0.0801rem solid #25c90b;
  color: #25c90b;
  background-color: rgba(37, 201, 11, 0.1);
}
</style>