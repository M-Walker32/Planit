<template>
  <div class="container">
    <div class="row my-4 bg-grey rounded p-3 m-2">
      <div class="col-2 align-items-center">
        <img :src="note.creator.picture" class="img-fluid rounded-circle" />
      </div>
      <div class="col-10 align-items-center">
        <div class="d-flex">
          <h5 class="text-primary font-weight-bold">{{ note.creator.name }}</h5>
          <i
            class="m-1 mdi mdi-delete-outline on-hover"
            title="Delete note"
            @click="deleteNote"
          ></i>
        </div>
        <p class="m-1 p-0">{{ note.body }}</p>
      </div>
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
</style>