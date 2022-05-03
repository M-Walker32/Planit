import mongoose from 'mongoose'
const Schema = mongoose.Schema
export const NoteSchema = new Schema({
  body: { type: String, required: true },
  taskId: { type: Schema.Types.ObjectId, default: '', required: true, ref: 'Task' },
  projectId: { type: Schema.Types.ObjectId, default: '', required: true, ref: 'Project' },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
},
{ timestamps: true, toJSON: { virtuals: true } })

NoteSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
