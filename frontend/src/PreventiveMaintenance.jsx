import { useEffect, useState } from "react";

const API = "http://localhost:3000";

function PreventiveMaintenance() {
  const [preventive, setPreventive] = useState([]);
  const [loading, setLoading] = useState(true);
const [showForm, setShowForm] = useState(false);

const [formData, setFormData] = useState({
  asset_code: "",
  equipment: "",
  schedule_date: "",
  technician: ""
});const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`${API}/api/preventive-maintenance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Gagal menyimpan jadwal");
    }

    alert("Jadwal berhasil disimpan");

    setShowForm(false);

    setFormData({
      asset_code: "",
      equipment: "",
      schedule_date: "",
      technician: ""
    });

    // Ambil ulang data
    window.location.reload();

 } catch (error) {
    console.error("ERROR SIMPAN JADWAL:", error);
    alert("Gagal menyimpan jadwal: " + error.message);
}
};
  useEffect(() => {
    async function loadPreventive() {
      try {
        const response = await fetch(
          `${API}/api/preventive-maintenance`
        );

        const result = await response.json();

        setPreventive(result.data || []);
      } catch (error) {
        console.error("Gagal mengambil data preventive maintenance:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPreventive();
  }, []);

  function formatDate(dateString) {
    if (!dateString) return "-";

    const date = new Date(dateString);

    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  if (loading) {
    return (
      <div className="page-loading">
        <h2>HEMIS</h2>
        <p>Loading preventive maintenance...</p>
      </div>
    );
  }

  return (
    <main className="main">
      <header className="topbar">
        <div>
          <h1>Preventive Maintenance</h1>
          <p>
            HEMIS - Equipment Maintenance Information System
          </p>
        </div>

        <div className="user-info">
          <span>Admin HEMIS</span>
          <div className="avatar">A</div>
        </div>
      </header>

      <section className="section">
        <div className="section-header">
          <div>
            <h2>Preventive Maintenance Schedule</h2>
            <p>
              Jadwal preventive maintenance heavy equipment
            </p>
          </div>

         <button
  className="primary-button"
  onClick={() => setShowForm(true)}
>
  + Tambah Jadwal
</button>

        </div>
{showForm && (
  <div className="pm-form">
    <h3>Tambah Jadwal Preventive Maintenance</h3>

    <input
  type="text"
  placeholder="Asset Code"
  value={formData.asset_code}
  onChange={(e) =>
    setFormData({ ...formData, asset_code: e.target.value })
  }
/>

<input
  type="text"
  placeholder="Equipment"
  value={formData.equipment}
  onChange={(e) =>
    setFormData({ ...formData, equipment: e.target.value })
  }
/>

<input
  type="date"
  value={formData.schedule_date}
  onChange={(e) =>
    setFormData({ ...formData, schedule_date: e.target.value })
  }
/>

<input
  type="text"
  placeholder="Technician"
  value={formData.technician}
  onChange={(e) =>
    setFormData({ ...formData, technician: e.target.value })
  }
/>

<button type="button" onClick={handleSubmit}>
  Simpan Jadwal
</button>

  </div>
)}
        <div className="pm-summary">
          <div className="pm-summary-card">
            <span>Total Schedule</span>
            <strong>{preventive.length}</strong>
          </div>

          <div className="pm-summary-card">
            <span>Scheduled</span>
            <strong>
              {
                preventive.filter(
                  (pm) => pm.status === "Scheduled"
                ).length
              }
            </strong>
          </div>

          <div className="pm-summary-card">
            <span>Completed</span>
            <strong>
              {
                preventive.filter(
                  (pm) => pm.status === "Completed"
                ).length
              }
            </strong>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Asset Code</th>
                <th>Equipment</th>
                <th>Schedule Date</th>
                <th>Technician</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {preventive.map((pm) => (
                <tr key={pm.id}>
                  <td>{pm.id}</td>

                  <td>
                    <strong className="asset-code">
                      {pm.asset_code}
                    </strong>
                  </td>

                  <td>{pm.asset_name}</td>

                  <td>
                    {formatDate(pm.schedule_date)}
                  </td>

                  <td>
                    {pm.technician_name}
                  </td>

                  <td>
                    <span
                      className={`badge status-${pm.status
                        ?.toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {pm.status}
                    </span>
                  </td>

                  <td>
                    <div className="action-buttons">
                      <button className="detail-button">
                        Detail
                      </button>

                      <button className="edit-button">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default PreventiveMaintenance;