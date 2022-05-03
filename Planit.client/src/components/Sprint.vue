<template>
  <div class="d-flex">
    <div>
      <i class="mdi mdi-account-cowboy-hat"></i>
      <h3>{{ sprint.name }}</h3>
      <button @click="deleteSprint">Delete Sprint</button>
    </div>
    <div>
      <span>Sprint Weight</span>
      <i class="mdi mdi-weight-lifter"></i>
    </div>
    <div>
      <button>Add Task</button>
      <h5>1/2 Complete</h5>
    </div>
  </div>
  <div>Tasks</div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { AppState } from "../AppState.js"
import { sprintsService } from "../services/SprintsService.js"
export default {
  props: {
    sprint: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      activeProject: computed(() => AppState.activeProject),
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
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>