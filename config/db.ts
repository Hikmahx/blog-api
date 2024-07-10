const mongoose = require("mongoose");
import { faker } from "@faker-js/faker";
import { config } from "dotenv";
import Post, { IPost } from "../models/Post";

config();

const generatedHTMLContent = (): string => {
  return `
    <section className="prose prose-gray max-w-none not-italic">
      <h2 className="sr-only">${faker.lorem.sentence()}</h2>
      <p>${faker.lorem.paragraph()}</p>
      <p>${faker.lorem.paragraph()}</p>
      <p>${faker.lorem.paragraph()}</p>
      <figure>
        <img
          src="${faker.image.urlPicsumPhotos()}"
          alt="${faker.lorem.sentence()}"
          className="aspect-video overflow-hidden rounded-lg object-cover"
        />
        <figcaption>${faker.lorem.sentence()}</figcaption>
      </figure>
      <p>${faker.lorem.paragraphs()}</p>
      <blockquote>
        ${faker.lorem.paragraph()}
      </blockquote>
      <h3>${faker.lorem.sentence()}</h3>
      <p>${faker.lorem.paragraph()}</p>
      <ul>
        <li>${faker.lorem.sentence()}</li>
        <li>${faker.lorem.sentence()}</li>
        <li>${faker.lorem.sentence()}</li>
      </ul>
      <p>${faker.lorem.paragraph()}</p>
    </section>
  `;
};

const createHashtagsArray = (): string[] => {
  const numberOfTags = faker.number.int({ min: 1, max: 5 });
  return Array.from({ length: numberOfTags }, () => faker.word.sample());
};

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected...");

    const postCount = await Post.countDocuments();
    if (postCount > 0) {
      console.log("Database already seeded. Skipping seeding.");
      return;
    }

    // The drop() command destroys all data from a collection.
    // Make sure you run it against proper database and collection.
    await Post.collection.drop();

    // make a bunch of post data
    let posts: IPost[] = [];

    for (let i = 0; i < 30; i++) {
      const newPost: IPost = new Post({
        title: faker.lorem.sentence(),
        content: generatedHTMLContent(),
        img: faker.image.urlPicsumPhotos(),
        author: {
          name: faker.person.fullName(),
          avatar: faker.image.avatar(),
        },
        hashtags: Array.from(
          { length: faker.number.int({ min: 1, max: 5 }) },
          () => faker.word.sample({ length: { min: 5, max: 10 }, strategy: "closest" })
        ),
      });

      posts.push(newPost);
    }

    await Post.insertMany(posts);

    console.log("Database seeded! :)");
    // mongoose.connection.close();
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};
