const moment = require('moment');

const {
  createBursaryApplication,
  getBursaryApplicationsByUserIdAndWindowId,
  getBursaryWindows,
} = require('../../database/queries/bursary');

module.exports = async userId => {
  const windowApplications = await getBursaryWindows();
  const windows = windowApplications
    .filter(({ startDate, endDate }) => {
      if (
        moment(startDate).valueOf() <= moment().valueOf() &&
        moment(endDate).valueOf() >= moment().valueOf()
      ) {
        return true;
      }
      return false;
    })
    .sort(
      (a, b) => moment(b.startDate).valueOf() - moment(a).valueOf(a.startDate),
    );

  const currentWindow = windows[0];

  if (currentWindow) {
    const prevApplications = getBursaryApplicationsByUserIdAndWindowId({
      userId,
      windowId: currentWindow._id,
    });

    if (!prevApplications || !prevApplications.length) {
      await createBursaryApplication({
        bursaryWindow: currentWindow._id,
        intern: userId,
        typeOfUser:
          prevApplications && prevApplications.length ? 'existing' : 'new',
      });
    }
  }
};
