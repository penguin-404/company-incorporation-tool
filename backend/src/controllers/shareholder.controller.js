const db = require('../config/db');

// Get all shareholders for a specific company
exports.getShareholdersByCompany = async (req, res) => {
    const { companyId } = req.params;
    try {
        const result = await db.query(
            'SELECT * FROM shareholders WHERE company_id = $1',
            [companyId]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a specific shareholder
exports.deleteShareholder = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM shareholders WHERE id = $1', [id]);
        res.json({ message: "Shareholder removed successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};