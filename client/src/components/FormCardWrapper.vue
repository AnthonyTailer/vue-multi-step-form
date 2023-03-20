<template>
  <div class="card">
    <slot></slot>
  </div>
</template>
<style>
@import '../assets/base.css';

.card {
  max-width: 400px;
  min-width: 400px;
  background-color: var(--color-background-card) ;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  padding: 2px 16px;
}
</style>