import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ProjectsService {
  async getAllProjects(){
    const res = await api.get('api/projects')
    AppState.projects = res.data
    // logger.log(res.data) 
  }
  async getProjectById(projectId){
    const res = await api.get(`api/projects/${projectId}`)
    console.log(res.data)
    AppState.activeProject = res.data
  }

  async createProject(editable){
    const res = await api.post('api/projects', editable)
    AppState.projects.unshift(res.data)
    AppState.activeProject = res.data
    return res.data
  }
  async deleteProject(id){
    const res = await api.delete('api/projects/' + id)
    return res.data
  }
}

export const projectsService = new ProjectsService()