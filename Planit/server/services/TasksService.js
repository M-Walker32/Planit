import { dbContext } from '../db/DbContext.js'
import { BadRequest } from '../utils/Errors.js'

class TasksService {
  async createTask(body) {
    const task = await dbContext.Tasks.create(body)
    await task.populate('creator')
    await task.populate('project')
    await task.populate('sprint')
    return task
  }

  async getTasksByProject(projectId) {
  //  will this work?
    return await dbContext.Tasks.find({ projectId }).populate('creator').populate('project')
  }

  async getTaskById(id) {
    return await dbContext.Tasks.findById(id)
  }

  async editTask(update) {
    const original = await this.getTaskById(update.id)
    if (!original) {
      throw new BadRequest("Couldn't find that task")
    }
    original.name = update.name || original.name
    original.isComplete = update.isComplete == null ? original.isComplete : update.isComplete
    original.completedOn = update.completedOn || original.completedOn
    original.assignedTo = update.assignedTo || original.assignedTo
    original.sprintId = update.sprintId || original.sprintId
    // not done body MAD! this is difficult to think bleh
    await original.save()
    return original
  }

  async removeTask(id) {
    return await dbContext.Tasks.findByIdAndDelete(id)
  }
}
export const tasksService = new TasksService()
