const pubSub = require('./createPubSub');
const events = require('./eventTypes');
const sendEmail = require('../services/mailing');

pubSub.listen(events.coupon.CREATED, sendEmail.couponCreated);
