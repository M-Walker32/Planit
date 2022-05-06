<template>
  <div class="d-flex justify-content-between m-2">
    <div class="align-items-center">
      <label class="visually-hidden" :for="'task-complete'+task.id">check complete</label>
      <input
        type="checkbox"
        :id="'task-complete'+task.id"
        :checked="task.isComplete"
        @click="toggleComplete"
        class="mx-2"
      />
      <span>{{ task.name }}</span>
      <i
        class="mdi mdi-delete-outline selectable on-hover"
        title="Delete Task"
        @click="deleteTask"
      ></i>
    </div>
    <div>
      <div class="dropdown">
        <button
          class="button-nice dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          aria-label="change this task's sprint"
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
        <div class="d-flex justify-content-end">
          <div>
            <span>{{ numNotes }}</span>
            <i
              class="mdi mdi-note selectable text-primary"
              data-bs-toggle="offcanvas"
              title="View notes"
              :data-bs-target="'#task-details-' + task.id"
            ></i>
          </div>
          <div class="mx-2">
            <span>{{ task.weight }}</span>
            <i class="mdi mdi-weight text-dark" title="Task Weight"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  <hr />
  <OffCanvas :id="'task-details-' + task.id" class="offcanvas offcanvas-end bg-light">
    <template #offcanvas-header-slot >
      {{ task.sprint.name }}
    </template>
    <template #offcanvas-task-slot>
      <h6><strong>Status</strong></h6>
      <div class="d-flex justify-content-center">
        <div :class="'me-2 indicator rounded p-2' + (task.isComplete ? '' : ' bg-danger')">
          <span>Pending</span>
        </div>
          <hr class="dash">
        <div :class="'ms-2 indicator rounded p-2' + (task.isComplete ? ' bg-success' : '')">
          <span>Done</span>
        </div>
      </div>
      
      <!-- notes go here -->
    </template>
    <template #offcanvas-note-slot>
      <div class="d-flex justify-content-center">
      <h5><strong>Notes</strong></h5>
      </div>
      <hr class="mb-3">
      <h5><label for="add-note-input">Add a note</label></h5>
      <form @submit.prevent="createNote">
        <input
          name="add-note-input"
          class="w-75"
          type="text"
          v-model="editable.body"
          placeholder="create a new note"
        />
        <button type="submit" title="create note" class="button-nice">+</button>
      </form>
      
      <Note v-for="n in notes" :key="n.id" :note="n" />
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
          if(!editable.value.body){
            Pop.toast('Please provide a body for your note')
            return
          }
          editable.value.taskId = props.task.id
          editable.value.projectId = route.params.projectId
          editable.value.creatorId = this.account.id
          await notesService.createNote(editable.value)
          editable.value = {}
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
.indicator{
  // min-height: 3rem;
  // min-width: 5rem;
}
.dash{
  min-height: 2px;
  min-width: 25%;
}
</style>