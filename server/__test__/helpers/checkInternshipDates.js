const { checkInternshipDates } = require('./../../helpers/general');

describe('Test checkInternshipDates', () => {
  test('1- should return flase for internshipStartDate earlier than more 3 days', () => {
    const internshipStartDate = Date.now();
    const startDate = Date.now() - 4 * 24 * 60 * 60 * 1000;

    expect(checkInternshipDates({ internshipStartDate, startDate })).toBe(
      false,
    );
  });

  test('2- should return true for internshipStartDate earlier than 3 days', () => {
    const internshipStartDate = Date.now();
    const startDate = Date.now() - 3 * 24 * 60 * 60 * 1000;

    expect(checkInternshipDates({ internshipStartDate, startDate })).toBe(true);
  });

  test('3- should return true for internshipStartDate equal startDate', () => {
    const internshipStartDate = Date.now();
    const startDate = Date.now();

    expect(checkInternshipDates({ internshipStartDate, startDate })).toBe(true);
  });

  test('4- should return true for internshipStartDate after startDate', () => {
    const internshipStartDate = Date.now();
    const startDate = Date.now() + 5 * 24 * 60 * 60 * 1000;
    const internshipEndDate = Date.now() + 10 * 24 * 60 * 60 * 1000;

    expect(
      checkInternshipDates({
        internshipStartDate,
        startDate,
        internshipEndDate,
      }),
    ).toBe(true);
  });

  test('5- should return true for startDate before internshipEndDate', () => {
    const internshipStartDate = Date.now();
    const startDate = Date.now() + 5 * 24 * 60 * 60 * 1000;
    const internshipEndDate = Date.now() + 10 * 24 * 60 * 60 * 1000;

    expect(
      checkInternshipDates({
        internshipStartDate,
        startDate,
        internshipEndDate,
      }),
    ).toBe(true);
  });

  test('6- should return false for startDate after internshipEndDate', () => {
    const internshipStartDate = Date.now();
    const startDate = Date.now() + 10 * 24 * 60 * 60 * 1000;
    const internshipEndDate = Date.now() + 5 * 24 * 60 * 60 * 1000;

    expect(
      checkInternshipDates({
        internshipStartDate,
        startDate,
        internshipEndDate,
      }),
    ).toBe(false);
  });

  test('7- should return true for endDate before internshipEndDate', () => {
    const internshipStartDate = Date.now();
    const startDate = Date.now() + 10 * 24 * 60 * 60 * 1000;
    const internshipEndDate = Date.now() + 50 * 24 * 60 * 60 * 1000;
    const endDate = Date.now() + 20 * 24 * 60 * 60 * 1000;

    expect(
      checkInternshipDates({
        internshipStartDate,
        startDate,
        internshipEndDate,
        endDate,
      }),
    ).toBe(true);
  });

  test('8- should return false for endDate after than internshipEndDate by more than 3 days', () => {
    const internshipStartDate = Date.now();
    const startDate = Date.now() + 10 * 24 * 60 * 60 * 1000;
    const internshipEndDate = Date.now() + 50 * 24 * 60 * 60 * 1000;
    const endDate = Date.now() + 54 * 24 * 60 * 60 * 1000;

    expect(
      checkInternshipDates({
        internshipStartDate,
        startDate,
        internshipEndDate,
        endDate,
      }),
    ).toBe(false);
  });

  test('9- should return false for endDate after than internshipEndDate by 3 days', () => {
    const internshipStartDate = Date.now();
    const startDate = Date.now() + 10 * 24 * 60 * 60 * 1000;
    const internshipEndDate = Date.now() + 50 * 24 * 60 * 60 * 1000;
    const endDate = Date.now() + 53 * 24 * 60 * 60 * 1000;

    expect(
      checkInternshipDates({
        internshipStartDate,
        startDate,
        internshipEndDate,
        endDate,
      }),
    ).toBe(true);
  });

  test('10- should return false for startDate and endDate out of internship interval', () => {
    const internshipStartDate = Date.now();
    const internshipEndDate = Date.now() + 10 * 24 * 60 * 60 * 1000;
    const startDate = Date.now() + 11 * 24 * 60 * 60 * 1000;
    const endDate = Date.now() + 12 * 24 * 60 * 60 * 1000;

    expect(
      checkInternshipDates({
        internshipStartDate,
        startDate,
        internshipEndDate,
        endDate,
      }),
    ).toBe(false);
  });
});
