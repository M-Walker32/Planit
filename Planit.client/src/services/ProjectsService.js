import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"

class ProjectsService {
  async getAllProjects(){
    const res = await api.get('api/projects')
    AppState.projects = res.data
  }
  async getProjectById(projectId){
    const res = await api.get(`api/projects/${projectId}`)
    AppState.activeProject = res.data
  }

  async createProject(editable){
    const res = await api.post('api/projects', editable)
    AppState.projects.unshift(res.data)
    AppState.activeProject = res.data
    return res.data
  }
  async deleteProject(id){
    await api.delete('api/projects/' + id)
    AppState.projects = AppState.projects(p => p.id !== id)
  }
}

export const projectsService = new ProjectsService()