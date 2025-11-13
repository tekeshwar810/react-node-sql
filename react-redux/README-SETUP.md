# Setup Notes

This project was extended with protected routing, auth pages and a basic Product CRUD that uses Ant Design + Formik and an axios service.

Required packages (install before running):

- antd
- yup

You already have react, react-router-dom, axios and formik in package.json.

Install dependencies:

```powershell
npm install antd yup
npm install
```

Start dev server:

```powershell
npm run dev
```

Notes:
- The frontend product service uses `src/services/productService.js` which calls the configured API base URL (env var `VITE_API_BASE`) and falls back to `localStorage` when the backend is unavailable.
- Protected routes check for `localStorage.token` and redirect to `/login` if not present.
- Image uploads are converted to base64 in the browser for preview and stored in the product payload.
