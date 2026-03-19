# 🛋️ 3D Furniture Design Web App — HCI Group 111

A web-based 3D Furniture Design Application built for our university HCI module.  
Users can design 2D room layouts and visualize them in full 3D.


## 🚀 How to Setup and Run

### 1. Clone the Repository

git clone https://github.com/PuntharaThirani/HCI_Group111.git

cd HCI_Group111/frontend


### 2. Install Dependencies

npm install


### 3. Setup Environment Variables 🚨

Since security keys are not pushed to GitHub, you need to create a `.env` file manually.

Create a new file named `.env` inside the `frontend` folder (same place as `package.json`) and add:

VITE_SUPABASE_URL=ask_admin_for_url
VITE_SUPABASE_ANON_KEY=ask_admin_for_key


> 🔑 Contact **Punthara** (Project Admin) for the actual secret keys.

### 4. Run the Development Server

npm run dev

Open your browser and go to **http://localhost:5173**


## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| React.js + Vite | Frontend Framework |
| Three.js + React Three Fiber | 3D Rendering |
| Supabase | Backend / Database / Auth |
| React Router v6 | Page Routing |
| Tailwind CSS | Styling |
| react-draggable | Drag Interactions |


## 👥 Git Workflow for Team Members

> ⚠️ **Never work directly on `main` branch!**

### Step 1 — Get Latest Updates
Always pull before starting your work:

git pull origin main

### Step 2 — Create Your Branch

git checkout -b feature/your-feature-name

Example: `feature/auth-page`, `feature/3d-viewer`

### Step 3 — Commit Your Work

git add .
git commit -m "Added [feature name]"


### Step 4 — Push Your Branch

git push origin feature/your-feature-name


### Step 5 — Create a Pull Request
Go to GitHub → Create a **Pull Request** → Let the team review → Merge to `main`



## 📁 Project Structure


HCI_Group111/
└── frontend/
    ├── public/
    │   ├── models/        # 3D .glb model files
    │   └── thumbnails/    # Furniture thumbnail images
    ├── src/
    │   ├── components/    # Reusable UI components
    │   ├── pages/         # Page components
    │   ├── assets/        # Images & static files
    │   └── utils/         # Helper functions
    ├── .env.example       # Environment variable template
    ├── package.json
    └── vite.config.js



## ⚠️ Important Notes

- **Never push `.env` file** to GitHub — it contains secret keys!
- `node_modules/` and `dist/` folders are ignored by Git automatically
- Always create a new branch for each feature


Happy Coding! 💻✨
