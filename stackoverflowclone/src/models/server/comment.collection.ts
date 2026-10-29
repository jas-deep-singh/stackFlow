import { db, commentCollection } from '../name';
import { Permission } from 'node-appwrite';
import { databases } from './config';

export default async function createCommentCollection() {
    await databases.createCollection(db, commentCollection, commentCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users")
    ]);
    console.log(`Collection ${commentCollection} created successfully.`);

    await Promise.all([
        databases.createStringAttribute(db, commentCollection, 'content', 10000, true),
        databases.createEnumAttribute(db, commentCollection, 'type', ['answer', 'question'], true),
        databases.createStringAttribute(db, commentCollection, 'typeId', 255, true),
        databases.createStringAttribute(db, commentCollection, 'authorId', 255, true)
    ]);
    console.log(`Attributes for collection ${commentCollection} created successfully.`);
}