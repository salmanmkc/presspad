import { colors } from '../../../theme';

const cookieStyles = {
  general: {
    background: `${colors.darkerGray}`,
    color: `${colors.white}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxHeight: 200,
    paddingRight: '2rem',
    paddingLeft: 60,
    paddingTop: 10,
    textAlign: 'left',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 22,
    fontFamily: 'Glacial Indifference',
    zIndex: 9999,
  },
  button: {
    background: `${colors.pink}`,
    color: `${colors.white}`,
    textTransform: 'uppercase',
    fontWeight: '600',
    borderRadius: 10,
    border: `1px ${colors.pink}`,
    marginTop: '15px',
    width: 300,
  },
};
export default cookieStyles;
