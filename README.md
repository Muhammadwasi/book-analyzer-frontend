### Overview

This is the frontend for the Character Interaction Graph app. Users can enter a book ID to analyze, and the UI displays a graph showing how characters interact. It supports toggling between real and mocked LLM responses.

### Tech Stack

- **Next.js** – React framework for SSR and fast builds
- **Tailwind CSS** – Utility-first CSS
- **DaisyUI** – Component library for Tailwind

### Getting Started

#### 1. Install dependencies

```bash
npm install
```

#### 2. Set environment variables
Create a `.env.local` file with:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```
Update the URL depending on your deployment environment (e.g., Render).


#### 3. Run the app
npm run dev

The app will be available at `http://localhost:3000`.

