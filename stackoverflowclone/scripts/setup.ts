import 'dotenv/config';
import getOrCreateDB from '../src/models/server/dbSetup';
import getOrCreateAttachmentBucket from '../src/models/server/storageSetup';

async function setup() {
    console.log('Starting Appwrite setup...\n');
    try {
        console.log('Setting up database...');
        await getOrCreateDB();
        console.log('Setting up attachment storage...');
        await getOrCreateAttachmentBucket();
        console.log('Appwrite setup completed successfully.');
    } catch (error) {
        console.error('Appwrite setup failed:');
        console.error(error);
        process.exit(1);
    }
}
setup();