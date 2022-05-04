import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class TasksService {
  async getTasksByProject(projectId){
    const res = await api.get(`api/projects/${projectId}/tasks`)
    AppState.tasks = res.data
  }
  async createTask(formData){
    const res = await api.post(`api/projects/${formData.projectId}/tasks/`, formData)
    logger.log(res.data)
    AppState.tasks.push(res.data)
    return res.data
  }
  async removeTask(projectId, id){
    const res = await api.delete(`api/projects/${projectId}/tasks/${id}`)
    AppState.tasks = AppState.tasks.filter(t => t.id !== id)
  }
  async toggleComplete(task){
    const editedTask = task
    editedTask.isComplete = !editedTask.isComplete
    const res = await api.put(`api/projects/${task.projectId}/tasks/${task.id}`, editedTask)
  }
  async changeSprint(task, newSprintId){
    task.sprintId = newSprintId
    const res = await api.put(`api/projects/${task.projectId}/tasks/${task.id}`, task)
    console.log(res.data)
  }
}

export const tasksService = new TasksService();