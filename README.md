# Univerus Persons of Interest Frontend

A responsive React single-page application for managing persons of interest, built with TypeScript, Material UI, Material React Table, and TanStack Query.

## Features

- View all persons from the API in a sortable, filterable table
- Create, edit, and delete persons using beautiful modal dialogs
- Responsive design for desktop and mobile
- Uses Axios for API requests and TanStack Query for data management

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/PersonsFrontEnd.git
   cd PersonsFrontEnd
   ```

2. **Install dependencies:**

   Using npm:
   ```bash
   npm install
   ```

   Or using yarn:
   ```bash
   yarn install
   ```

3. **Configure the API endpoint:**

   - By default, the app expects the backend API at `/api/persons`.
   - If your API is at a different URL, update the Axios base URL or endpoints in the relevant files in `src/hooks` or `src/API`.

4. **Start the development server:**

   Using npm:
   ```bash
   npm run dev
   ```

   Or using yarn:
   ```bash
   yarn dev
   ```

   > **Note:** The development server runs on port **5173** by default.  
   > If you change the port, you must add the new port to your backend API's CORS exception list, or API requests will be blocked by the browser.

5. **Open the app:**

   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) in your browser.

## Project Structure

- `src/components/` – React components (Person table, dialogs, etc.)
- `src/hooks/` – Custom React hooks for API and query logic
- `src/models/` – TypeScript DTOs and types
- `src/constants/` – App constants and query keys
- `src/API/` – API utility functions

## Customization

- Update the API endpoints in the hooks or API files if your backend differs.
- Adjust table columns in `src/components/PersonColumnhelper.tsx` as needed.

## License

MIT
