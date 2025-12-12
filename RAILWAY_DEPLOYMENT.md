# Railway Deployment Guide for Backend

This guide will help you deploy your backend application to Railway.

## Prerequisites

1. A Railway account (sign up at https://railway.app)
2. Your Gmail credentials (email and App Password)
3. Your backend code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Step-by-Step Deployment

### 1. Connect Your Repository to Railway

1. Log in to [Railway](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo" (or your Git provider)
4. Choose your repository
5. **Important**: Set the **Root Directory** to `backend` in the service settings

### 2. Configure Environment Variables

Railway will automatically detect your Node.js application. You need to add your environment variables:

1. In your Railway project, go to your service
2. Click on the "Variables" tab
3. Add the following environment variables:

   ```
   USER_EMAIL=your-email@gmail.com
   APP_PASSWORD=your-16-character-app-password
   PORT=8080
   ```

   **Note**: Railway automatically sets `PORT`, but you can override it if needed.

### 3. How to Get Gmail App Password

If you don't have a Gmail App Password yet:

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Enable **2-Step Verification** (if not already enabled)
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Select "Mail" as the app and "Other" as the device
5. Generate the password
6. Copy the 16-character password (it will look like: `abcd efgh ijkl mnop`)
7. Paste it in Railway as `APP_PASSWORD` (remove spaces: `abcdefghijklmnop`)

### 4. Deploy

1. Railway will automatically deploy when you push to your main branch
2. Or click "Deploy" in the Railway dashboard
3. Wait for the build to complete
4. Your service will be live once deployment succeeds

### 5. Get Your Backend URL

1. After deployment, Railway will provide a public URL
2. It will look like: `https://your-app-name.up.railway.app`
3. Your API endpoints will be at: `https://your-app-name.up.railway.app/api/contact`

### 6. Update Your Frontend

Update your frontend API calls to use the Railway URL instead of `localhost`:

```javascript
// Example: In your frontend code
const API_URL = 'https://your-app-name.up.railway.app/api';
```

## Troubleshooting

### Build Fails
- Check that the Root Directory is set to `backend`
- Ensure `package.json` exists in the backend folder
- Check Railway logs for specific errors

### Environment Variables Not Working
- Make sure variables are added in Railway dashboard (not in `.env` file)
- Variable names must match exactly: `USER_EMAIL` and `APP_PASSWORD`
- Redeploy after adding variables

### Email Not Sending
- Verify your Gmail App Password is correct
- Check Railway logs for SMTP errors
- Ensure 2-Step Verification is enabled on your Google account

### Port Issues
- Railway automatically assigns a port via `PORT` environment variable
- Your code already handles this: `const port = process.env.PORT || 8080;`
- Don't hardcode port numbers

## Railway Settings Summary

- **Root Directory**: `backend`
- **Build Command**: `npm install` (automatic)
- **Start Command**: `npm start` (runs `node server.js`)
- **Node Version**: Railway auto-detects from `package.json` or uses latest LTS

## Environment Variables Checklist

- [ ] `USER_EMAIL` - Your Gmail address
- [ ] `APP_PASSWORD` - Your Gmail App Password (16 characters)
- [ ] `PORT` - Optional (Railway sets this automatically)

## Additional Notes

- Railway provides free tier with generous limits
- Your app will sleep after inactivity on free tier (wakes up on first request)
- Consider upgrading for always-on service
- Railway automatically handles HTTPS/SSL certificates

