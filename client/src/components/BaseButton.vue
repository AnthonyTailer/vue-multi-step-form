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
    flex: 1;
    line-height: 2rem;
  }

  .outlined {
    background-color: #fff;
    border: 1px solid var(--color-button);
    color:  var(--color-button);
  }

  .baseButton.outlined:hover {
    border: 1px solid var(--vt-c-pomegranate-dark);
    color:  var(--vt-c-pomegranate-dark);
  }

  .baseButton:not(.outlined):hover {
    background-color: var(--vt-c-pomegranate-dark)
  }
</style>