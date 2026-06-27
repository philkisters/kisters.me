<template>
  <main class="relative isolate min-h-screen overflow-hidden">
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,70,52,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(44,116,255,0.16),transparent_28%),radial-gradient(circle_at_75%_85%,rgba(117,90,74,0.24),transparent_30%)]"
    />

    <UContainer class="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div class="space-y-3">
          <p class="text-xs uppercase tracking-[0.32em] text-secondary-300">Content</p>
          <h1 class="text-3xl font-semibold tracking-tight text-white sm:text-5xl">Blog</h1>
          <p class="max-w-2xl text-sm leading-7 text-neutral-300">
            Short project updates and notes that can stand on their own while still pointing back to
            a related project.
          </p>
        </div>

        <UButton to="/" color="secondary" variant="soft" icon="i-lucide-arrow-left">
          Back home
        </UButton>
      </div>

      <div v-if="posts.length" class="grid gap-6 lg:grid-cols-2">
        <UCard
          v-for="post in posts"
          :key="post.path"
          class="border border-white/10 bg-white/5 shadow-2xl shadow-black/25 backdrop-blur-xl"
        >
          <div class="space-y-4 p-6">
            <div class="flex flex-wrap items-center gap-2">
              <p class="text-xs uppercase tracking-[0.3em] text-primary-300">
                {{ formatDate(post.date) }}
              </p>
              <UBadge v-if="projectTitle(post.project)" color="secondary" variant="soft">
                {{ projectTitle(post.project) }}
              </UBadge>
            </div>

            <div class="space-y-2">
              <h2 class="text-2xl font-semibold text-white">{{ post.title }}</h2>
              <p class="text-sm leading-7 text-neutral-300">{{ post.description }}</p>
            </div>

            <div class="flex flex-wrap gap-2">
              <UBadge v-for="item in post.tags" :key="item" color="primary" variant="soft">
                {{ item }}
              </UBadge>
            </div>

            <div class="flex items-center justify-between gap-3 border-t border-white/10 pt-4">
              <span class="text-sm text-neutral-400">Standalone update page</span>
              <UButton :to="post.path" color="primary" variant="solid">Read post</UButton>
            </div>
          </div>
        </UCard>
      </div>

      <UCard v-else class="border border-white/10 bg-white/5 backdrop-blur-xl">
        <p class="text-sm text-neutral-300">No blog posts have been added yet.</p>
      </UCard>
    </UContainer>
  </main>
</template>

<script setup lang="ts">
  const { data: postsData } = await useAsyncData('content-blog-index', () =>
    queryCollection('blog').all(),
  )

  const { data: projectsData } = await useAsyncData('content-blog-projects', () =>
    queryCollection('projects').all(),
  )

  const posts = computed(() =>
    [...(postsData.value ?? [])].sort((left, right) =>
      (right.date ?? '').localeCompare(left.date ?? ''),
    ),
  )

  const projectLookup = computed(() => {
    return new Map(
      (projectsData.value ?? []).map((project) => [getProjectKey(project.path), project.title]),
    )
  })

  function getProjectKey(path: string) {
    return path.split('/').filter(Boolean).at(-1) ?? ''
  }

  function projectTitle(slug?: string) {
    return slug ? projectLookup.value.get(slug) : ''
  }

  function formatDate(date: string) {
    return new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date))
  }

  useSeoMeta({
    title: 'Blog · philkisters',
    description: 'Project updates and standalone notes',
  })
</script>
