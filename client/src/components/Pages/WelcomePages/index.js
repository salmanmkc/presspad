import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Welcome from './Welcome';
import { internData } from './welcomeContent';
import {
  WELCOME_PAGES,
  DASHBOARD_URL,
  ADMIN_DASHBOARD_URL,
} from '../../../constants/navRoutes';

const WelcomePages = ({ role }) => {
  const history = useHistory();
  const { id } = useParams();
  const number = internData.length;
  const endFunc = () => {
    if (role === 'admin') history.push(ADMIN_DASHBOARD_URL);
    else history.push(DASHBOARD_URL);
  };

  return (
    <div>
      {number < Number(id) ? (
        endFunc()
      ) : (
        <Welcome
          title={internData[id - 1].title}
          subTitle={internData[id - 1].subTitle}
          content={internData[id - 1].content}
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
