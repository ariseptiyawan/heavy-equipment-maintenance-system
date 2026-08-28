const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
pool.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Database connected:", result.rows[0]);
  }
});
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "HEMIS Backend API is running"
    });
});
app.get("/api/assets", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                a.id,
                a.asset_code,
                a.asset_name,
                c.category_name,
                a.serial_number,
                a.location,
                a.status
            FROM assets a
            LEFT JOIN asset_categories c
                ON a.category_id = c.id
            ORDER BY a.id
        `);

        res.json({
            success: true,
            data: result.rows
        });
    } catch (error) {
        console.error("Failed to get assets:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to get assets"
        });
    }
});

app.get("/api/v1/health", (req, res) => {
    res.json({
        success: true,
        system: "HEMIS",
        status: "healthy"
    });
});
app.get("/api/preventive-maintenance", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        pm.id,
        pm.asset_id,
        a.asset_code,
        a.asset_name,
        pm.schedule_date,
        pm.status,
        pm.technician_id,
        u.name AS technician_name
      FROM preventive_maintenance pm
      LEFT JOIN assets a ON pm.asset_id = a.id
      LEFT JOIN users u ON pm.technician_id = u.id
      ORDER BY pm.schedule_date ASC
    `);

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch preventive maintenance"
    });
  }
});

app.get("/api/work-orders", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        wo.id,
        wo.wo_number,
        wo.asset_id,
        a.asset_code,
        a.asset_name,
        wo.technician_id,
        u.name AS technician_name,
        wo.priority,
        wo.status
      FROM work_orders wo
      LEFT JOIN assets a ON wo.asset_id = a.id
      LEFT JOIN users u ON wo.technician_id = u.id
      ORDER BY wo.id DESC
    `);

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch work orders"
    });
  }
});
app.post("/api/preventive-maintenance", async (req, res) => {
  try {
    const {
      asset_code,
      equipment,
      schedule_date,
      technician
    } = req.body;

    // Validasi data
    if (!asset_code || !schedule_date || !technician) {
      return res.status(400).json({
        success: false,
        message: "Asset Code, tanggal, dan technician wajib diisi"
      });
    }

    // Cari asset berdasarkan asset_code
    const assetResult = await pool.query(
      `
      SELECT id, asset_code, asset_name
      FROM assets
      WHERE asset_code = $1
      `,
      [asset_code]
    );

    if (assetResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Asset ${asset_code} tidak ditemukan`
      });
    }

    const asset = assetResult.rows[0];

    // Cari technician berdasarkan nama
    const technicianResult = await pool.query(
      `
      SELECT id, name
      FROM users
      WHERE name = $1
      LIMIT 1
      `,
      [technician]
    );

    if (technicianResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Technician ${technician} tidak ditemukan`
      });
    }

    const technicianUser = technicianResult.rows[0];

    // Simpan preventive maintenance
    const result = await pool.query(
      `
      INSERT INTO preventive_maintenance
        (asset_id, schedule_date, status, technician_id)
      VALUES
        ($1, $2, 'Scheduled', $3)
      RETURNING *
      `,
      [
        asset.id,
        schedule_date,
        technicianUser.id
      ]
    );

    res.status(201).json({
      success: true,
      message: "Jadwal berhasil disimpan",
      data: result.rows[0]
    });

  } catch (error) {
    console.error("Error menyimpan preventive maintenance:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});
app.listen(PORT, () => {
    console.log(`HEMIS Backend running at http://localhost:${PORT}`);
});