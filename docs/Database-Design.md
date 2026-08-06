# Database Design

## Heavy Equipment Maintenance Intelligence System (HEMIS)

---

# 1. Database Overview

HEMIS menggunakan database relasional untuk menyimpan seluruh data maintenance alat berat.

Database dirancang agar scalable, mudah dikembangkan, serta mendukung integrasi dengan sistem ERP maupun IoT di masa depan.

---

# 2. Main Entities

Sistem terdiri dari beberapa entitas utama:

- Users
- Roles
- Assets
- Asset Categories
- Preventive Maintenance
- Corrective Maintenance
- Work Orders
- Spare Parts
- Inventory
- Purchase Requests
- Purchase Orders
- Vendors
- Reports
- Notifications
- Audit Logs

---

# 3. Database Tables

## Users

| Column | Type |
|---------|------|
| id | bigint |
| name | varchar |
| email | varchar |
| password | varchar |
| role_id | bigint |
| created_at | timestamp |

---

## Roles

| Column | Type |
|---------|------|
| id | bigint |
| role_name | varchar |

---

## Assets

| Column | Type |
|---------|------|
| id | bigint |
| asset_code | varchar |
| asset_name | varchar |
| category_id | bigint |
| serial_number | varchar |
| location | varchar |
| status | varchar |

---

## Asset Categories

| Column | Type |
|---------|------|
| id | bigint |
| category_name | varchar |

---

## Preventive Maintenance

| Column | Type |
|---------|------|
| id | bigint |
| asset_id | bigint |
| schedule_date | date |
| status | varchar |
| technician_id | bigint |

---

## Corrective Maintenance

| Column | Type |
|---------|------|
| id | bigint |
| asset_id | bigint |
| problem_description | text |
| repair_date | date |
| status | varchar |

---

## Work Orders

| Column | Type |
|---------|------|
| id | bigint |
| wo_number | varchar |
| asset_id | bigint |
| technician_id | bigint |
| priority | varchar |
| status | varchar |

---

## Spare Parts

| Column | Type |
|---------|------|
| id | bigint |
| part_number | varchar |
| part_name | varchar |
| stock | integer |
| minimum_stock | integer |

---

## Inventory Transactions

| Column | Type |
|---------|------|
| id | bigint |
| part_id | bigint |
| quantity | integer |
| transaction_type | varchar |
| created_at | timestamp |

---

## Vendors

| Column | Type |
|---------|------|
| id | bigint |
| vendor_name | varchar |
| address | text |
| phone | varchar |

---

## Purchase Requests

| Column | Type |
|---------|------|
| id | bigint |
| requester_id | bigint |
| status | varchar |

---

## Purchase Orders

| Column | Type |
|---------|------|
| id | bigint |
| vendor_id | bigint |
| po_number | varchar |
| status | varchar |

---

## Notifications

| Column | Type |
|---------|------|
| id | bigint |
| user_id | bigint |
| message | text |
| status | varchar |

---

## Audit Logs

| Column | Type |
|---------|------|
| id | bigint |
| user_id | bigint |
| activity | text |
| created_at | timestamp |

---

# 4. Relationships

- Role memiliki banyak User
- User membuat banyak Work Order
- Asset memiliki banyak Preventive Maintenance
- Asset memiliki banyak Corrective Maintenance
- Asset memiliki banyak Work Order
- Spare Part memiliki banyak Inventory Transaction
- Vendor memiliki banyak Purchase Order

---

# 5. Database Normalization

Database dirancang hingga Third Normal Form (3NF) sehingga:

- Tidak ada redundansi data
- Data konsisten
- Mudah dikembangkan
- Efisien untuk query

---

# 6. Future Database Expansion

Rencana pengembangan:

- IoT Sensor Data
- Machine Learning Prediction
- GPS Tracking
- Fuel Consumption
- Engine Monitoring
- Mobile Synchronization
- Business Intelligence Data Warehouse