const moment = require('moment');

const {
  getOverlappingBookings,
} = require('../../../../database/queries/bookings');

const buildDB = require('../../../../database/data/test/index');
const Booking = require('../../../../database/models/Booking');

const startDateAfter = n =>
  moment
    .utc()
    .add(n, 'days')
    .startOf('day');
const endDateAfter = n =>
  moment
    .utc()
    .add(n, 'days')
    .endOf('day');

describe('Tests for booking queries', () => {
  let connection;
  let users;
  let listings;
  beforeEach(async () => {
    // build dummy data
    const {
      connection: _connection,
      users: _users,
      listings: _listings,
    } = await buildDB();
    connection = _connection;
    users = _users;
    listings = _listings;
  });

  afterAll(async () => {
    await connection.close();
  });

  test('Test check overllaping bookings', async done => {
    const { hostUser, internUser } = users;
    const { LondonListing } = listings;

    // create overlapping bookings
    const bookings = await Booking.create([
      {
        // checked request for overlapping with others
        intern: internUser,
        host: hostUser,
        listing: LondonListing,
        price: 1203333333333333333330,
        startDate: startDateAfter(210),
        endDate: endDateAfter(215),
        status: 'pending',
      },
      {
        intern: internUser,
        host: hostUser,
        listing: LondonListing,
        price: 1200,
        startDate: startDateAfter(214),
        endDate: endDateAfter(219),
        status: 'pending',
      },
      {
        intern: internUser,
        host: hostUser,
        listing: LondonListing,
        price: 1200,
        startDate: startDateAfter(212),
        endDate: endDateAfter(213),
        status: 'accepted',
      },
      {
        intern: internUser,
        host: hostUser,
        listing: LondonListing,
        price: 1200,
        startDate: startDateAfter(207),
        endDate: endDateAfter(213),
        status: 'pending',
      },
      {
        intern: internUser,
        host: hostUser,
        listing: LondonListing,
        price: 1200,
        startDate: startDateAfter(205),
        endDate: endDateAfter(219),
        status: 'confirmed',
      },
      {
        intern: internUser,
        host: hostUser,
        listing: LondonListing,
        price: 1200,
        startDate: startDateAfter(205),
        endDate: endDateAfter(219),
        status: 'confirmed',
      },
      {
        intern: internUser,
        host: hostUser,
        listing: LondonListing,
        price: 1200,
        startDate: startDateAfter(205),
        endDate: endDateAfter(219),
        status: 'canceled',
      },
      {
        // not overlapping
        intern: internUser,
        host: hostUser,
        listing: LondonListing,
        price: 1200,
        startDate: startDateAfter(205),
        endDate: endDateAfter(209),
        status: 'pending',
      },
      {
        // not overlapping
        intern: internUser,
        host: hostUser,
        listing: LondonListing,
        price: 1200,
        startDate: startDateAfter(216),
        endDate: endDateAfter(219),
        status: 'pending',
      },
    ]);

    // get checked for booking id
    const [{ _id: checkedBookingId }] = bookings.filter(
      ({ endDate: _endDate, startDate: _startDate }) => {
        return (
          endDateAfter(215).isSame(_endDate, 'day') &&
          startDateAfter(210).isSame(_startDate, 'day')
        );
      },
    );

    const startDate = startDateAfter(210);
    const endDate = endDateAfter(215);
    const overlappingBookings = await getOverlappingBookings(
      checkedBookingId,
      startDate,
      endDate,
    );

    expect(overlappingBookings).toHaveLength(5);

    // get a none overlapping booking id
    const [{ _id: notOverlappingId }] = bookings.filter(
      ({ endDate: _endDate }) => {
        return endDateAfter(209).isSame(_endDate, 'day');
      },
    );
    expect(overlappingBookings).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({ _id: notOverlappingId }),
      ]),
    );
    expect(overlappingBookings).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({ _id: notOverlappingId }),
      ]),
    );
    done();
  });
});
