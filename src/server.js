const express = require("express");
const app = express();
// Use Azure's port if available, otherwise default to 3000
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Mock database of customers
const customers = {
    "Alice": { status: "Active" },
    "Bob": { status: "Inactive" },
    "Charlie": { status: "Pending" }
};

// Endpoint to get customer status (GET method)
app.get("/customer-status", (req, res) => {
    const name = req.query.name;
    if (!name) {
        return res.status(400).json({ error: "Customer name is required" });
    }

    const customer = customers[name];
    if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
    }

    res.json({ name, status: customer.status });
});

// Endpoint to get customer status (POST method)
app.post("/customer-status", (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: "Customer name is required" });
    }

    const customer = customers[name];
    if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
    }

    res.json({ name, status: customer.status });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
