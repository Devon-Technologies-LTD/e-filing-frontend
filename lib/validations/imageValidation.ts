import { IncomingForm } from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
    api: {
        bodyParser: false, // Disable Next.js default body parser
    },
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({ error: "File parsing failed" });
        }

        const image = files.image?.[0]; // Assuming "image" is the form field name

        if (!image) {
            return res.status(400).json({ error: "Image file is required" });
        }

        // Validate MIME type
        const allowedMimeTypes = ["image/jpeg", "image/png"];
        if (!image.mimetype || !allowedMimeTypes.includes(image.mimetype)) {
            return res.status(400).json({ error: "Invalid file format. Only JPG and PNG are allowed." });
        }

        // Validate file size (5MB max)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (image.size > maxSize) {
            return res.status(400).json({ error: "File size exceeds the 5MB limit." });
        }

        res.status(200).json({ message: "Image validation successful" });
    });
}