import { applyStyles } from "@popperjs/core";
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class SprintsService {
  async getSprintsByProject(projectId){
    const res = await api.get(`api/projects/${projectId}/sprints`)
    AppState.sprints = res.data
  }
  async deleteSprint(projectId, id){
    await api.delete(`/api/projects/${projectId}/sprints/${id}`)
    AppState.sprints = AppState.sprints.filter(s => s.id !== id)
  }
  async createSprint(formData){
    const res = await api.post(`api/projects/${formData.projectId}/sprints`, formData)
    AppState.sprints.unshift(res.data)
  }
}

export const sprintsService = new SprintsService();