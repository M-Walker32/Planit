<template>
  <div
    class="
      d-flex
      my-2
      bg-dark
      rounded
      p-3
      col-md-12
      align-self-center
      justify-content-between
    "
  >
    <div class="d-flex p-2 align-items-center text-wrap">
      <i class="m-2 mdi mdi-account-cowboy-hat"></i>
      <h3 class="m-2 text-light">{{ sprint.name }}</h3>
      <button
        @click="deleteSprint"
        class="button-nice on-hover mx-2"
        data-toggle="tooltip"
        data-placement="top"
        title="Delete Sprint"
      >
        Delete
      </button>
    </div>
    <div class="p-2 d-flex align-items-center">
      <span>{{ totalWeight }}</span>
      <i class="mdi mdi-weight-lifter"></i>
    </div>
    <div class="d-flex align-items-center">
      <button
        class="button-nice mx-2"
        data-toggle="tooltip"
        data-placement="top"
        title="Create Task"
        data-bs-toggle="modal"
        :data-bs-target="'#create-task-modal-' + sprint.id"
      >
        +
      </button>
      <h5 class="align-items-bottom">
        {{ completedTasks }} / {{ totalTasks }}
      </h5>
    </div>
  </div>
  <Task v-for="task in tasks" :key="task.id" :task="task" />

  <Modal :id="'create-task-modal-' + sprint.id">
    <template #modal-title-slot>
      <h5>{{ sprint.name }} > Create Task</h5>
    </template>
    <template #modal-body-slot>
      <TaskForm :sprint="sprint" />
    </template>
  </Modal>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { AppState } from "../AppState.js"
import { sprintsService } from "../services/SprintsService.js"
import { watchEffect } from "@vue/runtime-core"
export default {
  props: {
    sprint: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    let totalWeight = ref(0)
    watchEffect(() => {
      let calc = 0
      let tasks = AppState.tasks.filter(t => t.sprintId == props.sprint.id)
      tasks.forEach(t => {
        calc += t.weight
      })
      totalWeight.value = calc
    })
    let completedTasks = ref(0)
    let totalTasks = ref(0)
    watchEffect(() => {
      let tasks = AppState.tasks.filter(t => t.sprintId == props.sprint.id)
      totalTasks.value = tasks.length
      completedTasks.value = tasks.filter(t => t.isComplete == true).length
    })
    return {
      totalWeight,
      completedTasks,
      totalTasks,
      activeProject: computed(() => AppState.activeProject),
      tasks: computed(() => AppState.tasks.filter(t => t.sprintId == props.sprint.id)
      ),
      async deleteSprint() {
        try {
          if (await Pop.confirm()) {
            const sprint = await sprintsService.deleteSprint(this.activeProject.id, props.sprint.id)
            Pop.toast('Deleted!')
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
    }
  }
}
</script>


<style lang="scss" scoped>
</style>