const welcomeImage = (location, role) => {
  const url = location.pathname.split('/');
  const id = url[url.length - 1];
  let image;
  if (role === 'intern') {
    switch (id) {
      case '1':
        image = 'presspadMovement';
        break;
      case '2':
        image = 'email';
        break;
      case '3':
        image = 'homeStay';
        break;
      case '4':
        image = 'listing';
        break;
      case '5':
        image = 'community';
        break;
      case '6':
        image = 'getStarted';
        break;
      default:
        break;
    }
  }
  return image;
};

export default welcomeImage;
