exports.validateCompany = (req, res, next) => {
    const { name, shareholder_count, total_capital } = req.body;

    if (!name || name.trim().length < 2) {
        return res.status(400).json({ error: "Company name must be at least 2 characters." });
    }
    if (!shareholder_count || shareholder_count < 1) {
        return res.status(400).json({ error: "At least 1 shareholder is required." });
    }
    if (total_capital === undefined || total_capital < 0) {
        return res.status(400).json({ error: "Total capital cannot be negative." });
    }
    next();
};

exports.validateShareholders = (req, res, next) => {
    const { shareholders } = req.body;

    if (!Array.isArray(shareholders) || shareholders.length === 0) {
        return res.status(400).json({ error: "Shareholders must be a non-empty array." });
    }

    for (const s of shareholders) {
        if (!s.first_name || !s.last_name || !s.nationality) {
            return res.status(400).json({ error: "All shareholder fields are required." });
        }
    }
    next();
};