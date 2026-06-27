<template>
  <main class="relative isolate min-h-screen overflow-hidden">
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,70,52,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(44,116,255,0.16),transparent_28%),radial-gradient(circle_at_75%_85%,rgba(117,90,74,0.24),transparent_30%)]"
    />

    <UContainer class="relative z-10 mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div class="mb-8 flex items-center justify-between gap-4">
        <UButton to="/" color="secondary" variant="soft" icon="i-lucide-arrow-left"> Home </UButton>

        <UButton to="/blog" color="primary" variant="outline">Blog updates</UButton>
      </div>

      <UCard
        v-if="project"
        class="overflow-hidden border border-white/10 bg-white/5 shadow-2xl shadow-black/30 backdrop-blur-xl"
      >
        <div v-if="project.image" class="overflow-hidden bg-black/10">
          <img :src="project.image" :alt="project.title" class="h-72 w-full object-cover" />
        </div>

        <div class="grid gap-8 p-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:p-8">
          <div class="space-y-6">
            <div class="space-y-3">
              <div class="flex flex-wrap items-center gap-2">
                <p class="text-xs uppercase tracking-[0.3em] text-primary-300">Project</p>
                <UBadge v-if="project.status" color="secondary" variant="soft">
                  {{ project.status }}
                </UBadge>
              </div>
            </div>

            <div
              class="prose prose-invert max-w-none prose-p:text-neutral-300 prose-li:text-neutral-300"
            >
              <ContentRenderer :value="project" />
            </div>
          </div>

          <aside class="space-y-6 rounded-[1.25rem] border border-white/10 bg-black/10 p-5">
            <div>
              <h2 class="text-sm uppercase tracking-[0.3em] text-secondary-300">Stack</h2>
              <div class="mt-3 flex flex-wrap gap-2">
                <UBadge v-for="item in project.stack" :key="item" color="primary" variant="soft">
                  {{ item }}
                </UBadge>
              </div>
            </div>

            <div>
              <h2 class="text-sm uppercase tracking-[0.3em] text-secondary-300">Related posts</h2>
              <div class="mt-4 space-y-3">
                <UCard
                  v-for="post in relatedPosts"
                  :key="post.path"
                  class="border border-white/10 bg-white/5"
                >
                  <div class="space-y-2">
                    <p class="text-xs uppercase tracking-[0.26em] text-neutral-400">
                      {{ formatDate(post.date) }}
                    </p>
                    <h3 class="font-medium text-white">{{ post.title }}</h3>
                    <p class="text-sm leading-6 text-neutral-300">{{ post.description }}</p>
                    <UButton :to="post.path" color="secondary" variant="link">Read post</UButton>
                  </div>
                </UCard>

                <p v-if="!relatedPosts.length" class="text-sm text-neutral-400">
                  No updates have been linked to this project yet.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </UCard>
    </UContainer>
  </main>
</template>

<script setup lang="ts">
  provide('hideProjectSummary', true)

  const route = useRoute()
  const projectPath = computed(() => `/projects/${route.params.slug}`)

  const { data: projectData } = await useAsyncData(projectPath.value, () =>
    queryCollection('projects').path(projectPath.value).first(),
  )

  const { data: postsData } = await useAsyncData(`related-posts-${route.params.slug}`, () =>
    queryCollection('blog').all(),
  )

  const project = computed(() => projectData.value)

  const relatedPosts = computed(() =>
    [...(postsData.value ?? [])]
      .filter((post) => post.project === route.params.slug)
      .sort((left, right) => (right.date ?? '').localeCompare(left.date ?? '')),
  )

  if (!project.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Project not found',
    })
  }

  function formatDate(date: string) {
    return new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date))
  }

  useSeoMeta({
    title: () => `${project.value?.title ?? 'Project'} · philkisters`,
    description: () => project.value?.description ?? 'Project detail page',
  })
</script>
