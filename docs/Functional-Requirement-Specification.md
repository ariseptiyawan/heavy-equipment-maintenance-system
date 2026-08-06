# Functional Requirement Specification (FRS)

## Heavy Equipment Maintenance Intelligence System (HEMIS)

---

# 1. Introduction

Dokumen ini menjelaskan seluruh kebutuhan fungsional sistem HEMIS yang akan digunakan sebagai acuan pengembangan aplikasi.

---

# 2. User Roles

Sistem memiliki beberapa jenis pengguna:

- Administrator
- Maintenance Manager
- Planner
- Mechanic
- Warehouse Staff
- Purchasing Staff
- Management

---

# 3. Functional Requirements

## 3.1 Authentication

### Login

User dapat login menggunakan:

- Email
- Password

Sistem akan melakukan:

- Validasi akun
- Validasi password
- Redirect sesuai role

---

### Logout

User dapat keluar dari sistem.

---

## 3.2 Dashboard

Dashboard menampilkan:

- Total Asset
- Unit Available
- Unit Breakdown
- PM Due
- Open Work Order
- Critical Spare Part
- KPI Maintenance

---

## 3.3 Asset Management

User dapat:

- Menambah Asset
- Mengubah Asset
- Menghapus Asset
- Melihat Detail Asset
- Upload Foto Unit
- Riwayat Maintenance

---

## 3.4 Preventive Maintenance

Fitur:

- Jadwal PM
- Reminder PM
- Checklist PM
- Approval PM
- Riwayat PM

---

## 3.5 Corrective Maintenance

Fitur:

- Laporan Kerusakan
- Analisa Kerusakan
- Status Perbaikan
- Approval
- Close Maintenance

---

## 3.6 Work Order

Work Order memiliki:

- Nomor WO
- Tanggal
- Unit
- Teknisi
- Prioritas
- Status

Status:

- Open
- Assigned
- In Progress
- Completed
- Closed

---

## 3.7 Inventory

User dapat:

- Stock In
- Stock Out
- Transfer Spare Part
- Stock Opname
- Minimum Stock Alert

---

## 3.8 Purchasing

Fitur:

- Purchase Request
- Purchase Order
- Vendor
- Approval
- Receiving

---

## 3.9 Reporting

Laporan meliputi:

- Downtime
- MTTR
- MTBF
- PM Compliance
- Cost Maintenance
- Spare Part Usage

---

## 3.10 User Management

Administrator dapat:

- Tambah User
- Edit User
- Hapus User
- Reset Password
- Assign Role

---

## 3.11 Notification

Sistem mengirim notifikasi untuk:

- PM Due
- Work Order Baru
- Approval
- Stock Minimum

---

## 3.12 Audit Log

Semua aktivitas dicatat:

- Login
- Update Data
- Delete
- Approval

---

# 4. Non Functional Requirements

## Performance

- Response < 3 detik

## Availability

- 99.9%

## Security

- HTTPS
- JWT Authentication
- Role Based Access Control

## Backup

- Backup harian

---

# 5. Future Features

- AI Predictive Maintenance
- IoT Sensor
- Mobile App
- QR Code Asset
- Machine Learning Failure Prediction