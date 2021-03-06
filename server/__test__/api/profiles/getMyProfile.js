const request = require('supertest');
const mongoose = require('mongoose');

const buildDB = require('./../../../database/data/test/index');
const app = require('./../../../app');

describe('Tests get profile data with the image urls form google cloud', () => {
  beforeAll(async done => {
    await buildDB();
    done();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  const intern = {
    email: 'intern@test.com',
    password: '123456',
  };

  const host = {
    email: 'host@test.com',
    password: '123456',
  };

  test('tests get Intern profile successfully', async done => {
    request(app)
      .post('/api/user/login')
      .send(intern)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((error, response) => {
        const token = response.headers['set-cookie'][0].split(';')[0];
        if (error) return done(error);

        // Request should get the intern profile
        // the profileImage must contain a url
        // from google cloud
        return request(app)
          .get('/api/my-profile')
          .set('Cookie', [token])
          .expect(200)
          .expect('Content-Type', /json/)
          .end(async (err, res) => {
            if (err) return done(err);
            expect(res).toBeDefined();
            expect(res.body).toBeDefined();

            const { url } = res.body.profile.profileImage;
            expect(url).toBeTruthy();

            return done();
          });
      });
  });

  test('tests get Host profile successfully', async done => {
    request(app)
      .post('/api/user/login')
      .send(host)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((error, response) => {
        const token = response.headers['set-cookie'][0].split(';')[0];
        if (error) return done(error);

        return request(app)
          .get('/api/my-profile')
          .set('Cookie', [token])
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) return done(err);
            expect(res).toBeDefined();
            expect(res.body).toBeDefined();

            const { profile, listing } = res.body;

            expect(profile).toBeTruthy();
            expect(listing).toBeTruthy();
            expect(listing.photos).toHaveLength(3);
            expect(listing.address.addressline1).toBe('21 Roding Road');
            return done();
          });
      });
  });
});
