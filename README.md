# Bumbling 🚧

**Warning: Work in Progress**

This project is currently under active development and is not yet production-ready. Use with caution.

**Modern Childcare Platform — Free to Host

Bumbling is an open-source childcare center management platform built for real-world workflows. It's designed to be clean, fast, and flexible — letting childcare centers track attendance, manage logs, communicate with parents, and run daily operations with ease.

## ✨ Features
- Multi-center support
- Single Organization
- Role-based access (Super Admin, Center Admin, Teacher, Parent)
- Classroom and child management
- Daily logs and incident reporting
- Parent messaging
- Modular, extensible backend using Prisma + Svelte

## 🚀 Getting Started
```bash
git clone https://github.com/elithecho/bumbling.git
cd bumbling
bun install
bun dev
```

Then visit [`http://localhost:5173/setup`](http://localhost:5173/setup) to initialize your organization and create the first super admin.

## 📦 Tech Stack
- Frontend: SvelteKit
- Backend: Bun + Prisma (SQLite/Postgres Planned)
- Auth: Password-based ([Lucia](https://lucia-auth.com))

## 📄 License
This repository is licensed under the **Business Source License 1.1 (BSL)**.

You may:
- Self-host Bumbling and charge for hosting, support, or customization.

You may **not**:
- Sell or repackage Bumbling as a standalone product.
- Build a competing SaaS from it.

See [`LICENSE`](./LICENSE) for full terms.

## ❤️ Contributing
Contributions are welcome! Open issues, submit PRs, or fork and adapt for your center. Just respect the license.

## 🧠 Philosophy
Bumbling is built for small childcare centers and preschools who deserve great software without the bloat or the price tag. It's designed to feel simple, safe, and scalable.

---

Built with love.
