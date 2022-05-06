<template>
  <form @submit.prevent="createProject">
    <div class="mb-3">
      <label for="project-name" class="visually-hidden">Add project name</label>
      <input
      name="project-name"
        type="text"
        class=""
        placeholder="Name your project"
        v-model="editable.name"
      />
    </div>
    <div class="mb-3">
      <label for="project-description" class="visually-hidden">Add description</label>
      <input
        name="project-description"
        type="text"
        class=""
        placeholder="Give it a description"
        v-model="editable.description"
      />
    </div>
    <div class="d-flex justify-content-end">
      <button class="button-nice" data-bs-dismiss="modal">Cancel</button>
      <button class="ms-2 button-nice" type="submit">Launch</button>
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