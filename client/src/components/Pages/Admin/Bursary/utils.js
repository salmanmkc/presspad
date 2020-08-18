import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import {
  API_BURSARY_APPLICATIONS,
  API_UPDATE_BURSARY_APPLICATIONS,
} from '../../../../constants/apiRoutes';

export const useGetApplications = type => {
  const [data, setData] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [csvLoaded, setCsvLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchData, setFetchData] = useState(0);
  const csvRef = useRef();

  const onChangeBursaryPoints = (e, rowData) => {
    setData(oldState =>
      oldState.map(row => {
        if (row._id === rowData._id) {
          return {
            ...row,
            bursaryPoints: e.target.value,
            changed: true,
          };
        }
        return row;
      }),
    );
  };

  const updateBursaryPoints = async (e, rowData) => {
    const { _id } = rowData;
    const bursaryPoints = e.target.value;
    const { changed } = data.find(app => app._id === _id);

    // eslint-disable-next-line eqeqeq
    if (changed) {
      if (bursaryPoints && Number(bursaryPoints)) {
        try {
          await axios.patch(
            `${API_UPDATE_BURSARY_APPLICATIONS.replace(':id', _id)}`,
            { bursaryPoints },
            { params: { type: 'update-points' } },
          );
          setFetchData(count => count + 1);
        } catch (error) {
          if (error.response && error.response.data) {
            setData(oldState =>
              oldState.map(row => {
                if (row._id === _id) {
                  return {
                    ...row,
                    error: error.response.data.error,
                  };
                }
                return row;
              }),
            );
          }
        }
      } else {
        setData(oldState =>
          oldState.map(row => {
            if (row._id === _id) {
              return {
                ...row,
                error: 'You must enter numbers',
              };
            }
            return row;
          }),
        );
      }
    }
  };

  const inviteToInterview = async rowData => {
    const { _id } = rowData;
    try {
      setData(oldState =>
        oldState.map(row => {
          if (row._id === _id) {
            return {
              ...row,
              inviteLoading: true,
            };
          }
          return row;
        }),
      );

      await axios.patch(
        `${API_UPDATE_BURSARY_APPLICATIONS.replace(':id', _id)}`,
        {},
        { params: { type: 'invite-to-interview' } },
      );
      setFetchData(count => count + 1);
    } catch (error) {
      if (error.response && error.response.data) {
        setData(oldState =>
          oldState.map(row => {
            if (row._id === _id) {
              return {
                ...row,
                inviteError: error.response.data.error,
                inviteLoading: false,
              };
            }
            return row;
          }),
        );
      }
    }
  };

  useEffect(() => {
    let mounted = true;
    async function getBursaryApplications() {
      setLoading(true);

      const { data: _data } = await axios.get(API_BURSARY_APPLICATIONS, {
        params: {
          type,
        },
      });

      if (mounted) {
        setData(_data);
        setLoading(false);
      }
    }

    getBursaryApplications();
    return () => {
      mounted = false;
    };
  }, [fetchData, type]);

  const getCsvData = async () => {
    setCsvLoaded(false);
    const { data: _data } = await axios.get(API_BURSARY_APPLICATIONS, {
      params: {
        type: 'all',
      },
    });
    setCsvData(_data);
    setCsvLoaded(true);
  };

  useEffect(() => {
    if (csvData && csvLoaded) {
      csvRef.current.link.click();
    }
  }, [csvData, csvLoaded]);

  return {
    data,
    loading,
    updateBursaryPoints,
    onChangeBursaryPoints,
    inviteToInterview,
    getCsvData,
    csvData,
    csvRef,
  };
};
