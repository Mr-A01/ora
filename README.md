# ORA HEALTH — A clearer picture of your health

Editorial health platform: marketing site + patient portal (results, trends, check-ins, programs, appointments, billing, report).

## Structure

```
ora/
├── index.html
├── css/
│   ├── styles.css   # Design system, marketing + portal
│   └── fixes.css    # Mobile, overflow, notif, tables, a11y
├── js/
│   └── app.js       # Router, views, charts, cmd-k, forms
└── README.md
```

## Run

```bash
cd ora
python3 -m http.server 8080
```

Open **http://localhost:8080**

## Features

- Marketing: home, diagnostics, programs, pricing, employers, insights, clinics, about, security, contact, app
- Portal: overview, health, trends, check-in, results, programs, appointments, messages, documents, billing, profile, security, report
- Command palette (`⌘/Ctrl + K`)
- Notifications, drawer, modals, toasts
- Mobile bottom tabs + more sheet
- Printable health report

## Fixes in this package

- Multi-file structure
- Notification panel stays inside viewport on mobile
- Portal sidebar/main/tabs responsive
- Metric and content grids stack cleanly
- Tables horizontal-scroll instead of crush
- Overflow and min-width safety throughout
- Safe-area for bottom tabs
- Focus-visible + reduced-motion
- Print hides chrome

## Stack

Vanilla HTML/CSS/JS · Inter Variable + Fraunces Variable · hash routing · no build step

© ORA Health
