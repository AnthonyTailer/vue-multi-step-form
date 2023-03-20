<template>
  <div :class="['input-container', { invalid: !!error }]">
    <label v-if="label" >{{ label }}</label>
    <input
      v-bind="$attrs"
      :value="modelValue"
      :placeholder="label"
      @input="$emit('update:modelValue', $event.target.value)"
      :aria-invalid="!!error"
    >
    <span v-if="error">{{ error }}</span>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    }
  }
}
</script>
<style>
@import '../assets/base.css';

.input-container {
  padding: 5px 0px;
}

.input-container > input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid var(--vt-c-black-mute);
  border-radius: 4px;
  box-sizing: border-box;
}

.invalid > input {
  border-color: var(--color-error);
}

.invalid > span {
  font-size: 0.8rem;
  color: var(--color-error);
  margin: 5px 0px;
}
</style>