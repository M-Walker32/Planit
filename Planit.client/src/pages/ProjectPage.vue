<template>
  <div class="container full-page">
    <div class="row full-page">
      <div class="col-12 my-5">
        <div class="d-flex">
          <h1>{{ activeProject.name }}</h1>
          <div>
          <button
            @click="deleteProject"
            class="button-nice mx-2 on-hover"
            data-toggle="tooltip"
            data-placement="top"
            title="Delete Project"
            aria-label="delete project"
          >
            Delete
          </button>
           </div>
        </div>
        <p>{{ activeProject.description }}</p>
      </div>
      <div class="col-12">
        <div class="d-flex justify-content-between">
          <h3>Sprints</h3>
          <button
            data-bs-toggle="modal"
            class="button-nice"
            data-bs-target="#create-sprint-modal"
            data-toggle="tooltip"
            data-placement="top"
            title="Create Sprint"
            aria-label="open new sprint menu"
          >
            +
          </button>
        </div>
      </div>
      <div class="col-12">
        <Sprint v-for="s in sprints" :key="s.id" :sprint="s" />
      </div>
      <div
        class="fab bg-primary rounded selectable"
        data-bs-toggle="offcanvas"
        data-bs-target="#projects-selector"
        aria-label="open the projects selector"
      >
        <i class="mdi mdi-arrow-expand-right"></i>
      </div>
    </div>
  </div>

  <Modal id="create-sprint-modal">
    <template #modal-title-slot>
      <h3>Create Sprint!</h3>
    </template>
    <template #modal-body-slot>
      <SprintForm />
    </template>
  </Modal>

  <OffCanvas id="projects-selector" class="offcanvas offcanvas-start">
    <template #offcanvas-header-slot>
      <h4 class="text-dark">Projects</h4>
    </template>
    <template #offcanvas-task-slot>
      <table class="table">
        <thead>
          <tr class="text-dark font">
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <Project v-for="p in projects" :key="p.id" :project="p" />
          <!-- Projects go here -->
        </tbody>
      </table>
    </template>
  </OffCanvas>
</template>


<script>
import { computed, onMounted, watchEffect } from "@vue/runtime-core"
import { AppState } from "../AppState.js"
import { useRoute, useRouter } from "vue-router"
import Pop from "../utils/Pop.js"
import { logger } from "../utils/Logger.js"
import { projectsService } from "../services/ProjectsService.js"
import { sprintsService } from "../services/SprintsService.js"
import { tasksService } from "../services/TasksService.js"
import { notesService } from "../services/NotesService.js"
import { Offcanvas } from "bootstrap"
export default {
  name: 'ProjectPage',
  setup() {
    const route = useRoute()
    const router = useRouter()
    watchEffect(async () => {
      route.params
      try {
        if (route.name == 'ProjectPage') {
          await projectsService.getAllProjects(AppState.account)
          await projectsService.getProjectById(route.params.projectId)
          await sprintsService.getSprintsByProject(route.params.projectId)
          await tasksService.getTasksByProject(route.params.projectId)
          await notesService.getNotesByProject(route.params.projectId)
        }
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      sprints: computed(() => AppState.sprints),
      activeProject: computed(() => AppState.activeProject),
      projects: computed(() => AppState.projects),
      async deleteProject() {
        try {
          if (await Pop.confirm()) {
            router.push({ name: 'Home' })
            await projectsService.deleteProject(this.activeProject.id)
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.fab {
  position: absolute;
  left: 1em;
  bottom: 1em;
  min-width: fit-content;
  max-width: 2em;
}
</style>