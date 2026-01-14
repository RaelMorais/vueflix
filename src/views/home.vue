<template>
  <main class="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 text-white">
    <section class="flex min-h-screen flex-col items-center justify-center text-center px-6">
      <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight">
        Tailwind
        <span class="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          funcionando
        </span>
      </h1>

      <p class="mt-6 max-w-xl text-lg text-zinc-300">
        Se você está vendo cores, gradiente e layout centralizado,
        o Tailwind CSS está corretamente configurado 🎉
      </p>

      <div class="mt-10 flex gap-4">
        <button
          class="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-zinc-900 hover:bg-emerald-400 transition"
        >
          Tudo certo
        </button>

        <button
          class="rounded-xl border border-zinc-600 px-6 py-3 font-semibold hover:bg-zinc-800 transition"
        >
          Testar UI
        </button>
      </div>
    </section>
  </main>
</template>
