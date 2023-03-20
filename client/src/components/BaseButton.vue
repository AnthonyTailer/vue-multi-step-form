<template>
  <button :class="['baseButton', { outlined }]" v-bind="$attrs">
    <slot></slot>
  </button>
</template>
<script>
export default {
  props: {
    outlined: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped>
  @import '../assets/base.css';
  .baseButton {
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: var(--color-button);
    text-align: center;
    color: #fff;
    max-height: 48px;
  }

  .outlined {
    background-color: #fff;
    border: 1px solid var(--color-button);
    color:  var(--color-button);
  }
</style>