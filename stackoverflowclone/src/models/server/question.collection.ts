import { db, questionCollection } from '../name';
import { DatabasesIndexType, OrderBy, Permission } from 'node-appwrite';
import { databases } from './config';

export default async function createQuestionCollection() {
    await databases.createCollection(db, questionCollection, questionCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users")
    ]);
    console.log(`Collection ${questionCollection} created successfully.`);

    await Promise.all([
        databases.createStringAttribute(db, questionCollection, 'title', 255, true),
        databases.createStringAttribute(db, questionCollection, 'content', 10000, true),
        databases.createStringAttribute(db, questionCollection, 'authorId', 255, true),
        databases.createStringAttribute(db, questionCollection, 'tags', 1000, false),
        databases.createStringAttribute(db, questionCollection, 'attachmentId', 255, false)
    ]);
    console.log(`Attributes for collection ${questionCollection} created successfully.`);

    await Promise.all([
        databases.createIndex(db, questionCollection, 'title_index', DatabasesIndexType.Fulltext, ['title'], [OrderBy.Asc]),
        databases.createIndex(db, questionCollection, 'content_index', DatabasesIndexType.Fulltext, ['content'], [OrderBy.Asc]),
    ]);
    console.log(`Indexes for collection ${questionCollection} created successfully.`);
}