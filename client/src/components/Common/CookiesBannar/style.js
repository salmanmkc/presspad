import { colors } from '../../../theme';

const cookieStyles = {
  general: {
    background: `${colors.darkerGray}`,
    color: `${colors.white}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxHeight: 200,
    // paddingRight: 60,
    // paddingLeft: 60,
    textAlign: 'left',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 22,
    fontFamily: 'Glacial Indifference',
    zIndex: 9999,
    position: 'fixed',
    width: '100vw',
    padding: '20px',
  },
  button: {
    background: `${colors.pink}`,
    color: `${colors.white}`,
    textTransform: 'uppercase',
    fontWeight: '600',
    borderRadius: 10,
    border: `1px ${colors.pink}`,
    margin: 0,
    width: '100%',
    padding: '5px 40px',
    fontSize: '18px',
    // minWidth: '280px',
    // width: 300,
  },
};
export default cookieStyles;
