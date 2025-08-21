import nextEnv from '@next/env';
nextEnv.loadEnvConfig(process.cwd());

const { connect } = await import('../lib/db.js');
const { faker } = await import('@faker-js/faker');
const bcrypt = (await import('bcryptjs')).default;
const slugify = (await import('slugify')).default;
const User = (await import('../models/user.js')).default;
const Post = (await import('../models/post.js')).default;
const Comment = (await import('../models/comment.js')).default;

async function seed() {
    await connect();

    console.log('Clearing old data...');
    await Promise.all([
        User.deleteMany({}),
        Post.deleteMany({}),
        Comment.deleteMany({})
    ]);

    console.log('Creating users...');
    const users = [];
    for (let i = 0; i < 100; i++) {
        users.push(new User({
            username: faker.internet.username(),
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            email: faker.internet.email(),
            password: await bcrypt.hash('password123', 10),
            date: faker.date.past()
        }));
    }
    await User.insertMany(users);

    console.log('Creating posts...');
    const posts = [];
    const randomUsers = faker.helpers.arrayElements(users, 20);
    for (const user of randomUsers) {
        for (let i = 0; i < 5; i++) {
            const title = faker.lorem.sentence();
            posts.push(new Post({
                userId: user._id,
                title,
                slug: slugify(title, { lower: true }),
                content: faker.lorem.paragraphs(3),
                date: faker.date.recent()
            }));
        }
    }
    await Post.insertMany(posts);

    console.log('Creating comments...');
    const comments = [];
    for (const post of posts) {
        const commentUsers = faker.helpers.arrayElements(users, 5);
        for (const user of commentUsers) {
            comments.push(new Comment({
                userId: user._id,
                postId: post._id,
                content: faker.lorem.sentences(2),
                date: faker.date.recent()
            }));
        }
    }
    await Comment.insertMany(comments);

    console.log('✅ Database seeded!');
    process.exit(0);
}

seed().catch((err) => {
    console.error(err);
    process.exit(1);
});
