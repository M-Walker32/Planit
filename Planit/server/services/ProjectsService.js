import { dbContext } from "../db/DbContext.js"

class ProjectsService {
  async getAll() {
    return await dbContext.Projects.find({}).populate('creator')
  }

}

export const projectsService = new ProjectsService()