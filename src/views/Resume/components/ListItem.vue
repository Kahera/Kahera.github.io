<template>
  <section class="@container max-w-readable">
    <div class="flex gap-x-4 mb-4 text-secondary-darker">
      <!-- Icon -->
      <span class="font-icon filled text-4xl">
        <slot name="icon" />
      </span>

      <!-- Heading -->
      <h2 class="my-auto font-display font-bold text-2xl">
        <slot name="heading" />
      </h2>
    </div>

    <!-- Additional -->
    <div>
      <slot />
    </div>
  </section>
</template>
