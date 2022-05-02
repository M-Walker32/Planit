
import { Auth0Provider } from '@bcwdev/auth0provider'
import { projectsService } from "../services/ProjectsService.js"
import BaseController from '../utils/BaseController.js'
export class ProjectsController extends BaseController {
  constructor(){
    super('api/projects')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/sprints', this.getSprints)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
  try {
    const projects = await projectsService.getAll()
    return res.send(projects)
  } catch (error) {
    next(error)
  }  }

  async getById(areq, res, next) {
    try {
      
    } catch (error) {
      next(error)
    } }

  async getSprints(arg0req, res, next) {
    try {
      
    } catch (error) {
      next(error)
    } }

  async create(req, res, next) {
  try {
    
  } catch (error) {
    next(error)
  }  }

  async edit(req, res, next) {
    try {
    
    } catch (error) {
      next(error)
    } 
  }

  async remove(req, res, next) {
    try {
      
    } catch (error) {
      next(error)
    }  }
  
}