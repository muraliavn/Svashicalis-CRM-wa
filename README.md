# ChocoFlow | Chocolate Manufacturing ERP

A comprehensive Order Management and ERP system designed for chocolate manufacturing businesses. This application features role-based portals for Admins, Sales Executives, and Delivery Personnel.

![ChocoFlow Dashboard](https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=2000&auto=format&fit=crop)

## 🚀 Features

*   **Role-Based Access Control (RBAC):** Dedicated dashboards for Admin, Sales, and Delivery roles.
*   **Order Management:** Create, track, and update orders with real-time status changes.
*   **Inventory Management:** Track product stock, prices, and categories.
*   **B2B Customer CRM:** Manage business owners, contact details, and order history.
*   **AI Insights:** Powered by Google Gemini to provide sales analytics and draft emails.
*   **Database Integration:** Fully integrated with Supabase for persistent data storage.
*   **Analytics:** Visual charts for revenue, sales performance, and delivery stats.

## 🛠️ Tech Stack

*   **Frontend:** React 19, TypeScript, Vite
*   **Styling:** Tailwind CSS, Lucide React (Icons)
*   **Charts:** Recharts
*   **Database:** Supabase (PostgreSQL)
*   **AI:** Google Gemini API

## 📦 Setup & Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/muraliavn/chocoorder.git
    cd chocoorder
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root directory:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    API_KEY=your_google_gemini_api_key
    ```

4.  **Database Setup**
    The application includes a setup script.
    *   Run the app.
    *   If tables are missing, a "Database Setup" modal will appear.
    *   Copy the SQL script provided and run it in your Supabase SQL Editor.

5.  **Run the application**
    ```bash
    npm run dev
    ```

## 🗄️ Database Schema

The project uses the following tables in Supabase:
*   `users`: Stores staff credentials and roles.
*   `customers`: B2B client details.
*   `products`: Inventory items.
*   `orders`: Sales transactions and items (JSONB).

## 📄 License

This project is licensed under the MIT License.