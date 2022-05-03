import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { ProjectSchema } from '../models/Project.js'
import { SprintSchema } from '../models/Sprint.js'
import { TaskSchema } from '../models/Task.js'
import { NoteSchema } from '../models/Note.js'

class DbContext {
  Values = mongoose.model('Value', ValueSchema)
  Account = mongoose.model('Account', AccountSchema)
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts')
  Projects = mongoose.model('Project', ProjectSchema, 'projects')
  Sprints = mongoose.model('Sprint', SprintSchema, 'sprints')
  Tasks = mongoose.model('Task', TaskSchema, 'tasks')
  Notes = mongoose.model('Note', NoteSchema, 'notes')
}

export const dbContext = new DbContext()
