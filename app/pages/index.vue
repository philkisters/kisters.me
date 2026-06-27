<template>
  <main class="relative isolate min-h-screen overflow-hidden">
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,70,52,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(44,116,255,0.16),transparent_28%),radial-gradient(circle_at_75%_85%,rgba(117,90,74,0.24),transparent_30%)]"
    />
    <div
      class="pointer-events-none absolute left-0 top-0 h-80 w-80 -translate-x-1/3 rounded-full bg-primary-500/15 blur-3xl"
    />
    <div
      class="pointer-events-none absolute right-0 top-24 h-96 w-96 translate-x-1/3 rounded-full bg-secondary-500/15 blur-3xl"
    />

    <UContainer
      class="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10"
    >
      <section class="grid gap-6 lg:grid-cols-[minmax(240px,280px)_minmax(0,1fr)] lg:items-stretch">
        <div
          class="flex items-center justify-center rounded-[1.5rem] border border-white/10 bg-white/6 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6"
        >
          <div class="relative w-full max-w-[18rem]">
            <div
              class="absolute -inset-4 rounded-4xl bg-[linear-gradient(135deg,rgba(201,70,52,0.32),rgba(44,116,255,0.18))] blur-xl"
            />
            <img
              src="/images/philipp.jpg"
              alt="Philipp Kisters"
              class="relative aspect-square w-full rounded-4xl border border-white/12 object-cover shadow-2xl shadow-black/40"
            />
          </div>
        </div>

        <div
          class="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/6 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6"
        >
          <div class="flex h-full flex-col justify-center gap-5 text-center lg:text-left">
            <div class="space-y-3">
              <h1 class="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Moin, I&apos;m Philipp
              </h1>
              <div
                class="prose prose-invert max-w-none prose-p:text-neutral-300 prose-a:text-secondary-300"
              >
                <ContentRenderer v-if="aboutPage" :value="aboutPage" />
              </div>
            </div>

            <div class="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <UButton
                to="https://github.com/philkisters"
                target="_blank"
                color="primary"
                variant="soft"
                square
                icon="i-simple-icons-github"
                aria-label="GitHub"
              />
              <UButton
                to="https://linkedin.com/in/philipp-kisters-42223ab6"
                target="_blank"
                color="secondary"
                variant="soft"
                square
                icon="i-simple-icons-linkedin"
                aria-label="LinkedIn"
              />
              <UButton
                to="mailto:philipp@kisters.me"
                color="primary"
                variant="outline"
                square
                icon="i-lucide-mail"
                aria-label="Email"
              />
              <UButton to="/blog" color="secondary" variant="soft" icon="i-lucide-pencil-line">
                Blog
              </UButton>
            </div>
          </div>
        </div>
      </section>

      <section>
        <UCard
          class="overflow-hidden border border-white/10 bg-white/5 shadow-2xl shadow-black/30 backdrop-blur-xl"
        >
          <template #header>
            <button
              class="flex w-full items-center justify-between gap-4 text-left"
              @click="toggleSection('projects')"
            >
              <div>
                <p class="text-xs uppercase tracking-[0.32em] text-primary-300">01</p>
                <h2 class="mt-1 text-xl font-semibold text-white">Projects</h2>
              </div>
              <span class="text-sm text-neutral-400">{{
                sections.projects ? 'Collapse' : 'Expand'
              }}</span>
            </button>
          </template>

          <div
            v-if="sections.projects && hasProjects"
            class="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]"
          >
            <div class="overflow-hidden rounded-[1.25rem] border border-white/10 bg-black/10">
              <img
                :src="currentProject?.image || '/images/philipp.jpg'"
                :alt="currentProject?.title || 'Project preview'"
                class="h-full min-h-64 w-full object-cover"
              />
            </div>

            <div class="flex flex-col justify-between gap-6">
              <div class="space-y-4">
                <div>
                  <h3 class="text-2xl font-semibold text-white">
                    {{ currentProject?.title || '' }}
                  </h3>
                  <div
                    class="summary-only mt-3 prose prose-sm prose-invert max-w-none prose-a:text-secondary-300"
                  >
                    <ContentRenderer v-if="currentProject" :value="currentProject" />
                  </div>
                </div>

                <div class="flex flex-wrap gap-2">
                  <UBadge
                    v-for="tag in currentProject?.stack || []"
                    :key="tag"
                    color="secondary"
                    variant="soft"
                  >
                    {{ tag }}
                  </UBadge>
                </div>
              </div>

              <div
                class="flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <UButton color="secondary" variant="outline" @click="moveProject(-1)">
                  Previous
                </UButton>
                <span class="text-sm text-neutral-400">
                  {{ currentProjectIndex + 1 }} / {{ homeProjects.length }}
                </span>
                <div class="flex items-center gap-2">
                  <UButton
                    color="secondary"
                    variant="soft"
                    :to="currentProject?.path || '/projects'"
                  >
                    Open
                  </UButton>
                  <UButton color="primary" variant="solid" @click="moveProject(1)"> Next </UButton>
                </div>
              </div>
            </div>
          </div>

          <div
            v-else-if="sections.projects"
            class="rounded-[1.25rem] border border-white/10 bg-black/10 p-5"
          >
            <p class="text-sm text-neutral-300">No projects found yet.</p>
          </div>
        </UCard>
      </section>

      <section>
        <UCard class="border border-white/10 bg-white/5 shadow-xl shadow-black/25 backdrop-blur-xl">
          <template #header>
            <button
              class="flex w-full items-center justify-between gap-4 text-left"
              @click="toggleSection('bio')"
            >
              <div>
                <p class="text-xs uppercase tracking-[0.32em] text-secondary-300">02</p>
                <h2 class="mt-1 text-xl font-semibold text-white">Bio</h2>
              </div>
              <span class="text-sm text-neutral-400">{{
                sections.bio ? 'Collapse' : 'Expand'
              }}</span>
            </button>
          </template>

          <div
            v-if="sections.bio"
            class="prose prose-invert max-w-none prose-p:text-neutral-300 prose-a:text-primary-300"
          >
            <ContentRenderer v-if="bioPage" :value="bioPage" />
          </div>
        </UCard>
      </section>

      <footer class="pb-2 text-center text-sm text-neutral-500">
        © 2026 Philipp - All rights reserved
      </footer>
    </UContainer>
  </main>
