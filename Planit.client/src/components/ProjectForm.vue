<template>
  <form @submit.prevent="createProject">
    <div class="mb-3">
      <span class="" id=""></span>
      <input
        type="text"
        class=""
        placeholder="Name your project"
        v-model="editable.name"
      />
    </div>
    <div class="mb-3">
      <span class="" id=""></span>
      <input
        type="text"
        class=""
        placeholder="Give it a description"
        v-model="editable.description"
      />
    </div>
    <div>
      <button data-bs-dismiss="modal">Cancel</button>
      <button type="submit">Launch</button>
    </div>
  </form>
</template>


<script>
import { ref } from "@vue/reactivity"
import { projectsService } from "../services/ProjectsService.js"
import Pop from "../utils/Pop.js"
import { logger } from "../utils/Logger.js"
import { Modal } from "bootstrap"
import { useRouter } from "vue-router"
export default {

  setup() {
    const router = useRouter()
    const editable = ref({})
    return {
      editable,
      async createProject() {
        // open modal
        try {
          Modal.getOrCreateInstance(document.getElementById('create-project-modal')).toggle()
          const newProject = await projectsService.createProject(editable.value)
          editable.value = ''
          router.push({ name: 'ProjectPage', params: { projectId: newProject.id } })
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
        // router.push()
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>