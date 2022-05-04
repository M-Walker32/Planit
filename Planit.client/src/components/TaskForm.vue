<template>
  <form :id="'create-task-' + sprint.id" @submit.prevent="createTask">
    <div class="mb-3">
      <span class="" id=""></span>
      <input
        type="text"
        class=""
        placeholder="Name your task"
        v-model="editable.name"
      />
    </div>
    <div class="mb-3">
      <span class="" id=""></span>
      <input
        type="number"
        class=""
        placeholder="Task weight"
        v-model="editable.weight"
      />
    </div>
  </form>
  <div>
    <button data-bs-dismiss="modal">Cancel</button>
    <button :form="'create-task-' + sprint.id" type="submit">Launch</button>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import Pop from "../utils/Pop.js"
import { logger } from "../utils/Logger.js"
import { tasksService } from "../services/TasksService.js"
import { useRoute } from "vue-router"
import { AppState } from "../AppState.js"
import { Modal } from "bootstrap"
export default {
  props: {
    sprint: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const editable = ref({})
    const route = useRoute()
    return {
      editable,
      account: computed(() => AppState.account),
      async createTask() {
        try {
          editable.value.projectId = route.params.projectId
          editable.value.sprintId = props.sprint.id
          editable.value.isComplete = false
          editable.value.creatorId = this.account.id
          await tasksService.createTask(editable.value)
          Modal.getOrCreateInstance(document.getElementById(`create-task-modal-${props.sprint.id}`)).toggle()
          editable.value = ''
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