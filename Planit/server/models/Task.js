import mongoose from 'mongoose'
const Schema = mongoose.Schema
export const TaskSchema = new Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
  projectId: { type: Schema.Types.ObjectId, required: true, ref: 'Project' },
  sprintId: { type: Schema.Types.ObjectId, required: true, ref: 'Sprint' },
  isComplete: { type: Boolean, default: false, required: true },
  completedOn: { type: Date },
  assignedTo: { type: Schema.Types.ObjectId },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
},
{ timestamps: true, toJSON: { virtuals: true } })

TaskSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
TaskSchema.virtual('sprint', {
  localField: 'sprintId',
  ref: 'Sprint',
  foreignField: '_id',
  justOne: true
})
TaskSchema.virtual('project', {
  localField: 'projectId',
  ref: 'Project',
  foreignField: '_id',
  justOne: true
})
