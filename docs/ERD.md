# Heavy Equipment Maintenance Intelligence System (HEMIS)

# Entity Relationship Diagram (ERD)

---

## Overview

ERD ini menggambarkan struktur database utama pada aplikasi Heavy Equipment Maintenance Intelligence System (HEMIS).

Database dirancang menggunakan pendekatan relasional hingga Third Normal Form (3NF) agar mudah dikembangkan, efisien, dan menjaga konsistensi data.

---

# Main Entities

## Users

| Field | Type |
|--------|------|
| id | bigint |
| name | varchar |
| email | varchar |
| password | varchar |
| role_id | bigint |
| created_at | timestamp |

---

## Roles

| Field | Type |
|--------|------|
| id | bigint |
| role_name | varchar |

---

## Assets

| Field | Type |
|--------|------|
| id | bigint |
| asset_code | varchar |
| asset_name | varchar |
| category_id | bigint |
| location_id | bigint |
| purchase_date | date |
| status | varchar |

---

## Categories

| Field | Type |
|--------|------|
| id | bigint |
| category_name | varchar |

---

## Locations

| Field | Type |
|--------|------|
| id | bigint |
| location_name | varchar |

---

## Work Orders

| Field | Type |
|--------|------|
| id | bigint |
| asset_id | bigint |
| technician_id | bigint |
| work_type | varchar |
| status | varchar |
| start_date | datetime |
| finish_date | datetime |

---

## Preventive Maintenance

| Field | Type |
|--------|------|
| id | bigint |
| asset_id | bigint |
| schedule_date | date |
| interval_day | integer |
| status | varchar |

---

## Corrective Maintenance

| Field | Type |
|--------|------|
| id | bigint |
| asset_id | bigint |
| damage | text |
| action | text |

---

## Spare Parts

| Field | Type |
|--------|------|
| id | bigint |
| part_number | varchar |
| part_name | varchar |
| stock | integer |
| unit | varchar |

---

## Inventory Transactions

| Field | Type |
|--------|------|
| id | bigint |
| sparepart_id | bigint |
| qty | integer |
| transaction_type | varchar |
| created_at | timestamp |

---

## Relationships

Roles
↓

Users

Assets
↓

Preventive Maintenance

Assets
↓

Corrective Maintenance

Assets
↓

Work Orders

Users
↓

Work Orders

Categories
↓

Assets

Locations
↓

Assets

Spare Parts
↓

Inventory Transactions

---

## Database Standard

- Third Normal Form (3NF)
- Primary Key
- Foreign Key
- Timestamp
- Soft Delete Ready
- UUID Ready (Future)

---

## Future Expansion

- IoT Sensor Data
- GPS Tracking
- Fuel Monitoring
- AI Prediction
- Machine Learning
- Mobile Synchronization
- Business Intelligence Data Warehouse