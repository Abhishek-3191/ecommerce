Live Preview-https://ecommerce-deploy-2.onrender.com/

Features------
User / Customer features

User registration & login (JWT auth).

Browse products in a responsive grid with pagination.

Product detail pages with images, descriptions, stock, specs, and reviews/ratings.

Rich search (keywords) and filters:-

Category, price range, brand, rating, availability

Sort by: relevance, price (low → high / high → low), newest, top rated

Shopping cart:-

Add / remove items, change item quantities

Cart total calculation, taxes, shipping estimation

Cart persisted in localStorage (survives page refresh)

Checkout flow:-

Shipping address capture

Payment (Stripe / PayPal / Mock – configurable via env)

Order confirmation and summary

Order history and tracking:

View order status, items, tracking updates

Cancel order (when allowed)

Wishlist (save products for later).

Product reviews & ratings (authenticated users).

Responsive UI (mobile + desktop).

Admin Panel (store operator)-

Secure admin login with role-based access control.

Product management:-

Add / edit / delete products

Manage variants (size/color), stock levels, images (Cloudinary integration)

Organize products into categories & subcategories

Set discounts, coupons and featured flags

Category & brand management

Orders dashboard:-

View all orders with details and filters (date, status, customer, amount)

Update order status (Pending → Confirmed → Packed → Shipped → Out for delivery → Delivered → Returned / Cancelled)

Add tracking numbers and delivery partner info

Export orders (CSV)

Payments & refunds overview-

User management (view customers, block/unblock)

Simple analytics & charts: total sales, orders per day, best-selling products

Notification center (order updates)

Role & permission management (admin / support / logistics)

Delivery & Logistics-

Support for multiple delivery options (Standard, Express, Scheduled)

Delivery status updates visible to customer & admin

Option to capture tracking number and expected delivery date

Bonus / Extra-

Product image upload (Cloudinary)

Unit / integration tests for backend endpoints (example: /api/products)

CI friendly: scripts for lint/test/build

Tech stack------------

Frontend: React (Create React App or Next.js), Context API / Redux, TailwindCSS / plain CSS

Backend: Node.js, Express

Database: MongoDB (Mongoose ORM)

Auth: JWT (access token)

Payments: Stripe / PayPal (test mode) or mocked payment flow

File storage: Cloudinary (images), or local upload in dev

Dev tools: ESLint, Prettier, Jest + Supertest for backend tests

Deployment: Vercel (frontend) + Render / Heroku / DigitalOcean (backend), MongoDB Atlas

Architecture & data flow (high level)------------

Frontend fetches product lists from GET /api/products and renders UI.

User adds items to client-side cart (Context API) → persisted to localStorage.

On checkout, frontend sends order payload to POST /api/orders/checkout (includes cart items, shipping, payment info).

Backend validates cart, creates Order record in MongoDB, optionally creates payment intent with Stripe.

On successful payment, order status becomes Confirmed and admin receives notification; client sees order confirmation.

Admin updates order status via admin panel → backend updates DB → customers can view updated tracking info.
