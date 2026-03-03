import AuditLog from './auditLog-model.js';

export const getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find()
      .populate('user')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: logs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener logs',
      error: error.message,
    });
  }
};