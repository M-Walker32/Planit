import { Auth0Provider } from '@bcwdev/auth0provider'
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
      .delete('/:id', this.remove)
  }

  getAll(req, res, next) {
  try {
    
  } catch (error) {
    next(error)
  }  }

  getById(areq, res, next) {
    try {
      
    } catch (error) {
      next(error)
    } }

  getSprints(arg0req, res, next) {
    try {
      
    } catch (error) {
      next(error)
    } }

  create(req, res, next) {
  try {
    
  } catch (error) {
    next(error)
  }  }
  remove(req, res, next) {
    try {
      
    } catch (error) {
      next(error)
    }  }
  
}