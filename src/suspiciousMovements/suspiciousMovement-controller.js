import SuspiciousMovement from './suspiciousMovement-model.js';

export const getSuspiciousMovements = async (req, res) => {
  try {
    const { page = 1, limit = 10, revisada, tipoAlerta } = req.query;

    const filter = {};

    if (revisada !== undefined) {
      filter.revisada = revisada;
    }

    if (tipoAlerta) {
      filter.tipoAlerta = { $regex: tipoAlerta, $options: 'i' };
    }

    const movements = await SuspiciousMovement.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await SuspiciousMovement.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: movements,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalRecords: total,
        limit: Number(limit),
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting suspicious movements',
      error: error.message,
    });
  }
};

export const getSuspiciousMovementById = async (req, res) => {
  try {
    const { id } = req.params;

    const movement = await SuspiciousMovement.findById(id);

    if (!movement) {
      return res.status(404).json({
        success: false,
        message: 'Suspicious movement not found',
      });
    }

    res.status(200).json({
      success: true,
      data: movement,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting suspicious movement',
      error: error.message,
    });
  }
};

export const createSuspiciousMovement = async (req, res) => {
  try {
    const movementData = req.body;

    const movement = new SuspiciousMovement(movementData);
    await movement.save();

    res.status(201).json({
      success: true,
      message: 'Suspicious movement created successfully',
      data: movement,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating suspicious movement',
      error: error.message,
    });
  }
};

export const updateSuspiciousMovement = async (req, res) => {
  try {
    const { id } = req.params;

    const movement = await SuspiciousMovement.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!movement) {
      return res.status(404).json({
        success: false,
        message: 'Suspicious movement not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Suspicious movement updated successfully',
      data: movement,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating suspicious movement',
      error: error.message,
    });
  }
};

export const changeSuspiciousMovementStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const reviewed = req.url.includes('/review');
    const action = reviewed ? 'marked as reviewed' : 'marked as unreviewed';

    const movement = await SuspiciousMovement.findByIdAndUpdate(
      id,
      { revisada: reviewed },
      { new: true }
    );

    if (!movement) {
      return res.status(404).json({
        success: false,
        message: 'Suspicious movement not found',
      });
    }

    res.status(200).json({
      success: true,
      message: `Suspicious movement ${action}`,
      data: movement,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error changing suspicious movement status',
      error: error.message,
    });
  }
};