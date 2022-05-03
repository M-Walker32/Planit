
<template>
  <tr class="selectable bg-grey" @click="goToProject">
    <td>{{ project.name }}</td>
    <td><img src="" alt="" /><img src="" alt="" /><img src="" alt="" /></td>
    <td>{{ new Date(project.createdAt).toString() }}</td>
  </tr>
</template>


<script>
import { useRouter } from "vue-router"
// TODO format data object
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
      goToProject() {
        router.push({ name: 'ProjectPage', params: { projectId: props.project.id } })
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>