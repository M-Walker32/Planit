<template>
  <div class="container full-page">
    <div class="row full-page">
      <div class="col-12">
        <h6>PIRANA</h6>
        <div class="d-flex">
          <h1>{{ project.name }}</h1>
          <button @click="deleteProject">Delete</button>
        </div>
        <p>{{ project.description }}</p>
      </div>
      <div class="col-12">
        <div class="d-flex">
          <h3>Sprints</h3>
          <button @click="deleteSprint">Create Sprint</button>
        </div>
      </div>
      <div class="col-12">
        <Sprint v-for="s in sprints" :key="s.id" :sprint="s" />
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core"
import { AppState } from "../AppState.js"
import { useRoute, useRouter } from "vue-router"
import Pop from "../utils/Pop.js"
import { logger } from "../utils/Logger.js"
import { projectsService } from "../services/ProjectsService.js"
import { sprintsService } from "../services/SprintsService.js"
export default {
  name: 'ProjectPage',
  setup() {
    const route = useRoute()
    const router = useRouter()
    onMounted(async () => {
      try {
        await sprintsService.getSprintsByProject(route.params.projectId)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      project: computed(() => AppState.activeProject),
      sprints: computed(() => AppState.sprints),
      async deleteProject() {
        try {
          if (await Pop.confirm()) {
            await projectsService.deleteProject(this.project.id)
            router.push({ name: 'Home' })
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
</style>