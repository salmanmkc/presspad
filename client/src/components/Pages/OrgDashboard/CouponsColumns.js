import React from "react";
import moment from "moment";

import { tagColors } from "./../../../theme";
import { Badge } from "antd";

import { BlueLink } from "./OrgDashboard.style";

export default windowWidth => {
  const columnsObject = [
    {
      title: "Discount code",
      dataIndex: "code",
      key: "code"
    }
  ];

  if (windowWidth > 1110) {
    columnsObject.push({
      title: "% discount",
      dataIndex: "discountRate",
      key: "discountRate"
    });
  }

  if (windowWidth > 500) {
    columnsObject.push({
      title: "Dates valid",
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate, row) => (
        <span>
          {moment(startDate).format("DD MMM")} -{" "}
          {moment(row.endDate).format("DD MMM")}
        </span>
      )
    });
  }

  columnsObject.push({
    title: "Total potential cost",
    dataIndex: "code",
    key: "code",
    render: (_, row) => (
      <span>
        £{moment(row.endDate).diff(moment(row.startDate), "days") * 20}
      </span>
    )
  });

  if (windowWidth > 690) {
    columnsObject.push({
      title: "Amount spent so far",
      dataIndex: "usedDays",
      key: "usedDays",
      render: usedDays => <span>£{(usedDays && usedDays * 20) || 0}</span>
    });
  }

  columnsObject.push({
    title: "Intern name",
    dataIndex: "_id",
    key: "_id",
    render: (text, record) => {
      if (record.intern && record.intern && record.intern._id) {
        return (
          <BlueLink
            style={{ textTransform: "capitalize" }}
            to={`/interns/${record.intern._id}`}
          >
            {record.intern.name}
          </BlueLink>
        );
      }
      return (
        <BlueLink style={{ textTransform: "capitalize" }} as="span" disabled>
          {record.internName}
        </BlueLink>
      );
    }
  });

  if (windowWidth > 690) {
    columnsObject.push({
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: status => <Badge color={tagColors[status]} text={status} />
    });
  }

  return columnsObject;
};
