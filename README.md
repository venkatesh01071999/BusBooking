# Route Bus – Bus Ticket Booking (Frontend)

A React web app for booking intercity bus tickets. Passengers search routes by date, pick seats on a live seat map, confirm bookings, and manage or rate their trips. Admins add buses and view every booking across the network.

> This repo is the **client only**. It talks to a REST API expected at `http://localhost:5000`, which lives in a separate backend project.

## Features

**Passengers**
- Sign up / log in with email + password (protected by Google reCAPTCHA) or with Google Sign-In
- Search buses by origin, destination and travel date; only departures still bookable are shown
- Sort results by fare, coach type (A/C / Non A/C), seats available and rating
- Pick seats on a 35-seat (2 + 3) layout with already-booked seats blocked out and a running fare total
- Confirm the booking and see it in **My Bookings**
- Cancel upcoming trips, and rate a bus (1–5 stars) after the journey

**Admins**
- Role is detected automatically at login; admins land on a separate panel
- Add a bus: name, route, coach type, working days, departure time, boarding point and fare
- View all bookings with who booked and which seats

## Tech stack

| Area | Tools |
|---|---|
| UI | React 16 (hooks + class components), Create React App |
| Routing | React Router v5 |
| Styling | Bootstrap 4, React-Bootstrap, custom CSS |
| HTTP | Axios |
| Auth | Token stored in `localStorage`, `react-google-login`, `react-google-recaptcha` |
| Widgets | `react-datepicker`, `react-dropdown`, `react-star-ratings`, `react-rating`, SweetAlert |

## Getting started

```bash
git clone https://github.com/venkatesh01071999/BusBooking.git
cd BusBooking
npm install
npm start          # http://localhost:3000
```

Start the backend API on port 5000 before using the app. The Google OAuth client ID and reCAPTCHA site key are set in `src/Components/logIn/logIn.js` and `src/Components/signUp/signUp.js`; swap in your own to run it under a different domain.

`npm run build` creates a production bundle in `build/`.

## Project structure

```
src/
├── App.js                      # Route definitions
└── Components/
    ├── logIn/, signUp/         # Auth screens
    ├── PageRendering/          # Checks the token, shows the admin or passenger home
    ├── userPanel/              # Search, results, seat map, confirmation, booking history
    └── adminPanel/             # Add-bus form and all-bookings view
```

## API endpoints used

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/` , `/signUp` | Email login / registration |
| POST | `/oauth/google/signIn`, `/oauth/google/signUp` | Google auth |
| POST | `/profile` | Validate token, return role |
| GET | `/locations` | Origin / destination lists |
| POST | `/Search` | Buses for a route and date |
| POST | `/busBook` | Seats already booked on a bus |
| POST | `/booked` | Save a booking |
| POST | `/myBooking` | A passenger's bookings |
| POST | `/cancelling` | Cancel a booking |
| POST | `/Rating` | Rate a completed trip |
| POST | `/admin` | Add a bus |
| GET | `/admin/adminSearch` | All bookings (admin) |
