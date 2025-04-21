# PantryPal

**PantryPal** is a pantry management application built with **React**, **Next.js**, **Firebase**, **Material UI**, and **CSS**. It helps users efficiently manage their pantry inventory and shopping lists with real-time data synchronization, providing an intuitive and responsive user experience.

## Features
- **Responsive Interface**: Developed using **Material UI** and **Next.js** for a seamless user interface.
- **Real-Time Data Sync**: Integrated with **Firebase** to synchronize inventory and shopping list updates in real time.
- **Dynamic Inventory Updates**: Automatically updates the inventory as items are added or removed.
- **Grocery List Generation**: Allows users to generate grocery lists based on their pantry items.
  
## Tech Stack
- **Frontend**: React, Next.js, Material UI, CSS
- **Backend**: Firebase (Real-time Database)
- **Hosting**: Vercel

## Getting Started

This project is bootstrapped with [Next.js](https://nextjs.org/) and can be run locally or deployed on a platform like **Vercel**.

### Prerequisites

Ensure you have **Node.js** and **npm** installed on your machine. If not, you can download and install them from [Node.js](https://nodejs.org/).

### Setup

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/aisha1021/PantryPal.git
    cd PantryPal
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the development server:

    ```bash
    npm run dev
    ```

    This will start the app locally. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Firebase Setup

To use Firebase in the app, follow these steps:

1. Create a project in the [Firebase Console](https://console.firebase.google.com/).
2. Add Firebase to your web app and copy the Firebase config object.
3. Replace the Firebase config in your app with the credentials from your Firebase console.

### Environment Variables

Ensure you add the necessary environment variables (`.env.local`) for your Firebase project credentials to enable real-time data sync.

## Learn More

To learn more about the technologies used in this project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Material UI Documentation](https://mui.com/) - Explore Material UI components and usage.
- [Firebase Documentation](https://firebase.google.com/docs) - Understand Firebase features for web applications.

You can also explore the [Next.js GitHub repository](https://github.com/vercel/next.js/).

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

For more information, visit the [Next.js deployment documentation](https://nextjs.org/docs/deployment).
