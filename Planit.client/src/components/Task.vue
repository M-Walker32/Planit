<template>
  <div class="d-flex justify-content-around m-2">
    <div>
      <input
        type="checkbox"
        name=""
        id=""
        :checked="task.isComplete"
        @click="toggleComplete"
      />
      <span>{{ task.name }}</span>
      <i class="mdi mdi-delete-outline" @click="deleteTask"></i>
    </div>
    <div class="d-flex justify-content-around">
      <div>
        <span># notes</span>
        <i class="mdi mdi-note"></i>
      </div>
      <div>
        <span>{{ task.weight }}</span>
        <i class="mdi mdi-weight"></i>
      </div>
    </div>
    <div>
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Select Sprint
        </button>
        <ul
          v-for="s in sprints"
          :key="s.id"
          class="dropdown-menu"
          aria-labelledby="dropdownMenuButton1"
        >
          <div v-for="s in sprints" :key="s.id">
            <!-- REVIEW -->
            <li v-if="s.id !== s.sprintId">
              <a class="dropdown-item" @click.prevent="changeSprint(s.id)">{{
                s.name
              }}</a>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { tasksService } from "../services/TasksService.js"
import { useRoute } from "vue-router"
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState.js"
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    return {
      sprints: computed(() => AppState.sprints),
      async deleteTask() {
        try {
          if (await Pop.confirm()) {
            await tasksService.removeTask(route.params.projectId, props.task.id)
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async toggleComplete() {
        try {
          await tasksService.toggleComplete(props.task)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async changeSprint(sprintId) {
        try {
          await tasksService.changeSprint(props.task, sprintId)
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