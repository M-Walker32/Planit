import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService.js'
import BaseController from '../utils/BaseController.js'

export class NotesController extends BaseController {
  constructor() {
    super('api/projects/')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:projectId/notes/', this.getNotesByProject)
      .get('/:taskId/notes', this.getNotesByTask)
      .get('/:projectId/notes/:id', this.getNoteById)
      .post('/:projectId/notes/', this.createNote)
      .delete('/:projectId/notes/:id', this.removeNote)
  }

  async getNotesByProject(req, res, next) {
    try {
      const notes = await notesService.getNotesByProject(req.params.projectId)
      res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async getNotesByTask(req, res, next) {
    try {
      const notes = await notesService.getNotesByTask(req.params.taskId)
      res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async getNoteById(req, res, next) {
    try {
      const note = await notesService.getNoteById(req.params.id)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async createNote(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.projectId = req.params.projectId
      const note = await notesService.createNote(req.body)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async removeNote(req, res, next) {
    try {
      const note = await notesService.removeNote(req.params.id)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }
}
