**Project Name:** Bumbling
**Tech Stack:** Prisma (backend), Svelte (frontend)
**Purpose:** To build an open-source, modern childcare center management platform that competes with Taidii, focusing on user-friendliness, transparency, and accessibility.

---

## Core Features (MVP)

### 1. Child Profiles
- Unique profile for each child
- Personal details: Name, DOB, gender, photo
- Medical info: allergies, health conditions
- Guardian info: names, contact numbers, authorized pickup persons

### 2. Attendance Tracking
- Check-in/out with QR code, PIN, or NFC
- Timestamp with staff ID
- Late arrival or early departure notes
### 3. Daily Logs
- Meals, naps, toilet routines, activities    
- Ability to attach photos/videos
- Visible to parents in real time
### 4. Parent Communication
- In-app messaging (one-to-one and broadcast)
- Push/email notifications
- Message history archive
### 5. Activity Planning & Reporting
- Daily/weekly lesson plan per class
- Link activities to development milestones or curriculum goals
- Staff can write observational notes
### 6. Staff Management
- Staff profiles
- Attendance and shift logs
- Permissions/roles per feature access
### 7. Incident Reporting
- Structured form: what happened, who witnessed, actions taken
- Requires parent acknowledgment
- Option to attach images
### 8. Billing & Payments
- Auto invoice generation (monthly, ad hoc charges)
- Track payment status
- Stripe/PayNow integration
### 9. Media Gallery
- Organized by class or child
- Filter by date or activity type
- Permission-based access for parents
### 10. Admin Dashboard
- Summary of attendance, unread messages, upcoming activities
- Shortcuts to most-used admin actions

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
### Challenges & Notes
- iOS PWA limitations: no push notifications without workarounds, no install prompt
- SMS cost (approx. $0.0435 per SMS via Twilio in SG)

---

### Next Steps
- Define key user roles and permissions
- Create wireframes and flowcharts for each core feature
- Build user flows (parents, staff, admin) in detail
- Finalize naming and branding direction
