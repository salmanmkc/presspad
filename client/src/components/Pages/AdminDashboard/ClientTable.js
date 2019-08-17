import React, { Component } from "react";

import { Table } from "antd";

export default class ClientTable extends Component {
  state = {
    searchText: ""
  };

  render() {
    const { getColumnSearchProps, data, loading } = this.props;

    const columns = [
      {
        title: "Organisation",
        dataIndex: "organisation",
        key: "organisation",
        ...getColumnSearchProps("organisation"),
        sorter: (a, b) => a.organisation.localeCompare(b.organisation),
        className: "orgCol"
      },
      {
        title: "Total Credits",
        dataIndex: "totalCredits",
        key: "totalCredits",
        filters: [
          {
            text: "< 500",
            value: 500
          },
          {
            text: "500-1000",
            value: 1000
          },
          {
            text: "> 1000",
            value: 999999999999999999
          }
        ],
        onFilter: (value, record) => record.totalCredits < value,
        sorter: (a, b) => a.totalCredits - b.totalCredits
      },
      {
        title: "Credits spent",
        dataIndex: "creditsSpent",
        key: "creditsSpent",
        filters: [
          {
            text: "< 500",
            value: 500
          },
          {
            text: "500-1000",
            value: 1000
          },
          {
            text: "> 1000",
            value: 999999999999999999
          }
        ],
        onFilter: (value, record) => record.creditsSpent < value,
        sorter: (a, b) => a.creditsSpent - b.creditsSpent
      },
      {
        title: "Interns",
        dataIndex: "interns",
        key: "interns",
        sorter: (a, b) => a.interns - b.interns
      },
      {
        title: "Currently hosted",
        dataIndex: "currentlyHosted",
        key: "currentlyHosted",
        sorter: (a, b) => a.currentlyHosted - b.currentlyHosted
      }
    ];
    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        scroll={{ x: "100%" }}
        loading={loading}
      />
    );
  }
}
