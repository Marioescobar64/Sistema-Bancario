'use strict';

import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  action: {
    type: String,
    required: true
  },

  module: {
    type: String,
    required: true
  },

  details: {
    type: String
  }

}, {
  timestamps: true
});

auditLogSchema.index({ user: 1 });
auditLogSchema.index({ module: 1 });

export default mongoose.model('AuditLog', auditLogSchema);