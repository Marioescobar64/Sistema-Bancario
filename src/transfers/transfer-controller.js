import mongoose from 'mongoose';
import Transfer from './transfer-model.js';
import Account from '../accounts/account-model.js';

export const createTransfer = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {

    const { fromAccount, toAccount, amount } = req.body;

    if (amount <= 0) {
      throw new Error('El monto debe ser mayor a 0');
    }

    const originAccount = await Account.findById(fromAccount).session(session);
    const destinationAccount = await Account.findById(toAccount).session(session);

    if (!originAccount || !destinationAccount) {
      throw new Error('Cuenta no encontrada');
    }

    if (!originAccount.isActive || !destinationAccount.isActive) {
      throw new Error('Una de las cuentas está inactiva');
    }

    if (originAccount.balance < amount) {
      throw new Error('Saldo insuficiente');
    }

    // Restar saldo
    originAccount.balance -= amount;

    // Sumar saldo
    destinationAccount.balance += amount;

    await originAccount.save({ session });
    await destinationAccount.save({ session });

    const transfer = await Transfer.create([{
      fromAccount,
      toAccount,
      amount,
      status: 'COMPLETED'
    }], { session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: 'Transferencia realizada exitosamente',
      data: transfer[0],
    });

  } catch (error) {

    await session.abortTransaction();
    session.endSession();

    res.status(400).json({
      success: false,
      message: 'Error en la transferencia',
      error: error.message,
    });
  }
};