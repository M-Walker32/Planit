<template>
  <div class="d-flex justify-content-between m-2">
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
    <div class="d-flex justify-content-between">
      <div>
        <span>{{ numNotes }}</span>
        <i
          class="mdi mdi-note selectable text-primary darken-10"
          data-bs-toggle="offcanvas"
          :data-bs-target="'#task-details-' + task.id"
        ></i>
      </div>
      <div>
        <span>{{ task.weight }}</span>
        <i class="mdi mdi-weight text-primary darken-10"></i>
      </div>
    </div>
    <div>
      <div class="dropdown">
        <button
          class="button-nice dropdown-toggle"
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
  <hr />
  <OffCanvas :id="'task-details-' + task.id" class="offcanvas offcanvas-end">
    <template #offcanvas-header-slot>
      {{ task.sprint.name }}
    </template>
    <template #offcanvas-task-slot>
      <!-- task deeets -->
      im a task
    </template>
    <template #offcanvas-note-slot>
      <label for="add-note-input">Add a note</label>
      <form @submit.prevent="createNote">
        <input
          name="add-note-input"
          type="text"
          v-model="editable.body"
          placeholder="say sumthin"
        />
        <button type="submit" class="button-nice">+</button>
      </form>
      <Note v-for="n in notes" :key="n.id" :note="n" />
      <!-- notes go here -->
    </template>
  </OffCanvas>
</template>


<script>
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { tasksService } from "../services/TasksService.js"
import { useRoute } from "vue-router"
import { computed, ref } from "@vue/reactivity"
import { AppState } from "../AppState.js"
import { applyStyles } from "@popperjs/core"
import { notesService } from "../services/NotesService.js"
import { watchEffect } from "@vue/runtime-core"
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const editable = ref({})
    const route = useRoute()
    let numNotes = ref(0)
    watchEffect(() => {
      numNotes.value = AppState.notes.filter(n => n.taskId === props.task.id).length
    })
    return {
      numNotes,
      editable,
      sprints: computed(() => AppState.sprints),
      notes: computed(() => AppState.notes.filter(n => n.taskId == props.task.id)),
      account: computed(() => AppState.account),
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
      },
      async createNote() {
        try {
          editable.value.taskId = props.task.id
          editable.value.projectId = route.params.projectId
          editable.value.creatorId = this.account.id
          await notesService.createNote(editable.value)
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