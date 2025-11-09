# E-Commerce API

## New Component: Multer for File Uploads

Multer Implementation Plan

1. Install dependencies:  
npm install express multer path fs  
npm install --save-dev @types/multer

2. Create directory structure:  
uploads/: Store uploaded files.   
middlewares/upload.ts: Config Multer
routes/uploadRoutes.ts: Upload Routes.  

3. Storage Configuration:  
Multer defines how files are saved using diskStorage.

4. Update productController.

5. Apply upload in productRoutes.

6. Test by using Postman.