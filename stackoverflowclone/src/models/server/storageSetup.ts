import { questionAttachmentBucket } from '../name';
import { Permission } from 'node-appwrite';
import { storage } from './config';

export default async function getOrCreateAttachmentBucket() {
    try {
        await storage.getBucket(questionAttachmentBucket);
        console.log('Storage Connected Successfully.');
    } catch(error) {
        console.log('Bucket not found. Creating bucket...', error);
        try {
            await storage.createBucket(questionAttachmentBucket, questionAttachmentBucket, [
                Permission.read("any"),
                Permission.read("users"),
                Permission.create("users"),
                Permission.update("users"),
                Permission.delete("users")
            ],
            false,
            undefined,
            undefined,
            ['jpg', 'png', 'gif', 'jpeg', 'webp', 'heic']
        );
        console.log(`Bucket ${questionAttachmentBucket} created successfully.`);
        console.log('Storage Connected Successfully.');
        } catch (error) {
            console.error('Error creating bucket:', error);
        }
    }
}