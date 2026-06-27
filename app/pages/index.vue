<template>
  <main class="relative isolate min-h-screen overflow-hidden">
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(201,70,52,0.18),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(44,116,255,0.16),_transparent_28%),radial-gradient(circle_at_75%_85%,_rgba(117,90,74,0.24),_transparent_30%)]"
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
            v-if="sections.projects"
            class="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]"
          >
            <div class="overflow-hidden rounded-[1.25rem] border border-white/10 bg-black/10">
              <img
                :src="currentProject.image"
                :alt="currentProject.title"
                class="h-full min-h-64 w-full object-cover"
              />
            </div>

            <div class="flex flex-col justify-between gap-6">
              <div class="space-y-4">
                <div>
                  <h3 class="text-2xl font-semibold text-white">{{ currentProject.title }}</h3>
                  <p class="mt-3 text-sm leading-7 text-neutral-300">
                    {{ currentProject.description }}
                  </p>
                </div>

                <a
                  v-if="currentProject.link"
                  :href="currentProject.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 text-sm font-medium text-secondary-300 transition hover:text-secondary-200"
                >
                  Open project reference
                </a>

                <div class="flex flex-wrap gap-2">
                  <UBadge
                    v-for="tag in currentProject.tags"
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
                  {{ currentProjectIndex + 1 }} / {{ projects.length }}
                </span>
                <UButton color="primary" variant="solid" @click="moveProject(1)"> Next </UButton>
              </div>
            </div>
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
  const sections = reactive({
    bio: true,
    projects: true,
  })

  const projects = [
    {
      title: 'Card Game SynthAIa',
      image: '/images/synthaia.png',
      description:
        'In SynthAIa, you build a team of 15 champions, each with unique strengths in Offense, Defense, and Magic. Using the companion app, you can generate your own champions appearance and abilities, making each team unique.',
      tags: ['Python', 'AI', 'Game Development'],
    },
    {
      title: 'Digital Twin',
      image: '/images/digital_twin.png',
      description:
        'To digitally map loading units and inventory systems in an inland port, a Digital Twin was developed using Mapbox and Nuxt. This enables precise localization and efficient management of assets within the port.',
      tags: ['Nuxt', 'Mapbox', 'Logistics'],
    },
    {
      title: 'PhD - Personal Hope Dashboard',
      image: '/images/phd.png',
      description:
        'This project lets students track their daily hope level throughout the thesis journey and was inspired by the PhD Simulator.',
      tags: ['Nuxt', 'Timeseries', 'Research'],
      link: 'https://research.wmz.ninja/projects/phd/index.html',
    },
    {
      title: 'Settlementy',
      image: '/images/settlementy.png',
      description:
        'Settlementy is a multiplayer idle game where players collaborate to build and defend a settlement through shared resource management and crafting.',
      tags: ['Nuxt', 'Game Development', 'Multiplayer'],
    },
  ]

  const currentProjectIndex = ref(0)

  const currentProject = computed(() => projects[currentProjectIndex.value])

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
    const max = projects.length - 1

    if (direction === 1) {
      currentProjectIndex.value =
        currentProjectIndex.value === max ? 0 : currentProjectIndex.value + 1
      return
    }

    currentProjectIndex.value =
      currentProjectIndex.value === 0 ? max : currentProjectIndex.value - 1
  }

  useSeoMeta({
    title: 'philkisters',
    description: 'Personal website of Philipp Kisters',
  })
</script>
