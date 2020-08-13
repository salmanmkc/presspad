import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Welcome from './Welcome';
import { internData, hostData, orgData } from './welcomeContent';
import { WELCOME_PAGES, DASHBOARD_URL } from '../../../constants/navRoutes';

const WelcomePages = ({ role }) => {
  const history = useHistory();
  const { id } = useParams();
  let data;
  if (role === 'intern') {
    data = internData;
  } else if (role === 'host') {
    data = hostData;
  } else if (role === 'organisation') {
    data = orgData;
  }
  const number = data && data.length;
  const endFunc = () => history.push(DASHBOARD_URL);
  return (
    <div>
      {number < Number(id) ? (
        endFunc()
      ) : (
        <Welcome
          title={data[id - 1].title}
          topTitle={data[id - 1].topTitle}
          bottomTitle={data[id - 1].bottomTitle}
          subTitle={data[id - 1].subTitle}
          content={data[id - 1].content}
          number={number}
          current={id - 1}
          handleClick={index =>
            index
              ? history.push(WELCOME_PAGES.replace(':id', index))
              : history.push(WELCOME_PAGES.replace(':id', Number(id) + 1))
          }
        />
      )}
    </div>
  );
};

export default WelcomePages;
