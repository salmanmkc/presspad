const mongoose = require('mongoose');

const buildDB = require('../database/data/test');

const { getTopAdminStats } = require('../database/queries/stats');

describe('Test get all summary stats query', () => {
  beforeAll(async done => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test('Test get stats', async done => {
    getTopAdminStats().then(response => {
      expect(response).toBeDefined();
      expect(response.interns).toBe(4);
      expect(response.hosts).toBe(2);
      expect(response.approvalRequests).toBe(1);
      done();
    });
  });
});
