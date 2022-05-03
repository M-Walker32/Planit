import { Auth0Provider } from '@bcwdev/auth0provider'
import { tasksService } from '../services/TasksService.js'
import BaseController from '../utils/BaseController.js'

export class TasksController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:projectId/tasks', this.getTasksByProject)
      .get('/:projectId/tasks/:id', this.getTasksById)
      .post('/:projectId/tasks', this.createTask)
      .put('/:projectId/tasks/:id', this.editTask)
      .delete('/:projectId/tasks/:id', this.removeTask)
  }

  async getTasksByProject(req, res, next) {
    try {
      const tasks = await tasksService.getTasksByProject(req.params.projectId)
      res.send(tasks)
    } catch (error) {
      next(error)
    }
  }

  async getTasksById(req, res, next) {
    try {
      const task = await tasksService.getTaskById(req.params.id)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async createTask(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.projectId = req.params.projectId
      const task = await tasksService.createTask(req.body)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async editTask(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.id
      req.body.projectId = req.params.projectId
      const task = await tasksService.editTask(req.body)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async removeTask(req, res, next) {
    try {
      const task = await tasksService.removeTask(req.params.id)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }
}
