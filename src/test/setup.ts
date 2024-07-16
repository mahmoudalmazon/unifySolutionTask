import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

declare global {
  var signin: () => Promise<string[]>;
}

let mongo: any;
beforeAll(async () => {
  const mongo = await MongoMemoryServer.create();
  const clientOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, clientOptions);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

