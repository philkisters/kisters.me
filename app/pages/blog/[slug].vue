<template>
  <main class="relative isolate min-h-screen overflow-hidden">
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,70,52,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(44,116,255,0.16),transparent_28%),radial-gradient(circle_at_75%_85%,rgba(117,90,74,0.24),transparent_30%)]"
    />

    <UContainer class="relative z-10 mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div class="mb-8 flex items-center justify-between gap-4">
        <UButton to="/blog" color="secondary" variant="soft" icon="i-lucide-arrow-left">
          All posts
        </UButton>

        <UButton v-if="relatedProject" :to="relatedProject.path" color="primary" variant="outline">
          Related project
        </UButton>
      </div>

      <UCard
        v-if="post"
        class="overflow-hidden border border-white/10 bg-white/5 shadow-2xl shadow-black/30 backdrop-blur-xl"
      >
        <div class="space-y-6 p-6 lg:p-8">
          <div class="space-y-3">
            <div class="flex flex-wrap items-center gap-2">
              <p class="text-xs uppercase tracking-[0.3em] text-primary-300">
                {{ formatDate(post.date) }}
              </p>
              <UBadge v-if="relatedProject" color="secondary" variant="soft">
                {{ relatedProject.title }}
              </UBadge>
            </div>

            <h1 class="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              {{ post.title }}
            </h1>
            <p class="text-base leading-8 text-neutral-300">{{ post.description }}</p>
          </div>

          <div
            class="prose prose-invert max-w-none prose-p:text-neutral-300 prose-li:text-neutral-300"
          >
            <ContentRenderer :value="post" />
          </div>
        </div>
      </UCard>
    </UContainer>
  </main>
</template>

<script setup lang="ts">
  const route = useRoute()
  const slug = computed(() => String(route.params.slug ?? ''))
  const postPath = computed(() => `/blog/${slug.value}`)

  const { data: postData, status: postStatus } = await useAsyncData(
    () => `blog-post-${slug.value}`,
    () => queryCollection('blog').path(postPath.value).first(),
  )

  const { data: projectsData } = await useAsyncData('blog-projects', () =>
    queryCollection('projects').all(),
  )

  const post = computed(() => postData.value)

  const relatedProject = computed(() =>
    projectsData.value?.find((project) => getProjectKey(project.path) === post.value?.project),
  )

  function getProjectKey(path: string) {
    return path.split('/').filter(Boolean).at(-1) ?? ''
  }

  watchEffect(() => {
    if (postStatus.value === 'success' && !post.value) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Post not found',
      })
    }
  })

  function formatDate(date?: string) {
    if (!date) {
      return ''
    }

    const parsed = new Date(date)
    if (Number.isNaN(parsed.getTime())) {
      return ''
    }

    return new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(parsed)
  }

  useSeoMeta({
    title: () => `${post.value?.title ?? 'Post'} · philkisters`,
    description: () => post.value?.description ?? 'Blog post',
  })
</script>
