'use strict';

import User from './user-model.js';
import bcrypt from 'bcryptjs';

export const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: 'ADMIN' });

    if (adminExists) {
      console.log('Admin ya existe');
      return;
    }

    const encryptedPassword = await bcrypt.hash('Admin123', 10);

    const admin = new User({
      name: 'Administrador',
      email: 'admin@admin.com',
      password: encryptedPassword,
      role: 'ADMIN',
      isActive: true
    });

    await admin.save();

    console.log('Admin por defecto creado');

  } catch (error) {
    console.log('Error creando admin por defecto:', error.message);
  }
};