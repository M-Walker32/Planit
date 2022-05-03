import { dbContext } from '../db/DbContext.js'

class NotesService {
  async getNotesByProject(projectId) {
    const notes = await dbContext.Notes.find({ projectId })
    return notes
  }

  async getNotesByTask(taskId) {
    const notes = await dbContext.Notes.find({ taskId })
    return notes
  }

  async getNoteById(id) {
    const note = await dbContext.Notes.findById(id)
    return note
  }

  async createNote(body) {
    const note = await dbContext.Notes.create(body)
    await note.populate('creator')
    await note.populate('project')
    await note.populate('task')
    return note
  }

  async removeNote(id) {
    const note = await dbContext.Notes.findByIdAndDelete(id)
    return note
  }
}

export const notesService = new NotesService()
