<template>
  <section class="space-y-2">
    <div class="flex space-x-4 mb-4 text-secondary-darker dark:text-secondary-600">
      <span class="font-icon filled text-4xl">
        <slot name="icon"></slot>
      </span>
      <h3 class="my-auto font-display font-bold text-2xl">
        <slot name="heading"></slot>
      </h3>
    </div>
    <div>
      <slot></slot>
    </div>
  </section>
</template>

<style scoped></style>

