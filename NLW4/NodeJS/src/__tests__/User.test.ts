import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe("User", () => {
  beforeAll(async () => {
    const connection = await createConnection(); 
    await connection.runMigrations();
  });
  
  it("Should be able to create a new User", async () => {
    const response = await request(app).post('/users')
      .send({
        email: 'example@email.com',
        name: 'User Example'
      });

      expect(response.status).toBe(201);
  });

  it("Should not to be able to create a new user with an existent email", async () => {
    const response = await request(app).post('/users')
    .send({
      email: 'example@email.com',
      name: 'User Example 2'
    })

    expect(response.status).toBe(400);
  });
});
