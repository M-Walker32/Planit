import { AppState } from "../AppState.js";
import { api } from "./AxiosService.js";

class SprintsService {
  async getSprintsByProject(projectId){
    const res = await api.get(`api/projects/${projectId}/sprints`)
    AppState.sprints = res.data
  }
  async deleteSprint(projectId, id){
    console.log(id)
    await api.delete(`/api/projects/${projectId}/sprints/${id}`)
  }
}

export const sprintsService = new SprintsService();