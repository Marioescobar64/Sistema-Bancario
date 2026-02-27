'use strict';

import mongoose from 'mongoose';

const movimientosSospechososSchema = new mongoose.Schema({
    transaccion: {
        type: String, // Usamos texto por si el número de transacción tiene letras o símbolos
        required: [true, 'El número o ID de la transacción es obligatorio'],
        trim: true
    },
    tipoAlerta: {
        type: String,
        required: [true, 'El tipo de alerta es obligatorio'],
        trim: true
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción del movimiento sospechoso es obligatoria'],
        trim: true
    },
    fecha: {
        type: Date,
        // Si no mandas una fecha, pone la fecha y hora exacta en la que se creó
        default: Date.now, 
        required: [true, 'La fecha es obligatoria']
    },
    revisada: {
        type: Boolean,
        // Por defecto empieza en falso, ya que una alerta nueva no está revisada aún
        default: false 
    }
}, {
    // Esto agrega automáticamente la fecha de creación y de modificación
    timestamps: true 
});

// Ayuda a que las búsquedas en la base de datos sean más rápidas
movimientosSospechososSchema.index({ revisada: 1 });
movimientosSospechososSchema.index({ tipoAlerta: 1 });

// Exportamos el modelo
export default mongoose.model('MovimientoSospechoso', movimientosSospechososSchema);