
# 🛠️ Baby Registry MVP – Step-by-Step Build Plan

---

## 🔧 0. Setup & Boilerplate

---

### ✅ Task 0.1 – Initialize Next.js App (App Router)

* **Start**: Run `npx create-next-app@latest baby-registry-app --app`
* **End**: App runs locally at `localhost:3000` with `/app/page.tsx` showing "Hello Baby!"

---

### ✅ Task 0.2 – Install Dependencies

* **Start**: Add necessary libraries
* **End**: Project includes:

  ```bash
  npm install prisma @prisma/client react-query tailwindcss clsx framer-motion jsonwebtoken bcrypt
  ```

---

### ✅ Task 0.3 – Setup Tailwind CSS

* **Start**: Add Tailwind config
* **End**: Home page shows styled heading using Tailwind utility classes

---

### ✅ Task 0.4 – Initialize Prisma with MongoDB

* **Start**: Run `npx prisma init`
* **End**: `.env` has `DATABASE_URL`, and `prisma/schema.prisma` is ready

---

## 🧱 1. Database Models & Prisma

---

### ✅ Task 1.1 – Define RegistryItem model in `schema.prisma`

* **Start**: Add model to `prisma/schema.prisma`
* **End**: Run `prisma generate` without error

---

### ✅ Task 1.2 – Add PurchaseLink model with relation

* **Start**: Add model with `itemId` reference
* **End**: Links are related to RegistryItem

---

### ✅ Task 1.3 – Add Purchase model with relation

* **Start**: Add model with `name`, `message`, `quantity`, `itemId`
* **End**: All models validate and generate

---

### ✅ Task 1.4 – Run `prisma db push` to sync schema to MongoDB

* **Start**: `npx prisma db push`
* **End**: MongoDB database created with all 3 collections

---

## 🔌 2. Backend API Routes

---

### ✅ Task 2.1 – Create `lib/prisma.ts` for reusable Prisma client

* **Start**: Add singleton Prisma client instance
* **End**: Can import `prisma` in any API route

---

### ✅ Task 2.2 – Create GET `/api/items` route

* **Start**: Fetch all RegistryItems with `purchaseLinks` and `purchases`
* **End**: Returns full list as JSON

---

### ✅ Task 2.3 – Create POST `/api/items` route

* **Start**: Accept form data from admin to create item
* **End**: New item is saved and returned

---

### ✅ Task 2.4 – Create PATCH `/api/items/[id]` route

* **Start**: Update fields like `name`, `description`, etc.
* **End**: Returns updated item

---

### ✅ Task 2.5 – Create DELETE `/api/items/[id]` route

* **Start**: Delete the item and its links/purchases
* **End**: Returns success message

---

### ✅ Task 2.6 – Create POST `/api/items/[id]/buy` route

* **Start**: Accept buyer name, quantity, message
* **End**: Adds a `Purchase` and decrements quantity

---

## 🧑‍💼 3. Admin Authentication

---

### ✅ Task 3.1 – Add `lib/auth.ts` with JWT encode/decode logic

* **Start**: Create `signToken`, `verifyToken` helpers
* **End**: Tokens can be created and validated

---

### ✅ Task 3.2 – Create POST `/api/auth/login` route

* **Start**: Validate `.env` email/password against request
* **End**: Return signed JWT token in cookie

---

### ✅ Task 3.3 – Create `middleware.ts` to protect `/admin`

* **Start**: Check JWT token in cookie
* **End**: Redirect unauthenticated users to `/admin/login`

---

## 💻 4. Admin Dashboard (UI)

---

### ✅ Task 4.1 – Build `/admin/login` form

* **Start**: Input fields for email & password
* **End**: On success, redirect to `/admin`

---

### ✅ Task 4.2 – Build `/admin` page UI

* **Start**: Show item list with stats (total, purchased, remaining)
* **End**: Includes "Add Item" button

---

### ✅ Task 4.3 – Build `ItemFormModal.tsx`

* **Start**: Modal with name, category, price (optional), quantity, image, purchase links
* **End**: Submits to `/api/items`

---

### ✅ Task 4.4 – Add edit/delete buttons to each item

* **Start**: Admin can click edit or delete
* **End**: PATCH and DELETE work as expected

---

## 🎁 5. Public Registry View

---

### ✅ Task 5.1 – Build `ItemCard.tsx`

* **Start**: Takes `item` prop, displays image, name, tags, links
* **End**: Includes status: "Available" or "Purchased", badges for category

---

### ✅ Task 5.2 – Build `MarkPurchasedModal.tsx`

* **Start**: Form with name, quantity purchased, optional message
* **End**: Submits to `/api/items/[id]/buy` and updates UI

---

### ✅ Task 5.3 – Add search + filter buttons (Nursery, Clothes, Toys)

* **Start**: Client-side filtering using categories
* **End**: Filters update items without reload

---

## 🧪 6. Final Testing & Polish

---

### ✅ Task 6.1 – Add React Query across all components

* **Start**: Setup provider and basic queries/mutations
* **End**: All data fetching uses React Query

---

### ✅ Task 6.2 – Add framer-motion transitions to modals

* **Start**: Animate modal enter/exit
* **End**: Polished user experience

---

### ✅ Task 6.3 – Add quantity remaining indicator

* **Start**: Display “Qty Remaining: X”
* **End**: Reflects current quantity after each purchase

---

### ✅ Task 6.4 – Show buyer names when item is fully purchased

* **Start**: Item shows "Purchased by: \[name1, name2]"
* **End**: `purchases.length` == `item.quantity` triggers change

---

### ✅ Task 6.5 – Deploy to Vercel

* **Start**: Push code to GitHub
* **End**: Live app at `your-registry.vercel.app`

---

## ✅ Done!

You now have a fully working MVP.

Let me know when you're ready to generate exact code for any of these steps.
