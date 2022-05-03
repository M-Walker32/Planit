import { dbContext } from '../db/DbContext.js'
import { BadRequest } from '../utils/Errors.js'

class ProjectsService {
  async getAllProjects() {
    return await dbContext.Projects.find({}).populate('creator')
  }

  async getProjectById(id) {
    const project = await dbContext.Projects.findById(id)
    return project
  }

  async createProject(body) {
    const project = await dbContext.Projects.create(body)
    await project.populate('creator')
    return project
  }

  async editProject(original) {
    const update = await this.getProjectById(original.id)
    original.name = update.name || original.name
    original.description = update.description || original.description
    await original.save()
    return original
  }

  async deleteProject(id) {
    const found = await this.getProjectById(id)
    if (found) {
      const project = await dbContext.Projects.findByIdAndDelete(id)
      return project
    } else {
      throw new BadRequest("Coulnd't find that project")
    }
  }
}

export const projectsService = new ProjectsService()