</template>

<script setup lang="ts">
  type HomeProjectPreview = {
    path: string
    title: string
    description: string
    image?: string
    stack?: string[]
    link?: string
    relatedPosts: number
  }

  const sections = reactive({
    bio: true,
    projects: true,
  })

  const { data: projectsData } = await useAsyncData('home-projects', () =>
    queryCollection('projects').all(),
  )

  const { data: blogPostsData } = await useAsyncData('home-blog-posts', () =>
    queryCollection('blog').all(),
  )

  const homeProjects = computed<HomeProjectPreview[]>(() => {
    const items = [...(projectsData.value ?? [])]
    const posts = blogPostsData.value ?? []

    return items
      .map((project) => ({
        ...project,
        relatedPosts: posts.filter((post) => post.project === getProjectKey(project.path)).length,
      }))
      .sort((left, right) => left.title.localeCompare(right.title))
  })

  const hasProjects = computed(() => homeProjects.value.length > 0)

  const fallbackProject: HomeProjectPreview = {
    path: '/projects',
    title: '',
    description: '',
    image: '',
    stack: [],
    link: '',
    relatedPosts: 0,
  }

  const currentProjectIndex = ref(0)
  const currentProject = computed<HomeProjectPreview>(
    () => homeProjects.value[currentProjectIndex.value] ?? fallbackProject,
  )

  const { data: aboutPage } = await useAsyncData('page-about', () =>
    queryCollection('pages').path('/about').first(),
  )

  const { data: bioPage } = await useAsyncData('page-bio', () =>
    queryCollection('pages').path('/bio').first(),
  )

  function toggleSection(name: keyof typeof sections) {
    sections[name] = !sections[name]
  }

  function moveProject(direction: 1 | -1) {
    const max = homeProjects.value.length - 1

    if (max < 0) {
      return
    }

    if (direction === 1) {
      currentProjectIndex.value =
        currentProjectIndex.value === max ? 0 : currentProjectIndex.value + 1
      return
    }

    currentProjectIndex.value =
      currentProjectIndex.value === 0 ? max : currentProjectIndex.value - 1
  }

  function getProjectKey(path: string) {
    return path.split('/').filter(Boolean).at(-1) ?? ''
  }

  watchEffect(() => {
    if (!homeProjects.value.length) {
      currentProjectIndex.value = 0
      return
    }

    if (currentProjectIndex.value >= homeProjects.value.length) {
      currentProjectIndex.value = 0
    }
  })

  useSeoMeta({
    title: 'philkisters',
    description: 'Personal website of Philipp Kisters',
  })
</script>

<style scoped>
  /* Only show the ::project-summary block; hide the rest of the body */
  .summary-only :deep(.project-summary ~ *) {
    display: none;
  }
  /* Remove default prose paragraph margins inside the summary */
  .summary-only :deep(.project-summary p) {
    margin-top: 0;
    margin-bottom: 0;
  }
</style>
