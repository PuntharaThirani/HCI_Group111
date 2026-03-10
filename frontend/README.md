🛋️ 3D Furniture Design Web App (HCI Group 111)

This is a web-based 3D Furniture Design Application built for our university HCI module. It allows users to design 2D room layouts and visualize them in full 3D.

## 🚀 How to Setup and Run the Project

Follow these steps to clone and run the project on your local machine.

### 1. Clone the Repository
Open your terminal and run the following commands:

git clone https://github.com/PuntharaThirani/HCI_Group111.git
cd HCI_Group111

2. Install Dependencies

You need to install all the required Node packages before running the app.

npm install
3. Setup Environment Variables (Crucial Step 🚨)

Since security keys are not pushed to GitHub, you need to create a .env file manually to connect to the Supabase Database.

Create a new file named .env in the root folder (same place as package.json).

Add the following lines and ask the Project Admin (Punthara) for the actual secret keys:

VITE_SUPABASE_URL=ask_admin_for_url
VITE_SUPABASE_ANON_KEY=ask_admin_for_key

4. Run the Development Server

Once the setup is done, start the app:

npm run dev

Click the link shown in the terminal (usually http://localhost:5173
) to view the app in your browser.

🛠️ Tech Stack Used

Frontend: React.js (built with Vite)

3D Rendering: Three.js & React Three Fiber

Backend/Database: Supabase (PostgreSQL & Auth)

Routing: React Router v6

Interactions: react-draggable

👥 Git Workflow for Team Members

To avoid merge conflicts, please follow this process when working on your assigned tasks:

Get the latest updates: Before starting your work, always pull the latest code from the main branch.

git pull origin main

Create a new branch: Never work directly on main. Create a branch for your specific feature (e.g., Member 01 creates an auth branch).

git checkout -b feature/your-feature-name

Commit your work:

git add .
git commit -m "Added [feature name]"

Push your branch:

git push origin feature/your-feature-name

Create a Pull Request (PR): Go to GitHub and create a Pull Request to merge your branch into main. Let the team review it before merging.

Happy Coding! 💻✨
