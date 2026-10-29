import { db, voteCollection } from '../name';
import { Permission } from 'node-appwrite';
import { databases } from './config';

export default async function createVoteCollection() {
    await databases.createCollection(db, voteCollection, voteCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users")
    ]);
    console.log(`Collection ${voteCollection} created successfully.`);

    await Promise.all([
        databases.createEnumAttribute(db, voteCollection, 'type', ['question', 'answer'], true),
        databases.createStringAttribute(db, voteCollection, 'typeId', 255, true),
        databases.createEnumAttribute(db, voteCollection, 'voteStatus', ['upvote', 'downvote'], true),
        databases.createStringAttribute(db, voteCollection, 'authorId', 255, true)
    ]);
    console.log(`Attributes for collection ${voteCollection} created successfully.`);
}