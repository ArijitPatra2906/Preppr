# 🍳 Preppr - AI-Powered Recipe Discovery Platform

<div align="center">

![Preppr Logo](frontend/public/orange-logo.png)

**Cook Smarter, Waste Less**

[![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue?style=flat&logo=react)](https://reactjs.org/)
[![Strapi](https://img.shields.io/badge/Strapi-5.33.4-purple?style=flat&logo=strapi)](https://strapi.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Live Demo](https://preppr.vercel.app/)

</div>

---

## 📖 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About

**Preppr** is an innovative web application that revolutionizes home cooking by combining AI-powered recipe generation, computer vision pantry scanning, and smart meal recommendations. Say goodbye to food waste and the daily "what's for dinner?" dilemma.

### The Problem We Solve

- 🗑️ **Food Waste**: ~30% of groceries end up in the trash
- 🤔 **Decision Fatigue**: Daily struggle to decide what to cook
- 📱 **Fragmented Tools**: Switching between apps for recipes, pantry management, and meal planning
- ⏰ **Time Constraints**: Limited time to search for recipes that match available ingredients

### Our Solution

Preppr provides an all-in-one platform where you can:

1. **Scan your pantry** with your phone camera (AI detects ingredients automatically)
2. **Get instant recipe suggestions** based on what you already have
3. **Browse thousands of recipes** from cuisines around the world
4. **Generate custom recipes** for any dish using AI
5. **Save favorites** and export them as PDFs for offline cooking

---

## ✨ Features

### 🔍 Smart Pantry Management

- **AI-Powered Scanning**: Upload a photo of your pantry, and Gemini Vision API identifies ingredients automatically
- **Manual Entry**: Add items by name and quantity with a simple form
- **Real-Time Updates**: Edit, delete, and manage your pantry items instantly
- **Persistent Storage**: Your pantry syncs across devices and sessions

### 🤖 AI Recipe Generation

- **Custom Recipes**: Generate detailed recipes for any dish name
- **Comprehensive Details**: Each recipe includes:
  - Ingredients with exact measurements
  - Step-by-step instructions
  - Nutrition information (calories, protein, carbs, fat)
  - Prep/cook times and servings
  - Cooking tips and tricks
  - Ingredient substitution suggestions
- **Smart Image Matching**: Fetches beautiful recipe photos from Unsplash

### 🎯 Intelligent Recommendations

- **Pantry-Based Suggestions**: AI analyzes your pantry and recommends 5 recipes
- **Match Scoring**: See what % of ingredients you already have
- **Missing Ingredients List**: Know exactly what to buy
- **Diverse Cuisines**: Suggestions span multiple cooking styles

### 🌍 Recipe Discovery

- **Browse by Category**: Breakfast, Lunch, Dinner, Snacks, Desserts
- **Browse by Cuisine**: 20+ cuisines including Italian, Chinese, Mexican, Thai, Indian, and more
- **Recipe of the Day**: Featured recipe refreshed daily
- **TheMealDB Integration**: Access thousands of curated public recipes

### 💾 Collections & Export

- **Save Favorites**: Bookmark recipes to your personal collection
- **PDF Export**: Download recipes for offline access
- **Organized View**: Grid and list layouts for easy browsing

### 🔐 Authentication & Subscriptions

- **Clerk Integration**: Secure OAuth-based authentication
- **Free Tier**: 10 pantry scans/month + 5 recipe recommendations/month
- **Pro Tier**: Unlimited scans and recommendations
- **Rate Limiting**: Arcjet-powered fair usage enforcement

---

## 🛠️ Tech Stack

### Frontend

| Technology             | Purpose                                               |
| ---------------------- | ----------------------------------------------------- |
| **Next.js 16**         | React framework with App Router and Server Components |
| **React 19**           | UI library with latest features                       |
| **Tailwind CSS 4**     | Utility-first styling                                 |
| **Shadcn UI**          | Accessible component library                          |
| **Clerk**              | Authentication and user management                    |
| **Arcjet**             | Security (WAF, rate limiting, bot detection)          |
| **Lucide React**       | Icon library                                          |
| **Sonner**             | Toast notifications                                   |
| **React PDF Renderer** | PDF export functionality                              |

### Backend

| Technology      | Purpose                       |
| --------------- | ----------------------------- |
| **Strapi 5**    | Headless CMS and API platform |
| **PostgreSQL**  | Primary database (Neon Cloud) |
| **Node.js 20+** | Runtime environment           |

### AI & External Services

| Service                  | Purpose                                                         |
| ------------------------ | --------------------------------------------------------------- |
| **Google Generative AI** | Recipe generation and image recognition (Gemini 2.5 Flash Lite) |
| **Unsplash API**         | High-quality recipe images                                      |
| **TheMealDB API**        | Public recipe database                                          |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 20.x or higher
- **npm** or **yarn**
- **PostgreSQL**: Database (or use Neon cloud)
- **API Keys**: Clerk, Google Gemini, Unsplash, Arcjet, Strapi

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/ArijitPatra2906/Preppr.git
cd Preppr
```

#### 2. Setup Backend (Strapi)

```bash
cd backend
npm install
```

Create `.env` file:

```env
HOST=0.0.0.0
PORT=1337

# Database (PostgreSQL - Neon or local)
DATABASE_CLIENT=postgres
DATABASE_HOST=your-neon-host.neon.tech
DATABASE_PORT=5432
DATABASE_NAME=your-database-name
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password
DATABASE_SSL=true

# Secrets (generate with: openssl rand -base64 32)
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret
```

Build and start Strapi:

```bash
npm run build
npm run develop
```

Create an admin account at `http://localhost:1337/admin`

#### 3. Setup Frontend (Next.js)

```bash
cd ../frontend
npm install
```

Create `.env` file:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Arcjet Security
ARCJET_KEY=ajkey_xxxxx

# Strapi Backend
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-strapi-api-token

# AI & External APIs
GEMINI_API_KEY=your-gemini-api-key
UNSPLASH_ACCESS_KEY=your-unsplash-access-key
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
Preppr/
├── frontend/                    # Next.js application
│   ├── app/                    # App Router
│   │   ├── (auth)/            # Authentication routes
│   │   ├── (main)/            # Protected application routes
│   │   ├── layout.js          # Root layout
│   │   └── page.jsx           # Landing page
│   ├── components/            # React components
│   │   ├── ui/               # Shadcn UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── RecipeCard.jsx
│   │   ├── RecipeGrid.jsx
│   │   ├── ImageUploader.jsx
│   │   └── ...
│   ├── actions/              # Server Actions
│   │   ├── recipe.actions.js
│   │   ├── pantry.actions.js
│   │   └── mealdb.actions.js
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utilities
│   └── public/               # Static assets
│
├── backend/                   # Strapi CMS
│   ├── src/
│   │   ├── api/              # API collections
│   │   │   ├── recipe/
│   │   │   ├── pantry-item/
│   │   │   └── saved-recipe/
│   │   ├── admin/
│   │   └── index.js
│   ├── config/               # Strapi configuration
│   └── database/             # Database files
│
└── README.md
```

---

## 🔐 Environment Variables

### Required Variables

#### Frontend

| Variable                            | Description              | Example                                                               |
| ----------------------------------- | ------------------------ | --------------------------------------------------------------------- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key         | `pk_test_...`                                                         |
| `CLERK_SECRET_KEY`                  | Clerk secret key         | `sk_test_...`                                                         |
| `ARCJET_KEY`                        | Arcjet API key           | `ajkey_...`                                                           |
| `NEXT_PUBLIC_STRAPI_URL`            | Strapi backend URL       | `http://localhost:1337`                                               |
| `STRAPI_API_TOKEN`                  | Strapi API token         | Generated in Strapi admin                                             |
| `GEMINI_API_KEY`                    | Google AI Studio API key | Get from [Google AI Studio](https://makersuite.google.com/app/apikey) |
| `UNSPLASH_ACCESS_KEY`               | Unsplash API key         | Get from [Unsplash Developers](https://unsplash.com/developers)       |

#### Backend

| Variable            | Description                       |
| ------------------- | --------------------------------- |
| `DATABASE_HOST`     | PostgreSQL host                   |
| `DATABASE_PORT`     | PostgreSQL port (default: 5432)   |
| `DATABASE_NAME`     | Database name                     |
| `DATABASE_USERNAME` | Database username                 |
| `DATABASE_PASSWORD` | Database password                 |
| `APP_KEYS`          | Strapi app keys (comma-separated) |
| `API_TOKEN_SALT`    | Strapi API token salt             |
| `ADMIN_JWT_SECRET`  | Strapi admin JWT secret           |

---

## 📡 API Documentation

### Server Actions (Frontend)

#### Recipe Actions

**`getOrGenerateRecipe(recipeName)`**

- Searches database or generates recipe via AI
- Returns: `{ success, recipe, cached }`

**`saveRecipeToCollection(recipeId)`**

- Bookmarks recipe for current user
- Returns: `{ success, message }`

**`getRecipesByPantryIngredients()`**

- AI suggests recipes based on pantry
- Returns: `{ success, recipes: [{ title, matchPercentage, missingIngredients }] }`

#### Pantry Actions

**`scanPantryImage(base64Image)`**

- AI detects ingredients from image
- Returns: `{ success, ingredients: [{ name, quantity }] }`

**`addPantryItemManually(name, quantity)`**

- Adds item to user's pantry
- Returns: `{ success, item }`

**`getPantryItems()`**

- Fetches all pantry items for user
- Returns: `{ success, items: [] }`

### Strapi API Endpoints

**Base URL**: `https://your-strapi-instance.strapiapp.com/api`

| Endpoint         | Method | Description                   |
| ---------------- | ------ | ----------------------------- |
| `/recipes`       | GET    | List all public recipes       |
| `/recipes/:id`   | GET    | Get single recipe             |
| `/recipes`       | POST   | Create recipe (authenticated) |
| `/pantry-items`  | GET    | Get user's pantry             |
| `/pantry-items`  | POST   | Add pantry item               |
| `/saved-recipes` | GET    | Get saved recipes             |

**Authentication**: Include `Authorization: Bearer YOUR_API_TOKEN` header

---

## 🎨 Key Features Deep Dive

### Pantry Scanning Workflow

1. User uploads pantry image via drag-drop or camera
2. Image converted to base64 and sent to server action
3. `scanPantryImage()` calls Gemini Vision API
4. AI detects ingredients and quantities
5. Results displayed in confirmation modal
6. User reviews and saves items to pantry
7. Rate limit checked via Arcjet (10/month free, unlimited pro)

### AI Recipe Generation

1. User enters dish name (e.g., "Margherita Pizza")
2. `getOrGenerateRecipe()` checks Strapi database
3. If found: Returns cached recipe (instant load)
4. If not found:
   - Calls Gemini API with detailed prompt
   - Fetches image from Unsplash
   - Saves to database for future reuse
   - Returns generated recipe
5. Recipe displayed with all details

### Smart Recommendations

1. User clicks "What can I cook?" from pantry page
2. `getRecipesByPantryIngredients()` fetches pantry items
3. AI analyzes ingredients and generates 5 recipe suggestions
4. Each suggestion includes:
   - Match percentage (e.g., "80% match")
   - Missing ingredients list
   - Recipe title and description
5. User selects recipe to view full details

---

## 🔒 Security Features

- **Arcjet WAF**: Protection against SQL injection, XSS, and common attacks
- **Bot Detection**: Blocks malicious bots, allows search engines
- **Rate Limiting**: Token bucket algorithm for fair API usage
- **Clerk Authentication**: Industry-standard OAuth 2.0
- **JWT Tokens**: Secure API authentication between frontend and backend
- **HTTPS**: Enforced in production

---

## 🎭 UI/UX Highlights

- **Neobrutalism Design**: Bold, high-contrast aesthetic with thick borders
- **Responsive**: Mobile-first design that works on all devices
- **Loading States**: Smooth skeleton loaders and spinners
- **Toast Notifications**: Real-time feedback for user actions
- **Empty States**: Helpful prompts when no data exists
- **Image Optimization**: Next.js automatic image optimization
- **Accessibility**: Keyboard navigation and ARIA labels

---

## 🚧 Roadmap

- [ ] Meal planning calendar
- [ ] Shopping list generation
- [ ] Social features (share recipes, follow users)
- [ ] Recipe ratings and reviews
- [ ] Dietary filters (vegan, gluten-free, keto)
- [ ] Nutrition tracking dashboard
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Recipe video tutorials
- [ ] Integration with grocery delivery services

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style (Prettier + ESLint)
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Arijit Patra**

- GitHub: [@ArijitPatra2906](https://github.com/ArijitPatra2906)
- Project Link: [https://github.com/ArijitPatra2906/Preppr](https://github.com/ArijitPatra2906/Preppr)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Strapi](https://strapi.io/) - Headless CMS
- [Clerk](https://clerk.com/) - Authentication
- [Google Generative AI](https://ai.google.dev/) - AI capabilities
- [TheMealDB](https://www.themealdb.com/) - Recipe database
- [Unsplash](https://unsplash.com/) - Recipe images
- [Shadcn UI](https://ui.shadcn.com/) - Component library
- [Arcjet](https://arcjet.com/) - Security platform

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [documentation](#)
2. Search [existing issues](https://github.com/ArijitPatra2906/Preppr/issues)
3. Create a [new issue](https://github.com/ArijitPatra2906/Preppr/issues/new)

---

<div align="center">

Made with ❤️ by Arijit Patra

**[⬆ back to top](#-preppr---ai-powered-recipe-discovery-platform)**

</div>
