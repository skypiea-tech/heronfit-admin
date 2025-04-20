# Vue 3 + TypeScript + Tailwind CSS + Supabase 

## Tech Stack

- **Vue 3**: A progressive JavaScript framework for building user interfaces.
- **TypeScript**: A superset of JavaScript that provides static types, improving maintainability and developer experience.
- **Tailwind CSS**: A utility-first CSS framework for designing custom, responsive layouts quickly.
- **Supabase**: An open-source Firebase alternative that provides backend services such as authentication, database, and storage.

---

## MVC Architecture

This follows the **MVC** pattern:

- **Model (M)**: 
  - **Supabase** is used as the backend to handle database operations, user authentication, and file storage.
  - The Supabase SDK is integrated to manage database records, authentication, and real-time data.

- **View (V)**: 
  - **Vue 3** handles the frontend user interface.
  - **TypeScript** adds type safety and developer-friendly tooling to the Vue components.
  - **Tailwind CSS** is used for styling, offering utility-first classes to design responsive, customizable layouts.

- **Controller (C)**: 
  - **TypeScript** and **Pinia** handle the logic for user interactions, form submissions, API calls, and display management.
  - **Pinia** is used as the state management solution in Vue 3, providing a central store to manage and share the application's state across components.

---

## Project Setup

To get started with this project, follow the steps below:

### 1. Clone the Repository
### 2. Insert your own Supabase DB in .env
**example**
- VITE_SUPABASE_ANON_KEY= your-key-here
- VITE_SUPABASE_URL= your-url-here
### 3. run **npm install** to install the dependencies
### 4. run **npm run dev**
### 5. Website accessible through http://localhost:5173/

