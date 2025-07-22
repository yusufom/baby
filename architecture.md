

```markdown
# 👶 Baby Registry App – Full Stack Architecture

A beautiful baby shower registry web app where:

- Visitors can view and purchase items via external links (Amazon, Target, etc.).
- After purchase, they return to mark the item (with their name and message).
- Quantities are tracked per item.
- Admins can log in to manage items via a dashboard.

---

## 🛠 Tech Stack

- **Frontend**: Next.js 13+ (App Router), Tailwind CSS, Framer Motion
- **State Management**: React Query
- **Backend**: Next.js API Routes
- **Database**: MongoDB (via Prisma)
- **Auth**: JWT (Admin login)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion

---

## 📁 File & Folder Structure

```

baby-registry-app/
├── app/
│   ├── page.tsx                # Homepage – displays all registry items
│   ├── admin/
│   │   ├── page.tsx            # Admin dashboard
│   │   └── login.tsx           # Admin login
│   └── api/
│       ├── items/
│       │   ├── route.ts        # GET, POST (items)
│       │   └── \[id].ts         # PATCH, DELETE, purchase marking
│       └── auth/
│           └── login.ts        # Admin login endpoint
│
├── components/
│   ├── ItemCard.tsx            # Display an item with status & buttons
│   ├── ItemFormModal.tsx       # Admin modal to add/edit an item
│   ├── MarkPurchasedModal.tsx  # Buyer modal to mark purchase
│   └── Header.tsx              # Navbar with filters/search
│
├── hooks/
│   └── useItems.ts             # React Query hooks for item data
│
├── lib/
│   ├── prisma.ts               # Prisma client config
│   └── auth.ts                 # Auth utils (JWT verification)
│
├── prisma/
│   └── schema.prisma           # DB schema using Prisma
│
├── public/                     # Images, favicons
├── styles/                     # Tailwind and animations
├── middleware.ts               # JWT-based admin route protection
├── .env                        # Secrets & credentials
└── package.json

````

---

## 🧾 Prisma Schema – `prisma/schema.prisma`

```prisma
model RegistryItem {
  id           String         @id @default(auto()) @map("_id") @db.ObjectId
  name         String
  description  String?
  price        Float?         // Optional
  quantity     Int
  category     String
  imageUrl     String
  purchaseLinks PurchaseLink[]
  purchases    Purchase[]
  createdAt    DateTime       @default(now())
}

model PurchaseLink {
  id       String   @id @default(auto()) @map("_id") @db.ObjectId
  label    String
  url      String
  item     RegistryItem @relation(fields: [itemId], references: [id])
  itemId   String @db.ObjectId
}

model Purchase {
  id       String   @id @default(auto()) @map("_id") @db.ObjectId
  name     String
  message  String?
  quantity Int
  item     RegistryItem @relation(fields: [itemId], references: [id])
  itemId   String @db.ObjectId
}
````

---

## 🧠 What Each Part Does

| Folder/File              | Purpose                                                  |
| ------------------------ | -------------------------------------------------------- |
| `app/page.tsx`           | Displays registry with filters, status, purchase buttons |
| `app/admin/page.tsx`     | Admin view to manage items                               |
| `ItemCard.tsx`           | UI component showing an item card                        |
| `MarkPurchasedModal.tsx` | Buyer input form to mark a gift as purchased             |
| `ItemFormModal.tsx`      | Admin modal to add/edit/delete items                     |
| `useItems.ts`            | React Query hooks for data fetching/mutation             |
| `api/items`              | Handles item listing, creation, updates, deletion        |
| `api/items/[id]`         | Handles single item updates or marking as purchased      |
| `api/auth/login`         | Admin login route with JWT token issuance                |
| `lib/auth.ts`            | Login validation, JWT creation and verification          |
| `middleware.ts`          | Redirects unauthenticated users from `/admin`            |

---

## 🔐 Admin Auth (JWT)

```env
# .env
ADMIN_EMAIL=admin@babyregistry.com
ADMIN_PASSWORD=supersecurepassword
JWT_SECRET=your-secret-key
```

* JWT issued after login, stored in a cookie
* Protected routes use `middleware.ts` to check authentication

---

## 📦 State Management – React Query

```ts
// hooks/useItems.ts
export const useItems = () => useQuery(['items'], fetchItems);

export const useCreateItem = () => useMutation(createItem, {
  onSuccess: () => queryClient.invalidateQueries(['items']),
});
```

* **Global state**: Registry items (fetched using React Query)
* **Local UI state**: Modal open/close, form inputs (useState)

---

## 🌐 API Endpoints

| Endpoint              | Method | Description             |
| --------------------- | ------ | ----------------------- |
| `/api/items`          | GET    | Get all items           |
| `/api/items`          | POST   | Create new item (admin) |
| `/api/items/[id]`     | PATCH  | Edit item (admin)       |
| `/api/items/[id]`     | DELETE | Delete item (admin)     |
| `/api/items/[id]/buy` | POST   | Mark item as purchased  |
| `/api/auth/login`     | POST   | Admin login             |

---

## 💡 UX Features

* **Badges**: “Available”, “Purchased”, “Qty: X”
* **Category Filters**: Nursery, Feeding, Clothes, etc.
* **Multiple Links**: Amazon, Target, etc. with icons
* **Modals**: Smooth animated entry via Framer Motion
* **Admin View**: Separate modal for adding new items

---

## ✨ Animation & UI Polish

* Use `framer-motion` for:

  * Modal transitions
  * Button hover effects
  * Confetti effect when item is purchased
* Use `classnames` or `clsx` for conditional Tailwind styling

---

## ✅ Summary Checklist

| Feature                           | Status |
| --------------------------------- | ------ |
| Admin login                       | ✅      |
| Item quantity + purchase tracking | ✅      |
| Multiple purchase links per item  | ✅      |
| “Mark as purchased” by buyer      | ✅      |
| Buyer can add name + message      | ✅      |
| Responsive layout                 | ✅      |
| Nice animations & UI              | ✅      |
| React Query state management      | ✅      |
| MongoDB + Prisma integration      | ✅      |

---
