
<template>
  <tr
    class="selectable bg-secondary lighten-20"
    data-toggle="tooltip"
    data-placement="top"
    :title="project.name + ' Page'"
    @click="goToProject"
  >
    <td>{{ project.name }}</td>
    <td>
      <img class="profile-img rounded" :src="account.picture" alt="" />
    </td>
    <td>{{ new Date(project.createdAt).toDateString() }}</td>
  </tr>
</template>


<script>
import { computed } from "@vue/reactivity"
import { useRouter } from "vue-router"
import { AppState } from "../AppState.js"
import { Offcanvas } from "bootstrap"
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    return {
      account: computed(() => AppState.account),
      async goToProject() {
        AppState.activeProject = AppState.projects.filter(p => props.project.id === p.id)
        router.replace({ name: 'ProjectPage', params: { projectId: props.project.id }, replace: true })
      }
    }
  }
}
</script>


<style lang="scss" scoped>
tr {
  font-family: "Exo", Arial, Helvetica, sans-serif, sans-serif;
}
td {
  color: var(--dark);
  font-family: "Exo", Arial, Helvetica, sans-serif, sans-serif;
}
.profile-img {
  max-width: 40px;
  height: auto;
}
</style>