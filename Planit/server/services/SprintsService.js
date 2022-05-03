import { dbContext } from '../db/DbContext.js'

class SprintsService {
  async getAllSprints(projectId) {
    const sprints = await dbContext.Sprints.find({ projectId })
    return sprints
  }

  async getSprintById(id) {
    const sprint = await dbContext.Sprints.findById(id)
    return sprint
  }

  async getSprintsByProject(creatorId) {
    const sprints = await dbContext.Sprints.find({ creatorId })
    return sprints
  }

  async createSprint(body) {
    const sprint = await dbContext.Sprints.create(body)
    await sprint.populate('creator')
    return sprint
  }

  async removeSprint(id) {
    const sprint = await dbContext.Sprints.findByIdAndDelete(id)
    return sprint
  }
}
export const sprintsService = new SprintsService()
