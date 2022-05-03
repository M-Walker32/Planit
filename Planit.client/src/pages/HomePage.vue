<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="box">
          <div class="d-flex justify-content-between m-2">
            <h3>Projects Page</h3>
            <button
              type="button"
              class="btn btn-primary btn-lg"
              data-bs-toggle="modal"
              data-bs-target="#create-project-modal"
            >
              Create Project
            </button>
          </div>
          <div class="div">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Members</th>
                  <th scope="col">Started</th>
                </tr>
              </thead>
              <tbody>
                <Project v-for="p in projects" :key="p.id" :project="p" />
                <!-- Projects go here -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Modal id="create-project-modal">
    <template #modal-title-slot>
      <h4>Create Project</h4>
    </template>
    <template #modal-body-slot>
      <ProjectForm />
    </template>
    <template #modal-footy-slot>
      <div>
        <button data-bs-target="#create-project-modal" data-bs-toggle="modal">
          Cancel
        </button>
        <button @click="createProject">Launch</button>
      </div>
    </template>
  </Modal>
</template>

<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState.js"
import { onMounted } from "@vue/runtime-core"
import { projectsService } from "../services/ProjectsService.js"
export default {
  name: 'Home',
  setup() {
    onMounted(async () => {
      await projectsService.getAllProjects()
    })
    return {
      projects: computed(() => AppState.projects),
      async createProject() {
        // open modal
        const project = await projectsService.createProject()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.box {
  min-width: 80%;
  max-width: 80%;
  min-height: 80vh;
  background-color: var(--light);
  margin: 2em;
}
</style>
