const mongoose = require('mongoose');
const app = require('../server/app');
const db = require('../server/db');

const request = require('supertest')(app);

beforeAll(async () => {
  const { MONGO_URI, DB_TEST } = process.env;
  db.connect(MONGO_URI, DB_TEST);
});

afterAll(async () => {
  const conn = mongoose.connection;
  await conn.dropDatabase();
  await conn.close();
});

describe('POST Auth', () => {
  test('require authentication', async () => {
    const res = await request.get('/auth/me');
    expect(res.status).toBe(401);
  });
  test('register a user', async () => {
    const res = await request.post('/auth/register').send({
      phone: '123456789',
      password: 'iamnotironman',
      firstName: 'Jan',
      lastName: 'Kowalsky',
    });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Registered! Authenticated.');
  });
  test('login a user', async () => {
    const res = await request
      .post('/auth/login')
      .send({
        phone: 123456789,
        password: 'iamnotironman',
      })
      .expect('set-cookie', 'cookie=hey; Path=/');
    console.log(res.headers['set-cookie']);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Logged in! Authenticated.');
  });
  test('should be authenticated', async () => {
    const res = await request.get('/auth/me');
    expect(res.status).toBe(200);
  });
});
