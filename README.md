# 🌱 Next.js E-Commerce Platform

> **Note:** The admin panel/dashboard is a work in progress and is currently being developed. Some features may not be fully functional yet.

A modern, full-featured, and beautifully designed e-commerce web application built with Next.js, TypeScript, MongoDB, Stripe, PayPal, and Clerk authentication. This project is designed for both customers and administrators, with a robust admin dashboard, responsive UI, and support for dark/light mode.

---

## 🚀 Features

- **User Authentication**: Secure sign-up, login, and session management with Clerk.
- **Product Catalog**: Browse, search, and filter a variety of plants with images, categories, and details.
- **Shopping Cart**: Add, update, and remove items; persistent cart synced with user account.
- **Checkout & Payments**: Seamless checkout with Stripe and PayPal integration.
- **Order Management**: Place orders, view order history, and track status.
- **Address Book**: Save and manage multiple shipping addresses.
- **Admin Dashboard**: Powerful dashboard for admins to manage products and orders, with role-based access control.
- **Responsive UI**: Fully responsive for mobile, tablet, and desktop.
- **Dark/Light Mode**: Beautifully themed for both dark and light environments.
- **Reusable Components**: Modular, maintainable, and scalable codebase.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes, Mongoose, MongoDB
- **Authentication**: Clerk
- **Payments**: Stripe, PayPal
- **State Management**: Zustand
- **UI Components**: Custom + Headless UI
- **Other**: Lucide Icons, Zod validation, ESLint, Prettier

---

## 📁 Folder Structure

```
e-commerce/
├── app/
│   ├── (admin)/dashboard/         # Admin dashboard (plants, orders)
│   ├── (client)/                  # Client-facing pages (auth, cart, payment, etc.)
│   ├── api/                       # API routes (Stripe, PayPal, Clerk, etc.)
│   ├── globals.css                # Global styles
│   └── layout.tsx                 # Root layout
├── components/                    # Reusable UI components
│   ├── address/                   # Address forms and lists
│   ├── plant/                     # Plant cards, pagination, etc.
│   ├── shared/                    # Navbar, footer, home sections
│   ├── ui/                        # UI primitives (button, card, input, etc.)
├── db/                            # Mongoose schemas, sample data
├── lib/                           # Server actions, constants, utilities
├── public/                        # Static assets (images, icons)
├── store/                         # Zustand store for cart
├── types/                         # TypeScript types and Zod validators
├── README.md                      # Project documentation
├── package.json                   # Dependencies and scripts
└── ...
```

---

## ⚙️ Setup & Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/e-commerce.git
   cd e-commerce
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**

   - Copy `.env.example` to `.env.local` and fill in your values for:
     - MongoDB connection string
     - Clerk API keys
     - Stripe keys & webhook secret
     - PayPal client ID, secret, webhook ID

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000)

---

## 💳 Payment Integration

### Stripe

- Fully integrated with Stripe Checkout.
- Webhook endpoint: `/api/stripe/webhook` (handles order creation and cart clearing).
- Metadata is used to link Stripe sessions to user carts and addresses.

### PayPal

- Integrated with PayPal Orders API.
- Webhook endpoint: `/api/paypal/webhook` (handles order creation and cart clearing).
- Uses custom_id and invoice_id for cart/user linkage.

---

## 🔐 Authentication & Authorization

- Uses Clerk for secure, modern authentication.
- Middleware ensures protected routes for users and admins.
- Admin dashboard is only accessible to users with `role: "admin"` (checked via server action).

---

## 🛒 Main Features Explained

### 1. **Product Catalog & Details**

- Browse all plants with images, categories, and prices.
- View detailed product pages with gallery and description.
- Filter and search by category, name, and more.

### 2. **Cart & Checkout**

- Add, update, and remove items from the cart.
- Cart is persistent and synced with user account.
- Checkout flow supports both Stripe and PayPal.
- Address selection and management during checkout.

### 3. **Order Management**

- Users can view their order history and details.
- Orders include itemized breakdown, shipping address, and payment status.
- Admins can view, filter, and manage all orders.

### 4. **Admin Dashboard**

- Sidebar navigation for Plants and Orders.
- Plants: List, filter, edit, and delete plants. Add new plants.
- Orders: List, filter, and manage orders.
- Responsive, modern UI with light/dark mode.
- Access restricted to admin users only.

---

## 🧩 Customization & Extensibility

- **Add new product types** by extending the schema and UI.
- **Add new payment providers** by creating new API routes and integrating with the checkout flow.
- **Customize UI** easily with Tailwind CSS and modular components.
- **Add more admin features** (analytics, user management, etc.) as needed.

---

## 📝 Code Quality & Best Practices

- TypeScript throughout for type safety.
- Zod for runtime validation.
- Async/await and server actions for all data fetching and mutations.
- Minimal use of client components (only where necessary for interactivity).
- Linting and formatting with ESLint and Prettier.

---

## 📦 Sample Data

- Sample products and addresses are provided in `db/sample-data.json` for quick setup and testing.

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Clerk](https://clerk.com/)
- [Stripe](https://stripe.com/)
- [PayPal](https://paypal.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://mongodb.com/)
- [Lucide Icons](https://lucide.dev/)

---

_This project is a modern, production-ready e-commerce starter. Feel free to use, extend, and customize it for your own business or portfolio!_
