# Civic Reporting System 🏙️

A modern civic issue reporting web application built using **Next.js (App Router) + TypeScript** and **Supabase**, designed to provide a unified platform for citizens to report civic problems, track complaint progress, and help admins manage and update issue statuses efficiently.

This system improves transparency and streamlines communication between citizens and authorities for faster resolution of civic issues.

---

## 🚀 Features

### 👤 Citizen Module
- **Authentication (Supabase Auth):** Secure login/signup
- **Report Issue:** Submit civic complaints with required issue details
- **Track Complaint Status:** View status updates (*Pending / In Progress / Resolved*)
- **Reports History:** Access previously submitted complaints

### 🏛️ Admin Module
- **Admin Dashboard:** Central place to monitor submitted civic issues
- **View All Complaints:** Review all citizen-submitted reports
- **Update Complaint Status:** Change complaint status based on progress
- **Complaint Management:** Maintain structured and trackable workflow

---

## 🧰 Tech Stack

- **Next.js (App Router)** – React framework for UI + routing
- **TypeScript** – Type-safe development
- **Supabase**
  - Supabase Authentication
- **CSS / Styling** – Responsive UI design

---

## 📂 Project Setup

### 1) Clone the repository
```bash
git clone https://github.com/divyawebdesign/civic-reporting-system.git
```
### 2) Navigate into the project folder
```bash
cd civic-reporting-system
```
### 3) Install dependencies
```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory and add:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
> You can get these values from:  
**Supabase Dashboard → Project Settings → API**

---

## ▶️ Run the Application

```bash
npm run dev
```
Now open in browser:

```text
http://localhost:3000
```

---