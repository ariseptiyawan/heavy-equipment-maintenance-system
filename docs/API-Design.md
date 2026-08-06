# API Design

## Heavy Equipment Maintenance Intelligence System (HEMIS)

---

# 1. Overview

HEMIS menggunakan REST API sebagai media komunikasi antara frontend dan backend.

Base URL:

```
/api/v1
```

---

# 2. Authentication API

## Login

POST

```
/auth/login
```

Body

```json
{
  "email":"admin@mail.com",
  "password":"password"
}
```

Response

```json
{
  "token":"JWT_TOKEN"
}
```

---

## Logout

POST

```
/auth/logout
```

---

## Profile

GET

```
/auth/profile
```

---

# 3. Asset API

GET

```
/assets
```

POST

```
/assets
```

GET

```
/assets/{id}
```

PUT

```
/assets/{id}
```

DELETE

```
/assets/{id}
```

---

# 4. Preventive Maintenance API

GET

```
/preventive-maintenance
```

POST

```
/preventive-maintenance
```

PUT

```
/preventive-maintenance/{id}
```

DELETE

```
/preventive-maintenance/{id}
```

---

# 5. Corrective Maintenance API

GET

```
/corrective-maintenance
```

POST

```
/corrective-maintenance
```

PUT

```
/corrective-maintenance/{id}
```

DELETE

```
/corrective-maintenance/{id}
```

---

# 6. Work Order API

GET

```
/work-orders
```

POST

```
/work-orders
```

PUT

```
/work-orders/{id}
```

DELETE

```
/work-orders/{id}
```

---

# 7. Spare Part API

GET

```
/spare-parts
```

POST

```
/spare-parts
```

PUT

```
/spare-parts/{id}
```

DELETE

```
/spare-parts/{id}
```

---

# 8. Inventory API

GET

```
/inventory
```

POST

```
/inventory
```

---

# 9. Purchasing API

GET

```
/purchase-orders
```

POST

```
/purchase-orders
```

GET

```
/vendors
```

---

# 10. Reporting API

GET

```
/reports/dashboard
```

GET

```
/reports/mttr
```

GET

```
/reports/mtbf
```

GET

```
/reports/downtime
```

---

# 11. Notification API

GET

```
/notifications
```

PUT

```
/notifications/read
```

---

# 12. User Management API

GET

```
/users
```

POST

```
/users
```

PUT

```
/users/{id}
```

DELETE

```
/users/{id}
```

---

# 13. API Security

- JWT Authentication
- HTTPS
- Role Based Access Control
- Rate Limiting
- Input Validation

---

# 14. API Versioning

```
/api/v1
```

Future

```
/api/v2
```