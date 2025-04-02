**Product Requirements Document (PRD): Open Source Childcare Software**

**Project Name:** Bumbling
**Tech Stack:** Prisma (backend), Svelte (frontend)\
**Purpose:** To build an open-source, modern childcare center management platform that competes with Taidii, focusing on user-friendliness, transparency, and accessibility.

---

### Core Features (MVP)

**Super Admin Dashboard (Command Center)**

**Center Management**

- View all centers under the organization
- Create/edit center metadata (name, timezone, etc.)
- View and manage central admin users for each center
- Option to impersonate center admin for troubleshooting or preview
- No access to daily operations (logs, child data, etc.) — structure-focused only

**Child Profiles**

- Unique profile for each child
- Personal details: Name, DOB, gender, photo
- Medical info: allergies, health conditions
- Guardian info: names, contact numbers, authorized pickup persons

**Attendance Tracking**

- Check-in/out with QR code, PIN, or NFC
- Timestamp with staff ID
- Late arrival or early departure notes

**Daily Logs**

- Meals, naps, toilet routines, activities
- Ability to attach photos/videos
- Visible to parents in real time

**Parent Communication**

- In-app messaging (one-to-one and broadcast)
- Push/email notifications
- Message history archive

**Activity Planning & Reporting**

- Daily/weekly lesson plan per class
- Link activities to development milestones or curriculum goals
- Staff can write observational notes

**Staff Management**

- Staff profiles
- Attendance and shift logs
- Permissions/roles per feature access

**Incident Reporting**

- Structured form: what happened, who witnessed, actions taken
- Requires parent acknowledgment
- Option to attach images

**Media Gallery**

- Organized by class or child
- Filter by date or activity type
- Permission-based access for parents

**Admin Dashboard (Central Admin)**

- Summary of attendance, unread messages, upcoming activities
- Shortcuts to most-used admin actions
- Limited to one assigned center per admin

**Clipboard Access URL for Teachers**

- Unique, secure, token-based URLs for daily check-in/out, temperature taking, and logging
- No login required, scoped by token to specific user or center
- Resettable and obscured to prevent unauthorized use
- Designed for mobile usage by staff to simplify routine logging

---

### Future/Nice-to-Have Features (Phase 2+)

- Growth tracking: height, weight, firsts
- Smart alerts (e.g. child hasn’t checked in by 10AM)
- Analytics (child ratio, attendance trends)
- Offline mode for unreliable WiFi
- Multilingual interface
- Custom branding for centers
- Calendar sync with Google/Apple Calendar
- Teacher-parent video call scheduling

---

### Routing Overview

**Super Admin (Command Center)**
- `/commandcenter` — Super admin dashboard
- `/commandcenter/centres` — View all centers
- `/commandcenter/centres/:id` — Manage specific center (view/edit info, assign admins)

**Center Admin (Central)**
- `/central` — Center dashboard scoped to user’s center
- `/central/children`, `/central/classrooms`, etc. — Operational views for managing center data

**Teachers (Classroom)**
- `/classroom` — Teacher dashboard for daily logs, messaging, and child view
- `/classroom/logs`, `/classroom/incidents`, etc.

**Parents (Notebook)**
- `/notebook` — Parent portal for viewing child updates, messages, media, and logs

---

### Challenges & Notes

- iOS PWA limitations: no push notifications without workarounds, no install prompt
- SMS cost (approx. $0.0435 per SMS via Twilio in SG)

---

### Next Steps

- Define key user roles and permissions
- Create wireframes and flowcharts for each core feature
- Build user flows (parents, staff, admin) in detail
- Finalize naming and branding direction

---
