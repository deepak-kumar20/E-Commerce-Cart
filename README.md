# 🛍️ Vibe Commerce - E-Commerce Shopping Cart

A modern, full-stack e-commerce shopping cart application with a clean  design. Built with React, Node.js, Express, and MongoDB.


##  What is This?

Vibe Commerce is a complete shopping cart website where you can:

- Browse products from different categories
- Add items to your cart
- Update quantities or remove items
- Complete checkout with your details
- View order confirmation with receipt



---

## ✨ Features

### What You Can Do:

- **Browse Products** - See 20 products with images and prices (from FakeStore API)
- **Shopping Cart** - Add items, change quantities, or remove them
- **Live Updates** - Cart badge shows how many items you have
- **Checkout** - Enter your name and email to place order
- **Order Receipt** - Get confirmation with order number and details
- **Responsive Design** - Works on phone, tablet, and computer

### Technical Features:

- Products fetched from external API (FakeStore API)
- Cart data saved to MongoDB database
- Orders saved to MongoDB when you checkout
- Clean  design (blue buttons, simple layout)
- Smooth animations and loading effects
- MVC architecture (organized code structure)

---

## 🛠️ Technology Used
**Frontend (What You See):**

- React - For the user interface
- Tailwind CSS - For styling and colors
- React Router - For page navigation

**Backend (Behind the Scenes):**

- Node.js & Express - Server that handles requests
- MongoDB - Database to store cart and orders
- REST API - Communication between frontend and backend

**Design:**

- Roboto font (Google's font)
- Clean blue (#1a73e8) and gray colors

---

## 📁 How the Code is Organized

```
E-Com Cart/
├── frontend/              # Website you see in browser
│   ├── src/
│   │   ├── components/   # Reusable pieces (Navbar, Product cards, etc.)
│   │   ├── pages/        # Full pages (Products page, Cart page)
│   │   └── context/      # Manages cart state
│   └── public/           # Images and static files
│
└── backend/              # Server handling data
    ├── controllers/      # Business logic (what happens when you click)
    ├── routes/          # API endpoints (/api/products, /api/cart, etc.)
    ├── models/          # Database structure (Cart, Order)
    └── server.js        # Main server file
```

---

## 🚀 How to Run This Project

### What You Need First:

- **Node.js** installed on your computer ([Download here](https://nodejs.org/))
- **MongoDB** installed OR create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Step 1: Download the Code

```bash
# If you have git installed:
git clone <your-repo-url>
cd "E-Com Cart"

# Or just download and extract the ZIP file
```

### Step 2: Setup Backend (Server)

```bash
# Go to backend folder
cd backend

# Install required packages (this takes 1-2 minutes)
npm install

# The backend will automatically connect to MongoDB when you start it
# MongoDB URI is already configured in .env file
```
### Step 3: Setup Frontend (Website)

```bash
# Open a new terminal, go to frontend folder
cd frontend

# Install required packages (this takes 1-2 minutes)
npm install
```

### Step 4: Start Everything

```bash
# In backend folder (first terminal):
npm run dev
# You should see: "Server running on port 5000" and "MongoDB Connected!"

# In frontend folder (second terminal):
npm start
# Browser will automatically open to http://localhost:3000
```

**That's it! 🎉 The website should now be running!**

---

## 🎮 How to Use the Application

1. **Browse Products**: You'll see 20 products on the home page
2. **Add to Cart**: Click "Add to Cart" button on any product
3. **View Cart**: Click the cart icon (🛒) in the top right
4. **Update Items**: Use + and - buttons to change quantities
5. **Checkout**: Click "Proceed to Checkout" button
6. **Enter Details**: Fill in your name (e.g., "Deepak Kumar") and email
7. **Place Order**: Click "Confirm Checkout"
8. **See Receipt**: You'll get an order number and confirmation!

---

## 🗄️ What Gets Saved to Database

### Cart Items (Temporary)

When you add items to cart, they're saved to MongoDB with:

- Product ID
- Product name and price
- Quantity
- Total amount

### Orders (Permanent)

When you checkout, the order is saved to MongoDB with:

- Order number (like VC1730123456789)
- Your name and email
- All items you bought
- Prices, tax (10%), shipping ($5.99)
- Order date and time

**Note:** Products are NOT saved to database - they come from FakeStore API!

---

## 🔧 For Developers: API Endpoints

### Products

- `GET /api/products` - Get all 20 products from FakeStore API
- `GET /api/products/:id` - Get single product

### Cart

- `GET /api/cart?userId=guest` - Get cart items
- `POST /api/cart` - Add item to cart (sends product data)
- `PUT /api/cart/:productId` - Update quantity
- `DELETE /api/cart/:productId` - Remove item

### Checkout

- `POST /api/checkout` - Place order (clears cart, saves order)
- `GET /api/checkout/orders` - Get all orders
- `GET /api/checkout/orders/:orderNumber` - Get specific order

---

## 🎨 Design Details

**Colors:**

- Primary Blue: `#1a73e8` (Google blue for buttons)
- Text Gray: `#5f6368` (for secondary text)
- Success Green: `#34a853` (for success messages)
- Error Red: `#ea4335` (for errors)

**Font:** Roboto (Google's official font)

**Style:**

- No gradients (clean and flat)
- Simple borders instead of heavy shadows
- White backgrounds
- Smooth hover effects

---

## 🐛 Common Issues & Solutions

### Problem: "MongoDB connection error"

**Solution**: Make sure MongoDB is running:

```bash
# On Mac:
brew services start mongodb-community

# Or use MongoDB Atlas cloud database
# Update MONGODB_URI in backend/.env file with your Atlas connection string
```

### Problem: "Port 5000 already in use"

**Solution**: Kill the process using port 5000:

```bash
lsof -ti:5000 | xargs kill -9
```

### Problem: "Products not loading"

**Solution**:

- Make sure backend is running (should see "Server running on port 5000")
- Check if you can access: http://localhost:5000/api/products
- FakeStore API might be down (rare) - try again later

### Problem: "Cart not saving to MongoDB"

**Solution**:

- Make sure MongoDB is connected (check backend terminal for "MongoDB Connected!")
- Try restarting the backend server

---


## 👨‍💻 About the Code Structure

The code follows **MVC (Model-View-Controller)** pattern:

- **Models** (`backend/models/`): Define data structure (Cart.js, Order.js)
- **Controllers** (`backend/controllers/`): Handle business logic (what happens)
- **Routes** (`backend/routes/`): Define API endpoints (URLs)
- **Views** (`frontend/src/`): What users see (React components)

**Why MVC?** Makes code easy to understand and maintain! If you want to change checkout logic, just go to `checkoutController.js` - everything is organized!

---


## 📝 Notes for Developers

- **No real payments**: This is a demo checkout (mock system)
- **Guest user only**: Everyone uses "guest" userId (no login required)
- **FakeStore API**: Free API for product data (https://fakestoreapi.com)
- **Learning project**: Perfect for understanding full-stack development!
- **Well commented code**: Read the comments in files to understand what each part does.

---

## 💬 Questions?

If something doesn't work:

1. Check the "Common Issues" section above
2. Make sure both backend and frontend are running
3. Check MongoDB is connected
4. Review the code comments - they explain what each part does!

---

**Made with ❤️ by Deepak Kumar**


