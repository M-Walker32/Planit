import { Auth0Provider } from '@bcwdev/auth0provider'
import { sprintsService } from '../services/SprintsService.js'
import BaseController from '../utils/BaseController.js'

export class SprintsController extends BaseController {
  constructor() {
    super('/api/projects')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:projectId/sprints', this.getAllSprints)
      .get('/:projectId/sprints/:id', this.getSprintById)
      .get('/:projectId/sprints', this.getSprintsByProject)
      .post('/:projectId/sprints', this.createSprint)
      // .edit('/:id', this.editSprint)
      .delete('/:projectId/sprints/:id', this.removeSprint)
  }

  async getAllSprints(req, res, next) {
    try {
      const sprints = await sprintsService.getAllSprints()
      res.send(sprints)
    } catch (error) {
      next(error)
    }
  }

  async getSprintById(req, res, next) {
    try {
      const sprint = await sprintsService.getSprintById(req.params.projectId)
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async getSprintsByProject(req, res, next) {
    try {
      const sprints = await sprintsService.getSprintsByProject(req.params.projectId)
      res.send(sprints)
    } catch (error) {
      next(error)
    }
  }

  async createSprint(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.projectId = req.params.projectId
      const sprint = await sprintsService.createSprint(req.body)
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async removeSprint(req, res, next) {
    try {
      req.body.id = req.params.id
      const sprint = await sprintsService.removeSprint(req.params.id)
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }
}
