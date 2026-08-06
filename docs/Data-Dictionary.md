# Heavy Equipment Maintenance Intelligence System (HEMIS)

# Data Dictionary

---

## Overview

Dokumen ini menjelaskan struktur setiap tabel beserta atribut yang digunakan pada database HEMIS.

---

# Users

| Field | Type | Description |
|--------|------|-------------|
| id | bigint | Primary Key |
| name | varchar(100) | Nama pengguna |
| email | varchar(100) | Email |
| password | varchar(255) | Password terenkripsi |
| role_id | bigint | Foreign Key Role |
| created_at | timestamp | Waktu dibuat |
| updated_at | timestamp | Waktu diubah |

---

# Roles

| Field | Type | Description |
|--------|------|-------------|
| id | bigint | Primary Key |
| role_name | varchar(50) | Nama Role |

---

# Assets

| Field | Type | Description |
|--------|------|-------------|
| id | bigint | Primary Key |
| asset_code | varchar(30) | Kode Asset |
| asset_name | varchar(100) | Nama Unit |
| category_id | bigint | FK Category |
| location_id | bigint | FK Location |
| purchase_date | date | Tanggal Pembelian |
| status | varchar(30) | Status Asset |

---

# Categories

| Field | Type | Description |
|--------|------|-------------|
| id | bigint | Primary Key |
| category_name | varchar(100) | Nama Kategori |

---

# Locations

| Field | Type | Description |
|--------|------|-------------|
| id | bigint | Primary Key |
| location_name | varchar(100) | Lokasi Asset |

---

# Work Orders

| Field | Type | Description |
|--------|------|-------------|
| id | bigint | Primary Key |
| asset_id | bigint | FK Asset |
| technician_id | bigint | FK User |
| work_type | varchar(50) | PM / CM |
| status | varchar(50) | Open, Progress, Close |
| start_date | datetime | Mulai |
| finish_date | datetime | Selesai |

---

# Preventive Maintenance

| Field | Type | Description |
|--------|------|-------------|
| id | bigint | Primary Key |
| asset_id | bigint | FK Asset |
| schedule_date | date | Jadwal PM |
| interval_day | integer | Interval Hari |
| status | varchar(30) | Status |

---

# Corrective Maintenance

| Field | Type | Description |
|--------|------|-------------|
| id | bigint | Primary Key |
| asset_id | bigint | FK Asset |
| damage | text | Kerusakan |
| action | text | Tindakan |

---

# Spare Parts

| Field | Type | Description |
|--------|------|-------------|
| id | bigint | Primary Key |
| part_number | varchar(50) | Nomor Part |
| part_name | varchar(100) | Nama Part |
| stock | integer | Jumlah |
| unit | varchar(20) | Satuan |

---

# Inventory Transactions

| Field | Type | Description |
|--------|------|-------------|
| id | bigint | Primary Key |
| sparepart_id | bigint | FK Spare Part |
| qty | integer | Jumlah |
| transaction_type | varchar(20) | IN / OUT |
| created_at | timestamp | Waktu |

---

# Naming Convention

- Primary Key menggunakan id
- Foreign Key menggunakan *_id
- Timestamp menggunakan created_at dan updated_at
- Nama tabel menggunakan bentuk plural
- Snake Case digunakan untuk seluruh field

---

# Database Standards

- Third Normal Form (3NF)
- Referential Integrity
- Foreign Key Constraint
- Indexing pada Foreign Key
- Soft Delete Ready
- UUID Ready (Future)