import { bucket } from "../../../config/firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import * as path from "path";

/**
 * Upload multiple files to Firebase Storage and return their download URLs.
 * @param files Express.Multer.File[]
 * @returns Promise<string[]> - List of download URLs
 */
export const uploadFilesToFirebase = async (
    files: Express.Multer.File[]
): Promise<string[]> => {

    const uploadedUrls: string[] = [];

    for (const file of files) {
        const fileExt = path.extname(file.originalname);
        const fileName = `${uuidv4()}${fileExt}`;

        const fileUpload = bucket.file(`products/${fileName}`);

        await fileUpload.save(file.buffer, {
            metadata: {
                contentType: file.mimetype,
            },
        });

        await fileUpload.makePublic();

        const publicUrl = `https://storage.googleapis.com/${bucket.name}/products/${fileName}`;
        uploadedUrls.push(publicUrl);
    }

    return uploadedUrls;
};