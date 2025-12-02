# Frontend Environment Setup

## Error: "Request failed with status code 404"

This error occurs because the backend URL is not configured in the frontend environment variables.

## Solution: Create .env file

1. **Navigate to the `frontend` folder**

2. **Create a new file named `.env`** (make sure it starts with a dot)

3. **Add the following content:**

```env
VITE_BACKEND_URL=http://localhost:4000
```

**If your backend is running on a different port or URL, update it accordingly:**
- For local development: `http://localhost:4000` (or whatever port your backend uses)
- For production: `https://your-backend-domain.com`

## Example .env file

```env
# Backend API URL
VITE_BACKEND_URL=http://localhost:4000
```

## After creating .env file

1. **Restart your frontend development server**
   - Stop the server (Ctrl+C)
   - Start it again with `npm run dev` or `npm start`

2. **Verify the backend is running**
   - Make sure your backend server is running on the port specified in `.env`
   - Default backend port is `4000`

## Important Notes

- The `.env` file should be in the `frontend` folder, not the root folder
- **Never commit the `.env` file to Git** - it may contain sensitive URLs
- In Vite, environment variables must start with `VITE_` to be accessible in the frontend
- After changing `.env`, you must restart the development server

## Troubleshooting

If you still get 404 errors after setting up `.env`:

1. **Check that the backend server is running:**
   ```bash
   # In the backend folder
   npm start
   # or
   npm run server
   ```

2. **Verify the backend URL is correct:**
   - Check what port your backend is running on
   - Make sure the URL in `.env` matches (e.g., `http://localhost:4000`)

3. **Check browser console for the actual URL being called:**
   - Open browser DevTools (F12)
   - Go to Network tab
   - Try the action that causes the error
   - Check what URL is being called

4. **Make sure you restarted the frontend server** after creating/modifying `.env`

