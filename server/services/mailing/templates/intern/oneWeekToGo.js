const { greeting, content, link } = require('../htmlTags');

module.exports = params => {
  const guidanceLink = link('INTERN_GUIDANCE', 'here');
  const bookingLink = link('SINGLE_BOOKING', 'here', {
    bookingId: params.bookingId,
  });

  return `
    ${greeting('Hi there,')}
    ${content(
      `In one week’s time, you’ll be beginning your stay with your PressPad media mentor-host. We imagine you’re excited and perhaps a bit nervous. We have compiled some useful guidance for you ${guidanceLink}, so check it out before you arrive.`,
    )}
    ${content(
      `You can also click ${bookingLink} to view the details of your booking.`,
    )}
    ${content(
      `We wish you all the very best with your stay and your placement.`,
    )}
  `;
};
