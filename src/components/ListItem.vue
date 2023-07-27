<template>
  <section class="flex space-x-6">
    <slot name="icon" class="w-16 h-16"></slot>
    <div>
      <h3>
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </section>
</template>

<style scoped></style>
