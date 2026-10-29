import { db, answerCollection } from '../name';
import { Permission } from 'node-appwrite';
import { databases } from './config';

export default async function createAnswerCollection() {
    await databases.createCollection(db, answerCollection, answerCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users")
    ]);
    console.log(`Collection ${answerCollection} created successfully.`);

    await Promise.all([
        databases.createStringAttribute(db, answerCollection, 'content', 10000, true),
        databases.createStringAttribute(db, answerCollection, 'questionId', 255, true),
        databases.createStringAttribute(db, answerCollection, 'authorId', 255, true)
    ]);
    console.log(`Attributes for collection ${answerCollection} created successfully.`);
}