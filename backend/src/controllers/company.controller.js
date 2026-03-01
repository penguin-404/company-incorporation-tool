const db = require('../config/db');

//Create or Update Company Draft
exports.createCompany = async (req, res) => {
    const { name, shareholder_count, total_capital } = req.body;
    try {
        const result = await db.query(
            `INSERT INTO companies (name, shareholder_count, total_capital) 
             VALUES ($1, $2, $3) RETURNING *`,
            [name, shareholder_count, total_capital]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Save Shareholders
exports.addShareholders = async (req, res) => {
    const { companyId } = req.params;
    const { shareholders } = req.body; // Expecting an array of objects

    try {
        // Start a Transaction (All or nothing)
        await db.query('BEGIN');

        for (const person of shareholders) {
            await db.query(
                `INSERT INTO shareholders (company_id, first_name, last_name, nationality) 
                 VALUES ($1, $2, $3, $4)`,
                [companyId, person.first_name, person.last_name, person.nationality]
            );
        }

        // Mark company as completed
        await db.query('UPDATE companies SET status = $1 WHERE id = $2', ['completed', companyId]);

        await db.query('COMMIT');
        res.status(200).json({ message: "Shareholders saved and company finalized!" });
    } catch (err) {
        await db.query('ROLLBACK');
        res.status(500).json({ error: err.message });
    }
};

//Get all companies with their shareholders
exports.getAllCompanies = async (req, res) => {
    try {
        const query = `
            SELECT c.*, 
            json_agg(s.*) AS shareholders
            FROM companies c
            LEFT JOIN shareholders s ON c.id = s.company_id
            GROUP BY c.id
        `;
        const result = await db.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};