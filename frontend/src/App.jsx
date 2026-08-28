import { useEffect, useState } from "react";
import "./App.css";
import PreventiveMaintenance from "./PreventiveMaintenance";
const API = "http://localhost:3000";

function App() {
  const [assets, setAssets] = useState([]);
  const [preventive, setPreventive] = useState([]);
  const [workOrders, setWorkOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Menu yang sedang aktif
  const [activePage, setActivePage] = useState("Dashboard");

  useEffect(() => {
    async function loadData() {
      try {
        const [assetsRes, preventiveRes, workOrdersRes] =
          await Promise.all([
            fetch(`${API}/api/assets`),
            fetch(`${API}/api/preventive-maintenance`),
            fetch(`${API}/api/work-orders`),
          ]);

        const assetsData = await assetsRes.json();
        const preventiveData = await preventiveRes.json();
        const workOrdersData = await workOrdersRes.json();

        setAssets(assetsData.data || []);
        setPreventive(preventiveData.data || []);
        setWorkOrders(workOrdersData.data || []);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const activeAssets = assets.filter(
    (asset) => asset.status === "Active"
  ).length;

  const openWorkOrders = workOrders.filter(
    (wo) => wo.status === "Open"
  ).length;

  const inProgressWorkOrders = workOrders.filter(
    (wo) => wo.status === "In Progress"
  ).length;

  const completedWorkOrders = workOrders.filter(
    (wo) => wo.status === "Completed"
  ).length;

  if (loading) {
    return (
      <div className="loading">
        <h2>HEMIS</h2>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // =========================
  // SIDEBAR
  // =========================
  const menuItems = [
    "Dashboard",
    "Equipment",
    "Preventive Maintenance",
    "Work Orders",
    "Spare Parts",
    "Inventory",
    "Purchase",
    "Notifications",
  ];

  return (
    <div className="app">

      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">

        <div className="logo">
          <div className="logo-icon">H</div>

          <div>
            <h2>HEMIS</h2>
            <span>Equipment Maintenance</span>
          </div>
        </div>

        <nav>
          {menuItems.map((item) => (
            <a
              key={item}
              className={activePage === item ? "active" : ""}
              onClick={() => setActivePage(item)}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div
            onClick={() => setActivePage("Settings")}
            style={{ cursor: "pointer" }}
          >
            ⚙️ Settings
          </div>

          <div>👤 Admin HEMIS</div>
        </div>

      </aside>

      {/* ================= MAIN ================= */}
      <main className="main">
{activePage === "Preventive Maintenance" && (
  <PreventiveMaintenance />
)}
        {/* ================================================= */}
        {/* DASHBOARD */}
        {/* ================================================= */}

        {activePage === "Dashboard" && (
          <>
            <header className="topbar">
              <div>
                <h1>Dashboard</h1>
                <p>
                  Heavy Equipment Maintenance Information System
                </p>
              </div>

              <div className="user-info">
                <span>Admin HEMIS</span>
                <div className="avatar">A</div>
              </div>
            </header>

            {/* STAT CARDS */}
            <section className="stats">

              <div className="stat-card">
                <div className="stat-icon blue">🚜</div>

                <div>
                  <span>Total Equipment</span>
                  <strong>{assets.length}</strong>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon green">✓</div>

                <div>
                  <span>Active Equipment</span>
                  <strong>{activeAssets}</strong>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon orange">🔧</div>

                <div>
                  <span>Open Work Orders</span>
                  <strong>{openWorkOrders}</strong>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon purple">📋</div>

                <div>
                  <span>Preventive Maintenance</span>
                  <strong>{preventive.length}</strong>
                </div>
              </div>

            </section>

            {/* WORK ORDER SUMMARY */}
            <section className="section">

              <div className="section-header">
                <div>
                  <h2>Work Order Overview</h2>
                  <p>Status pekerjaan maintenance saat ini</p>
                </div>
              </div>

              <div className="wo-summary">

                <div className="wo-box">
                  <span>Open</span>
                  <strong>{openWorkOrders}</strong>
                </div>

                <div className="wo-box">
                  <span>In Progress</span>
                  <strong>{inProgressWorkOrders}</strong>
                </div>

                <div className="wo-box">
                  <span>Completed</span>
                  <strong>{completedWorkOrders}</strong>
                </div>

              </div>

            </section>

            {/* EQUIPMENT */}
            <section className="section">

              <div className="section-header">

                <div>
                  <h2>Equipment</h2>
                  <p>Daftar heavy equipment terdaftar</p>
                </div>

                <button
                  onClick={() => setActivePage("Equipment")}
                >
                  Lihat Semua
                </button>

              </div>

              <div className="table-container">

                <table>

                  <thead>
                    <tr>
                      <th>Asset Code</th>
                      <th>Equipment</th>
                      <th>Category</th>
                      <th>Serial Number</th>
                      <th>Location</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>

                    {assets.map((asset) => (

                      <tr key={asset.id}>

                        <td>
                          <strong>{asset.asset_code}</strong>
                        </td>

                        <td>{asset.asset_name}</td>

                        <td>{asset.category_name}</td>

                        <td>{asset.serial_number}</td>

                        <td>{asset.location}</td>

                        <td>
                          <span className="badge active-badge">
                            {asset.status}
                          </span>
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </section>

            {/* WORK ORDERS */}
            <section className="section">

              <div className="section-header">

                <div>
                  <h2>Recent Work Orders</h2>
                  <p>Work order maintenance terbaru</p>
                </div>

                <button
                  onClick={() => setActivePage("Work Orders")}
                >
                  Lihat Semua
                </button>

              </div>

              <div className="table-container">

                <table>

                  <thead>
                    <tr>
                      <th>WO Number</th>
                      <th>Equipment</th>
                      <th>Technician</th>
                      <th>Priority</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>

                    {workOrders.map((wo) => (

                      <tr key={wo.id}>

                        <td>
                          <strong>{wo.wo_number}</strong>
                        </td>

                        <td>{wo.asset_name}</td>

                        <td>{wo.technician_name}</td>

                        <td>
                          <span
                            className={`badge ${
                              wo.priority?.toLowerCase() || ""
                            }`}
                          >
                            {wo.priority}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`badge status-${wo.status
                              ?.toLowerCase()
                              .replace(" ", "-")}`}
                          >
                            {wo.status}
                          </span>
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </section>
          </>
        )}

        {/* ================================================= */}
        {/* EQUIPMENT PAGE */}
        {/* ================================================= */}

        {activePage === "Equipment" && (
          <>
            <header className="topbar">

              <div>
                <h1>Equipment</h1>

                <p>
                  Daftar heavy equipment yang terdaftar di sistem
                </p>
              </div>

              <div className="user-info">
                <span>Admin HEMIS</span>
                <div className="avatar">A</div>
              </div>

            </header>

            {/* EQUIPMENT STAT */}
            <section className="stats">

              <div className="stat-card">

                <div className="stat-icon blue">
                  🚜
                </div>

                <div>
                  <span>Total Equipment</span>
                  <strong>{assets.length}</strong>
                </div>

              </div>

              <div className="stat-card">

                <div className="stat-icon green">
                  ✓
                </div>

                <div>
                  <span>Active</span>
                  <strong>{activeAssets}</strong>
                </div>

              </div>

            </section>

            {/* EQUIPMENT TABLE */}
            <section className="section">

              <div className="section-header">

                <div>
                  <h2>Equipment List</h2>
                  <p>
                    Data equipment dari database PostgreSQL
                  </p>
                </div>

              </div>

              <div className="table-container">

                <table>

                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Asset Code</th>
                      <th>Equipment</th>
                      <th>Category</th>
                      <th>Serial Number</th>
                      <th>Location</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>

                    {assets.map((asset) => (

                      <tr key={asset.id}>

                        <td>{asset.id}</td>

                        <td>
                          <strong>
                            {asset.asset_code}
                          </strong>
                        </td>

                        <td>
                          {asset.asset_name}
                        </td>

                        <td>
                          {asset.category_name}
                        </td>

                        <td>
                          {asset.serial_number}
                        </td>

                        <td>
                          {asset.location}
                        </td>

                        <td>

                          <span className="badge active-badge">
                            {asset.status}
                          </span>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </section>
          </>
        )}

        {/* ================================================= */}
        {/* HALAMAN SEMENTARA MENU LAIN */}
        {/* ================================================= */}

        {activePage !== "Dashboard" &&
  activePage !== "Equipment" &&
  activePage !== "Preventive Maintenance" && (
            <>
              <header className="topbar">

                <div>
                  <h1>{activePage}</h1>

                  <p>
                    HEMIS - Equipment Maintenance
                    Information System
                  </p>
                </div>

                <div className="user-info">
                  <span>Admin HEMIS</span>
                  <div className="avatar">A</div>
                </div>

              </header>

              <section className="section">

                <h2>{activePage}</h2>

                <p style={{ marginTop: "10px" }}>
                  Modul <strong>{activePage}</strong> sedang
                  dalam tahap pengembangan.
                </p>

              </section>
            </>
          )}

      </main>
    </div>
  );
}

export default App;