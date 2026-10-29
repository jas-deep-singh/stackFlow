import { db } from "../name";
import createQuestionCollection from "./question.collection";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createVoteCollection from "./vote.collection";
import { databases } from "./config";

export default async function getOrCreateDB() {
    try {
        await databases.get(db);
        console.log('Database Connected Successfully.');
    } catch(error) {
        console.log('Database not found. Creating database and collections...', error);
        try {
            await databases.create(db, db);
            console.log('Database Created Successfully.');
            await Promise.all([
                createQuestionCollection(),
                createAnswerCollection(),
                createCommentCollection(),
                createVoteCollection()
            ]);
            console.log('All collections created successfully.');
            console.log('Database Connected Successfully.');
        } catch(error) {
            console.error('Error creating database or collections:', error);
        }
    }
    return databases;
}