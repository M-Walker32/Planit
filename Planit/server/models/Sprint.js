import mongoose from 'mongoose'
const Schema = mongoose.Schema
export const SprintSchema = new Schema({
  name: { type: String, required: true },
  projectId: { type: Schema.Types.ObjectId, required: true, ref: 'Project' },
  isOpen: { type: Boolean, default: true },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
},
{ timestamps: true, toJSON: { virtuals: true } })

SprintSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
