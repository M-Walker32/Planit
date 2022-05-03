import { dbContext } from '../db/DbContext.js'

class SprintsService {
  async getSprintsByProject(projectId) {
    const sprints = await dbContext.Sprints.find({ projectId }).populate('creator')
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
