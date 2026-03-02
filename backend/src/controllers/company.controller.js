const db = require('../config/db');

//Save or Update Draft
exports.saveCompany = async (req, res) => {
    const { id } = req.params;
    const { name, shareholder_count, total_capital } = req.body;
    try {
        if (id && id !== 'null' && id !== 'undefined') {
            const result = await db.query(
                `UPDATE companies SET name = $1, shareholder_count = $2, total_capital = $3 WHERE id = $4 RETURNING *`,
                [name, shareholder_count, total_capital, id]
            );
            return res.json(result.rows[0]);
        } else {
            // New companies start as 'draft'
            const result = await db.query(
                `INSERT INTO companies (name, shareholder_count, total_capital, status) VALUES ($1, $2, $3, 'draft') RETURNING *`,
                [name, shareholder_count, total_capital]
            );
            return res.status(201).json(result.rows[0]);
        }
    } catch (err) { res.status(500).json({ error: err.message }); }
};

//Add Shareholders
exports.addShareholders = async (req, res) => {
    const { id } = req.params;
    const { shareholders } = req.body;
    try {
        await db.query('BEGIN');
        // 1. Clear any old shareholders for this ID (prevents duplicates)
        await db.query('DELETE FROM shareholders WHERE company_id = $1', [id]);
        
        // 2. Insert new shareholders
        for (const s of shareholders) {
            await db.query(
                `INSERT INTO shareholders (company_id, first_name, last_name, nationality) VALUES ($1, $2, $3, $4)`,
                [id, s.first_name, s.last_name, s.nationality]
            );
        }
        
        // 3. CRITICAL: Update the status to 'completed'
        await db.query("UPDATE companies SET status = 'completed' WHERE id = $1", [id]);
        
        await db.query('COMMIT');
        res.json({ message: "Registration Finalized" });
    } catch (err) {
        await db.query('ROLLBACK');
        res.status(500).json({ error: err.message });
    }
};

//ADMIN
exports.getAllCompanies = async (req, res) => {
    try {
        const query = `
            SELECT 
                c.*, 
                (SELECT COUNT(*) FROM shareholders s WHERE s.company_id = c.id) as actual_shareholder_count,
                CASE 
                    WHEN c.status = 'completed' THEN 'completed'
                    ELSE 'draft'
                END as status_flag
            FROM companies c 
            ORDER BY c.created_at DESC`;
        const result = await db.query(query);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

//DELETE:
exports.deleteCompany = async (req, res) => {
    try {
        await db.query('DELETE FROM companies WHERE id = $1', [req.params.id]);
        res.json({ message: "Deleted" });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

//GET SINGLE
exports.getCompanyById = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM companies WHERE id = $1', [req.params.id]);
        res.json(result.rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getCompanyDetails = async (req, res) => {
    try {
        const { id } = req.params;
        
        const companyResult = await db.query('SELECT * FROM companies WHERE id = $1', [id]);
        
        if (companyResult.rows.length === 0) {
            return res.status(404).json({ error: "Company not found" });
        }

        const shareholdersResult = await db.query(
            'SELECT first_name, last_name, nationality FROM shareholders WHERE company_id = $1', 
            [id]
        );

        res.json({ 
            company: companyResult.rows[0], 
            shareholders: shareholdersResult.rows 
        });
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
};