// intern setting
import InternSettings from './Intern';
import UnderReview from './Intern/UnderReview';

// host setting
import HostSetting from './Host';
import HostUnderReview from './Host/UnderReview';
import HostBookReview from './Host/BookReview';
import OrgSetting from './Organisation';

// eslint-disable-next-line consistent-return
const settingComponents = (pageName, role) => {
  if (role === 'intern') {
    switch (pageName) {
      case 'setting':
        return InternSettings;
      case 'underReview':
        return UnderReview;
      default:
        break;
    }
  } else if (role === 'host') {
    switch (pageName) {
      case 'setting':
        return HostSetting;
      case 'underReview':
        return HostUnderReview;
      case 'bookReview':
        return HostBookReview;
      default:
        break;
    }
  } else if (role === 'organisation') {
    switch (pageName) {
      case 'setting':
        return OrgSetting;
      default:
        break;
    }
  }
};

export default settingComponents;
