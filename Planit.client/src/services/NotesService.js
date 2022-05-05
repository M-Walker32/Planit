import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class NotesService{
  async getNotesByProject(projectId){
    const res = await api.get(`api/projects/${projectId}/notes`)
    logger.log(res.data)
    AppState.notes = res.data
  }
  async createNote(data){
    const res = await api.post(`api/projects/${data.projectId}/notes`, data)
    logger.log(res.data)
    AppState.notes.unshift(res.data)
  }
  async deleteNote(note){
    const res = await api.delete(`api/projects/${note.projectId}/notes/${note.id}`)
    logger.log(res.data)
    AppState.notes = AppState.notes.filter(n => n.id !== note.id)
  }
  // async getNotesByTask(task){
  //   const res = await api.get(`api/projects/${projectId}/notes`)
  //   logger.log(res.data)
  //   AppState.notes = res.data
  // }

}
export const notesService = new NotesService()