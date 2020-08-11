import InternSettings from './Intern';
import DeleteInternAccountSuccess from './Intern/DeleteAccountSuccess';
import UnderReview from './Intern/UnderReview';

// eslint-disable-next-line consistent-return
const settingComponents = (pageName, role) => {
  if (role === 'intern') {
    switch (pageName) {
      case 'setting':
        return InternSettings;
      case 'deleteAccount':
        return DeleteInternAccountSuccess;
      case 'underReview':
        return UnderReview;
      default:
        break;
    }
  }
};

export default settingComponents;
