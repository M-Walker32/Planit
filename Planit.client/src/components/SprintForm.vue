<template>
  <form @submit.prevent="createSprint">
    <div class="mb-3">
      <span class="" id=""></span>
      <input
        type="text"
        class=""
        placeholder="Name your sprint"
        v-model="editable.name"
      />
    </div>
    <div>
      <button data-bs-dismiss="modal">Cancel</button>
      <button type="submit">Run</button>
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