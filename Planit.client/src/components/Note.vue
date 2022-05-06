<template>
  <div class="container my-4 rounded bg-grey rounded p-3 ">
    <div class="d-flex  m-2">
      <div class="me-2">
        <img :src="note.creator.picture" class="img-fluid rounded-circle profile-img" />
      </div>
      <div class="d-flex">
        <div class="d-flex align-items-center">
          <h6 class="text-primary font-weight-bold mb-0">{{ note.creator.name }}</h6>
          <i
            class="m-1 mdi mdi-delete-outline selectable on-hover"
            title="Delete note"
            @click="deleteNote"
          ></i>
        </div>
      </div>
    </div>
    <div class="p-1 bg-white">
      <p class="m-1 p-0">{{ note.body }}</p>
    </div>
  </div>
</template>


<script>
import { ref, watchEffect } from "@vue/runtime-core"
import { notesService } from "../services/NotesService.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { AppState } from "../AppState.js"
export default {
  props: {
    note: {
      type: Object,
      required: true
    },
  },
  setup(props) {
    return {
      async deleteNote() {
        try {
          if (await Pop.confirm()) {
            await notesService.deleteNote(props.note)
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
.profile-img {
  max-width: 40px;
  height: auto;
}
</style>