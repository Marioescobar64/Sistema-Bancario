'use strict';

import mongoose from 'mongoose';

const transferenciaSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'El nombre completo del titular es obligatorio'],
        trim: true,
        maxLength: [100, 'El nombre del titular no puede tener más de 100 caracteres']
    },
    accountNumber: {
        type: String,
        required: [true, 'El número de cuenta es obligatorio'],
        trim: true
    },
    accountType: {
        type: String,
        required: [true, 'El tipo de cuenta es obligatorio'],
        // enum nos sirve para aceptar únicamente estas dos opciones exactas
        enum: {
            values: ['Monetaria', 'Ahorro'],
            message: '{VALUE} no es un tipo de cuenta válido, debe ser Monetaria o Ahorro'
        }
    },
    amount: {
        type: Number,
        required: [true, 'El monto a enviar es obligatorio'],
        // El monto mínimo a enviar debe ser mayor a 0
        min: [0.01, 'El monto a enviar no puede ser 0 o negativo']
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Índices para hacer las búsquedas más rápidas en la base de datos
transferenciaSchema.index({ isActive: 1 });
transferenciaSchema.index({ fullName: 1 });
transferenciaSchema.index({ accountNumber: 1 });

// Exportamos el modelo con el nombre 'Transferencia'
export default mongoose.model('Transferencia', transferenciaSchema);