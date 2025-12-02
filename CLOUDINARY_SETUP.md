# Cloudinary Setup Guide

## Error: "Must supply api_key"

This error occurs because Cloudinary API credentials are not configured. Follow these steps to fix it:

## Step 1: Create a Cloudinary Account

1. Go to [https://cloudinary.com/users/register/free](https://cloudinary.com/users/register/free)
2. Sign up for a free account (no credit card required)
3. After signing up, you'll be taken to your dashboard

## Step 2: Get Your Cloudinary Credentials

1. In your Cloudinary dashboard, you'll see your account details
2. Look for these three values:
   - **Cloud Name** (e.g., `dxyz123abc`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz123456`)

## Step 3: Create .env File in Backend Folder

1. Navigate to the `backend` folder
2. Create a new file named `.env` (make sure it starts with a dot)
3. Add the following content with your actual values:

```env
# MongoDB Connection
MONGO_URI=your_mongodb_connection_string_here

# Cloudinary Configuration
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key

# JWT Secret for authentication (use a random string)
JWT_SECRET=your_random_jwt_secret_key_here

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password_here

# Server Port (optional, defaults to 4000)
PORT=4000
```

## Step 4: Replace Placeholder Values

Replace the placeholder values with your actual credentials:

- **CLOUDINARY_NAME**: Your Cloudinary cloud name from Step 2
- **CLOUDINARY_API_KEY**: Your Cloudinary API key from Step 2
- **CLOUDINARY_SECRET_KEY**: Your Cloudinary API secret from Step 2
- **MONGO_URI**: Your MongoDB connection string (if you haven't set this up yet)
- **JWT_SECRET**: Any random string for JWT token signing (e.g., `mySecretKey123!@#`)
- **ADMIN_EMAIL**: Email you want to use for admin login
- **ADMIN_PASSWORD**: Password for admin login

## Example .env File

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/lederdorf?retryWrites=true&w=majority
CLOUDINARY_NAME=dxyz123abc
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_SECRET_KEY=abcdefghijklmnopqrstuvwxyz123456
JWT_SECRET=mySuperSecretJWTKey2024!@#
ADMIN_EMAIL=admin@lederdorf.com
ADMIN_PASSWORD=SecurePassword123!
PORT=4000
```

## Step 5: Restart Your Backend Server

After creating the `.env` file:
1. Stop your backend server (if it's running)
2. Restart it with `npm start` or `npm run server`
3. Try adding a product again from the admin dashboard

## Important Notes

- **Never commit the `.env` file to Git** - it contains sensitive credentials
- The `.env` file should be in the `backend` folder, not the root folder
- Make sure there are no spaces around the `=` sign in your `.env` file
- Don't use quotes around the values unless Cloudinary values contain special characters

## Troubleshooting

If you still get the error after setting up:
1. Make sure the `.env` file is in the `backend` folder
2. Check that the file is named exactly `.env` (not `.env.txt` or `env`)
3. Verify there are no typos in the variable names
4. Restart your backend server after creating/modifying the `.env` file
5. Check that `dotenv` package is installed: `npm install dotenv`

