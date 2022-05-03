
import { Auth0Provider } from '@bcwdev/auth0provider'
import { projectsService } from '../services/ProjectsService.js'
import BaseController from '../utils/BaseController.js'
export class ProjectsController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllProjects)
      .get('/:id', this.getById)
      // .get('/:id/sprints', this.getSprints)
      .post('', this.createProject)
      .put('/:id', this.editProject)
      .delete('/:id', this.deleteProject)
  }

  async getAllProjects(req, res, next) {
    try {
      const projects = await projectsService.getAllProjects()
      return res.send(projects)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const project = await projectsService.getProjectById(req.params.id)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async createProject(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const project = await projectsService.createProject(req.body)
      return res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async editProject(req, res, next) {
    try {
      req.body.id = req.params.id
      const project = await projectsService.editProject(req.body)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async deleteProject(req, res, next) {
    try {
      req.body.id = req.params.id
      const project = await projectsService.deleteProject(req.params.id)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }
}
