import { Client, Avatars, Databases, Storage, Users } from "node-appwrite";
import env from "@/src/app/env";

const client = new Client()
  .setEndpoint(env.appwrite.endpoint)
  .setProject(env.appwrite.projectId)
  .setKey(env.appwrite.apiKey);

const databases = new Databases(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const users = new Users(client);

export { client, databases, storage, avatars, users };
