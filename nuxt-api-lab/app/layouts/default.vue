<template>
  <div class="min-h-screen bg-gray-950 text-gray-100">
    <header class="border-b border-gray-800">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <NuxtLink
          to="/"
          class="text-xl font-bold hover:text-primary hover:border-b-2 transition"
        >
          Nuxt API Lab
        </NuxtLink>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 py-8">
      <slot />
    </main>
  </div>
</template>
