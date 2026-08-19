# AbaNtu Intelligence — Frontend

The frontend for **AbaNtu Intelligence Tech Solutions**, a digital systems and technology company focused on building practical digital platforms, websites, web applications and information systems for people, businesses, institutions and communities.

The frontend is a responsive React application built with Vite and designed to present AbaNtu Intelligence's services, sectors, projects, insights and digital capabilities.

---

## 1. Project Purpose

The purpose of this frontend is not simply to present AbaNtu Intelligence as a website-development company.

It is designed to demonstrate the breadth of digital systems that AbaNtu Intelligence can design and build.

The portfolio therefore includes examples across:

- Digital presence
- Digital identity
- SMME digitalisation
- Digital commerce
- Education technology
- Civic technology
- Employment technology
- Property technology
- Social and community technology
- Institutional digital infrastructure
- Enterprise development
- Personal digital portfolios
- Digital resumes
- Emerging software products

The central positioning is:

> **We don't just build websites. We build digital systems around real-world problems.**

---

# 2. Technology Stack

## Frontend

- React
- Vite
- JavaScript / JSX
- React Router
- Lucide React
- CSS
- Responsive / mobile-first UI

## Backend

The frontend is architected to consume a Django API when available.

- Python
- Django
- Django REST Framework
- PostgreSQL
- REST API

## Deployment

- Render
- GitHub
- Vite production builds

---

# 3. Repository Architecture

The project is structured as a Django + React monorepo.

```text
abantu-intelligence/
│
├── apps/
│   └── Django applications
│
├── config/
│   └── Django project configuration
│
├── frontend/
│   ├── public/
│   │   └── projects/
│   │       └── Project preview images
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   └── ui/
│   │   │
│   │   ├── data/
│   │   │   └── site.js
│   │   │
│   │   ├── hooks/
│   │   │   └── useApiResource.js
│   │   │
│   │   ├── pages/
│   │   │
│   │   ├── services/
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── manage.py
├── requirements.txt
├── render.yaml
└── README.md