# 🖼️ How to Update Images for Demo Sites

## Quick Start - Upload Images to GitHub (Free & Easy)

### Step 1: Create a GitHub Repository
1. Go to https://github.com and sign in (or create account)
2. Click the green "New" button to create a new repository
3. Name it: `optimo-assets` 
4. Make it **Public**
5. Click "Create repository"

### Step 2: Upload Your Images
1. In your new repo, click "Add file" → "Upload files"
2. Drag & drop the images from the `roof-images-for-hosting.zip` folder
3. Click "Commit changes"

### Step 3: Get Image URLs
After upload, click on each image file. The URL will look like:
```
https://raw.githubusercontent.com/YOUR_USERNAME/optimo-assets/main/hero-closeup.jpg
```

### Step 4: Update the Template
Open `lib/templates/roofer-template.js` and find the `DEFAULT_IMAGES` object at the top:

```javascript
const DEFAULT_IMAGES = {
  hero: 'https://raw.githubusercontent.com/YOUR_USERNAME/optimo-assets/main/modern-roof.jpg',
  about: 'https://raw.githubusercontent.com/YOUR_USERNAME/optimo-assets/main/aerial-roof.jpg',
  gallery1: 'https://raw.githubusercontent.com/YOUR_USERNAME/optimo-assets/main/colorbond-roof.jpg',
  gallery2: 'https://raw.githubusercontent.com/YOUR_USERNAME/optimo-assets/main/hero-closeup.jpg',
  gallery3: 'https://raw.githubusercontent.com/YOUR_USERNAME/optimo-assets/main/modern-roof.jpg',
  gallery4: 'https://raw.githubusercontent.com/YOUR_USERNAME/optimo-assets/main/aerial-roof.jpg',
  gallery5: 'https://raw.githubusercontent.com/YOUR_USERNAME/optimo-assets/main/colorbond-roof.jpg',
}
```

Replace `YOUR_USERNAME` with your GitHub username!

---

## Image Files Included

| File | Best For | Dimensions |
|------|----------|------------|
| `hero-closeup.jpg` | Hero section, Close-up detail | 1920x600 |
| `aerial-roof.jpg` | Gallery, Aerial view | 1024x768 |
| `modern-roof.avif` | Hero section, Modern look | 1024x1024 |
| `colorbond-roof.jpg` | Gallery, Colorbond style | 1024x1024 |

---

## Alternative: Use Cloudflare Images (More Professional)

If you want faster loading:
1. Go to https://dash.cloudflare.com
2. Navigate to Images
3. Upload your images
4. Use the provided URLs in the template

---

## Need Help?

Just paste the GitHub raw URLs into the template file and redeploy to Vercel. The demo sites will automatically use the new images!
