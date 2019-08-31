import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Tag } from "antd";
import { colors } from "./../../../theme";

// import helpers
import getUserId from "./../../../helpers/getUserId";

//  set colours for tags in the table
const tagColors = {
  "Waiting for approval": colors.primary,
  Approved: colors.green
};

export default class HostTable extends Component {
  state = {
    searchText: ""
  };

  render() {
    const { getColumnSearchProps, data, loading } = this.props;

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        ...getColumnSearchProps("name"),
        sorter: (a, b) => a.name.localeCompare(b.name),
        className: "nameCol",
        render: text => (
          <Link to={`/hosts/${getUserId(data, text)}`}>{text}</Link>
        )
      },
      {
        title: "City",
        dataIndex: "city",
        key: "city",
        ...getColumnSearchProps("city"),
        sorter: (a, b) => a.city.localeCompare(b.city)
      },
      {
        title: "Interns Hosted",
        dataIndex: "hosted",
        key: "hosted",
        filters: [
          {
            text: "0",
            value: 1
          },
          {
            text: "1-10",
            value: 11
          },
          {
            text: "> 10",
            value: 999999999999999999
          }
        ],
        onFilter: (value, record) => record.hosted < value,
        sorter: (a, b) => a.hosted - b.hosted
      },
      {
        title: "Current Balance",
        dataIndex: "currentBalance",
        key: "currentBalance",
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
        onFilter: (value, record) => record.currentBalance < value,
        sorter: (a, b) => a.currentBalance - b.currentBalance
      },
      {
        title: "Total Income",
        dataIndex: "totalIncome",
        key: "totalIncome",
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
        onFilter: (value, record) => record.totalIncome < value,
        sorter: (a, b) => a.totalIncome - b.totalIncome
      },
      {
        title: "Approval Status",
        dataIndex: "approvalStatus",
        key: "approvalStatus",
        render: status => (
          <Tag color={tagColors[status]} key={status}>
            {status && status.toUpperCase()}
          </Tag>
        ),
        filters: [
          {
            text: "Approved",
            value: "Approved"
          },
          {
            text: "Waiting for approval",
            value: "Waiting for approval"
          }
        ],
        onFilter: (value, record) => record.approvalStatus.indexOf(value) === 0
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
