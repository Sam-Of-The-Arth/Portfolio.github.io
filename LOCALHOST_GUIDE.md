# Running Your Portfolio Website on Localhost

## Quick Start

The easiest way to run your portfolio locally is using Python's built-in HTTP server.

### Method 1: Python HTTP Server (Recommended)

1. **Open PowerShell or Command Prompt** in your project folder:
   ```powershell
   cd "C:\Users\samar\OneDrive\Desktop\Portfolio Website"
   ```

2. **Start the server:**
   ```bash
   python -m http.server 8000
   ```

   Or if you have Python 2:
   ```bash
   python -m SimpleHTTPServer 8000
   ```

3. **Open your browser** and navigate to:
   ```
   http://localhost:8000
   ```

4. **To stop the server**, press `Ctrl+C` in the terminal.

---

## Method 2: Node.js http-server

If you have Node.js installed:

1. Install http-server globally (one-time):
```bash
npm install -g http-server
```

2. Navigate to your project folder and run:
```bash
http-server -p 8000
```

3. Open **http://localhost:8000** in your browser

---

## Method 3: VS Code Live Server Extension

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. The site will automatically open in your browser

---

## Method 4: PHP Built-in Server

If you have PHP installed:

```bash
php -S localhost:8000
```

Then open **http://localhost:8000** in your browser.

---

## Method 5: Direct File Opening (Limited)

You can simply double-click `index.html` or right-click and "Open with" your browser. However, this method has limitations:
- Some features may not work correctly
- CORS restrictions may apply
- Not recommended for testing

---

## Recommended: Use a Local Server

For the best testing experience, always use a local server (Method 1, 2, or 3). This ensures:
- All features work correctly
- Proper file path resolution
- Better simulation of production environment

---

## Troubleshooting

**Port already in use?**
- Use a different port: `python -m http.server 8080`
- Or find and close the process using port 8000

**Can't access localhost?**
- Make sure the server is running
- Check that your firewall isn't blocking it
- Try `127.0.0.1:8000` instead of `localhost:8000`

