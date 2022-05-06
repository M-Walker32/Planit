<template>
  <form @submit.prevent="createSprint">
    <div class="m-3">
      <span class="" id=""></span>
      <input
        type="text"
        class=""
        placeholder="Name your sprint"
        v-model="editable.name"
      />
    </div>
    <div>
      <button
        data-bs-dismiss="modal"
        class="button-nice mx-2"
        data-toggle="tooltip"
        data-placement="top"
        title="Cancel"
      >
        Cancel
      </button>
      <button
        class="button-nice"
        type="submit"
        data-toggle="tooltip"
        data-placement="top"
        title="Create Task"
      >
        Run
      </button>
    </div>
  </form>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { sprintsService } from "../services/SprintsService.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { useRoute } from "vue-router"
import { AppState } from "../AppState.js"
import { Modal } from "bootstrap"
export default {
  setup() {
    const editable = ref({})
    const route = useRoute()
    return {
      account: computed(() => AppState.account),
      editable,
      async createSprint() {
        try {
          editable.value.projectId = route.params.projectId
          editable.value.creatorId = this.account.id
          await sprintsService.createSprint(editable.value)
          Modal.getOrCreateInstance(document.getElementById('create-sprint-modal')).toggle()
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
</style>