<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">

        <div class="modal-header">
          <slot name="header">
          </slot>
          <hr class="dotted">
        </div>

        <div class="modal-body">
          <slot name="body">
          </slot>
        </div>

        <div class="modal-footer">
          <hr class="dotted">
          <slot name="footer">
            <BaseButton outlined @click="$emit('close')">
              OK
            </BaseButton>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import BaseButton from './BaseButton.vue';

const props = defineProps({
  show: { type: Boolean, defaul: false }
})
</script>
<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 450px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  margin-top: 0;
}

.modal-header > * {
  font-weight: bold;
  font-size: 1.2rem;
}

.modal-body {
  display: flex;
  align-items: center;
  margin: 20px 0;
  min-height: 50px;
}

.modal-footer {
  display: flex;
  flex-direction: column;
}
</style>