# 🌍 Tourism Explorer — Frontend

A modern, responsive tourism web application built with **React.js** that allows users to explore destinations, plan trips, and book travel packages across India and beyond.

---

## 📸 Project Overview

Tourism Explorer is a full-stack travel platform. This repository contains the **frontend** — the user-facing React application that communicates with the backend REST API to display destinations, manage user authentication, and handle bookings.

---

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| React.js | UI framework |
| React Router DOM | Client-side routing |
| Axios | API communication |
| Tailwind CSS / CSS Modules | Styling |
| Context API / Redux | State management |
| React Hook Form | Form handling |
| Vite / Create React App | Build tool |

---

## 📁 Folder Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── assets/          # Images, icons, fonts
│   ├── components/      # Reusable UI components
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── DestinationCard/
│   │   └── BookingForm/
│   ├── pages/           # Route-level page components
│   │   ├── Home.jsx
│   │   ├── Destinations.jsx
│   │   ├── DestinationDetail.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── BookingPage.jsx
│   │   └── Dashboard.jsx
│   ├── context/         # Auth and global state
│   ├── hooks/           # Custom React hooks
│   ├── services/        # Axios API calls
│   │   └── api.js
│   ├── utils/           # Helper functions
│   ├── App.jsx
│   └── main.jsx
├── .env
├── .env.example
├── package.json
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** v18 or higher
- **npm** v9+ or **yarn**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/tourism-frontend.git

# 2. Navigate to the project directory
cd tourism-frontend

# 3. Install dependencies
npm install

# 4. Create environment file
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Tourism Explorer
```

### Running the App

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173`

---

## 🔑 Key Features

- 🏠 **Home Page** — Hero banner, featured destinations, top packages
- 🗺️ **Destination Listing** — Browse and filter destinations by category, state, or price
- 📍 **Destination Details** — Gallery, description, nearby attractions, reviews
- 🔐 **Authentication** — User registration, login, JWT-based session management
- 📅 **Booking System** — Select dates, number of travelers, and confirm bookings
- 👤 **User Dashboard** — View and manage personal bookings
- 📱 **Responsive Design** — Mobile-first layout for all screen sizes

---

## 🔗 API Integration

All API calls are centralized in `src/services/api.js` using Axios with a base URL configured via environment variables.

```js
// Example API call
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getDestinations = () => API.get('/destinations');
export const loginUser = (data) => API.post('/auth/login', data);
```

---

## 🧪 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

---

## 📦 Dependencies

```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x",
  "axios": "^1.x",
  "tailwindcss": "^3.x"
}
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 👨‍💻 Author

Made with ❤️ as a full-stack tourism project.

---

## 📄 License

This project is licensed under the MIT License.
