<template>
  <div class="radio-container">
    <div :class="['radio-button-group', { invalid: !!error }]">
      <label :for="option.value" v-for="option in options" :key="option.value">
        <div>
          <input
          :id="option.value"
          type="radio"
          :name="name"
          :value="option.value"
          :checked="option.checked"
          @input="$emit('update:modelValue', option.value)"
        />
        </div>
        <div>{{ option.label }}</div> 
      </label>
    </div>
    <div class="input-error-container">
      <span v-if="error">{{ error }}</span>
    </div>
  </div>
</template>
<script>
export default {
  model: {
    event: "change",
  },
  props: {
    options: {
      required: true,
      type: Array
    },
    value: {
      type: String,
    },
    name: {
      type: String
    },
    error: {
      type: String,
      default: ''
    },
  }
}
</script>
<style>
@import '../assets/base.css';

.radio-container {
  padding: 5px 0px;
}

.radio-button-group {
  margin: 3px 0;
  padding: 15px 20px;
  border: 1px solid var(--vt-c-black-mute);
  border-radius: 4px;
  display: flex;
  justify-content: flex-start;
}

.radio-button-group > label {
  padding-right: 10px;
  display: flex;
  align-items: center;
}

.radio-button-group > label > div {
  height: 100%;
  display: flex;
  align-items: center;
}

.invalid {
  border-color: var(--color-error);
}

input[type="radio"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: inline-block;
  width: 15px;
  height: 15px;
  padding: 2px;
  background-clip: content-box;
  border: 1px solid var(--vt-c-black-mute);
  border-radius: 50%;
  margin-right: 5px;
}

input[type="radio"]:checked {
  background-color: var(--vt-c-pomegranate);
}

.input-error-container {
  height: 20px;
}

span {
  font-size: 0.8rem;
  color: var(--color-error);
  margin: 5px 0px;
  transition: ease-in 0.5s;
}
</style>