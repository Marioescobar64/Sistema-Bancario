'use strict';

import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del rol es obligatorio'],
    enum: ['ADMIN', 'USER']
  },

  description: {
    type: String
  }

}, {
  timestamps: true
});

export default mongoose.model('Role', roleSchema);