const mongoose = require("mongoose");

const Account = require("../../../database/models/Account");
const buildDB = require("../../../database/data/test");

describe("Test Review schema", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test("Account schema should be defined", async () => {
    expect(Account).toBeDefined();
  });


  test("should store Account schema correctly", async (done) => {
    const accounts = await Account.find();
    // 1 admin + 4 interns + 5 hosts + 4 orgs
    expect(accounts).toHaveLength(1 + 4 + 5 + 4);
    done();
  });

  test("should create a new Account correctly", async (done) => {
    const newAccountForOrg = {
      income: 2500,
      withdrawal: 0,
      donation: 0,
      couponsValue: 500,
      currentBalance: 2000,
    };

    const storedAccount = await Account.create(newAccountForOrg);

    const allAccounts = await Account.find();
    expect(allAccounts).toHaveLength((1 + 4 + 5 + 4) + 1);

    expect(storedAccount).toBeDefined();
    expect(storedAccount.income).toBe(2500);
    expect(storedAccount.withdrawal).toBe(0);
    expect(storedAccount.donation).toBe(0);
    expect(storedAccount.couponsValue).toBe(500);
    expect(storedAccount.currentBalance).toBe(2000);
    done();
  });
});