import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ProjectsService {
  async getAllProjects(){
    const res = await api.get('api/projects')
    AppState.projects = res.data
    // logger.log(res.data) 
  }
}

export const projectsService = new ProjectsService()