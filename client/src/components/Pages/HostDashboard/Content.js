import React from "react";
import {
  Col,
  Row,
  Avatar,
  Empty,
  Table,
  Modal,
  InputNumber,
  Input
} from "antd";
import Update from "./../../Common/Update";
import Button from "./../../Common/Button";

import {
  PageWrapper,
  ContentWrapper,
  HeaderWrapper,
  HiText,
  SectionWrapperContent,
  SectionTitle,
  UpdateList,
  BookingsTableWrapper,
  BlueLink,
  ListItem,
  Number,
  ButtonsWrapper,
  ModalTitle,
  ModalContentWrapper,
  ModalDescription,
  Label,
  BoldTitle
} from "./HostDashboard.style";

import BookingSection from "./../../Common/BookingSection";
import BookingsColumns from "./BookingsColumns";

const Content = ({
  windowWidth,
  viewNumber,
  bankName,
  bankSortCode,
  bankNumber,
  income,
  donation,
  withdraw,
  bookings,
  updates,
  withdrawModalOpen,
  donateModalOpen,
  daysLeftToNextGuest,

  handleViewMoreToggle,
  handleBlurNumberInput,
  handleFocusNumberInput,
  handleNumberChange,
  handleInpuChange,
  handleOpenModal,
  handleCloseModals
}) => {
  return (
    <PageWrapper className="wrapper">
      <ContentWrapper className="child">
        <HeaderWrapper>
          <Row gutter={20} type="flex" justify="start">
            <Col xs={24} sm={4} lg={3}>
              {/*neccesarry for ProgressRing*/}
              <div style={{ position: "relative", width: 86 }}>
                <Avatar
                  size="large"
                  icon="user"
                  src={undefined}
                  style={{
                    width: "80px",
                    height: "80px",
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "42px",
                    border: "1px solid rgba(0, 0, 0, 0.15)"
                  }}
                />
              </div>
            </Col>
            <Col span={20}>
              <HiText>
                Hi {"name".split(" ")[0]}, your next guest is arriving in{" "}
                <BoldTitle>{daysLeftToNextGuest} days</BoldTitle>.
              </HiText>
            </Col>
          </Row>
        </HeaderWrapper>
        <BookingSection
          jobTitle={"jobTitle"}
          bio={"bio"}
          name={"hostName"}
          userId={"hostId"}
          organisationName={"organisationName"}
          bookingId={"bookingId"}
          startDate={Date.now()}
          endDate={Date.now() + 15000000000}
          timeString={"timeString"}
          profileImage={"hostProfileImage || randomProfile"}
          title={"title"}
          userRole={"intern"}
        />
        <section>
          <SectionWrapperContent style={{ minHeight: 200 }}>
            <SectionTitle>Your updates</SectionTitle>
            <UpdateList>
              {updates.length > 0 ? (
                updates.map(item => (
                  <Update item={item} key={item._id} userRole="host" />
                ))
              ) : (
                <Empty description="No updates, chill out :)" />
              )}
            </UpdateList>
          </SectionWrapperContent>
        </section>
        <Row gutter={20} type="flex" justify="start">
          <Col lg={24} xl={16} sm={24}>
            <section>
              <SectionWrapperContent style={{ minHeight: 357 }}>
                <SectionTitle>Your bookings</SectionTitle>
                {bookings > 0 ? (
                  <BookingsTableWrapper>
                    <Table
                      columns={BookingsColumns(windowWidth)}
                      dataSource={bookings.slice(0, viewNumber)}
                      rowKey={"_id"}
                      pagination={false}
                    />
                    {bookings.length > 3 && (
                      <BlueLink
                        onClick={handleViewMoreToggle}
                        style={{ marginTop: "2rem", textAlign: "center" }}
                      >
                        {viewNumber ? "View more" : "View less"}
                      </BlueLink>
                    )}
                  </BookingsTableWrapper>
                ) : (
                  <Empty description="This intern has no bookings yet" />
                )}
              </SectionWrapperContent>
            </section>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24}>
            <SectionWrapperContent style={{ minHeight: 357 }}>
              <ListItem>How much you’ve earned so far</ListItem>
              <Number blue>£{income}</Number>
              <ListItem>How much you’ve donated</ListItem>
              <Number>£{donation}</Number>
              <ListItem>How much you can withdraw</ListItem>
              <Number>£{withdraw}</Number>
              <ButtonsWrapper>
                <Button
                  label="Withdraw funds"
                  type="secondary"
                  style={{ width: "135px" }}
                  onClick={handleOpenModal}
                  name="withdrawModalOpen"
                />
                <Button
                  label="Donate funds"
                  type="secondary"
                  style={{ width: "135px" }}
                  onClick={handleOpenModal}
                  name="donateModalOpen"
                />
              </ButtonsWrapper>
            </SectionWrapperContent>
          </Col>
        </Row>
      </ContentWrapper>
      <div>
        <Modal
          // title="Basic Modal"
          footer={false}
          // width={600}
          visible={donateModalOpen}
          // onOk={this.handleOk}
          onCancel={handleCloseModals}
        >
          <ModalContentWrapper>
            <ModalTitle>Donate funds</ModalTitle>
            <ModalDescription>
              How much would you like to donate to the PressPad fund?
            </ModalDescription>
            <div>
              <ModalDescription bold>Funds available: </ModalDescription>
              <ModalDescription bold>£900.00 </ModalDescription>
            </div>

            <InputNumber
              onBlur={handleBlurNumberInput}
              onFocus={handleFocusNumberInput}
              defaultValue={1000}
              size="large"
              style={{ width: "140px" }}
              formatter={value =>
                `£ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={value => value.replace(/£\s?|(,*)/g, "")}
              onChange={value => handleNumberChange("donateValue", value)}
            />
            <Button
              label="Donate funds"
              type="secondary"
              style={{ width: "135px" }}
            />
            <Button
              label="Cancel"
              type="cancel"
              nobgc
              style={{ width: "135px" }}
              onClick={handleCloseModals}
            />
          </ModalContentWrapper>
        </Modal>
      </div>
      <Modal
        visible={withdrawModalOpen}
        footer={false}
        // width={600}
        // onOk={this.handleOk}
        onCancel={handleCloseModals}
      >
        <ModalContentWrapper>
          <ModalTitle>Withdraw funds</ModalTitle>
          <ModalDescription>
            Please input your bank details and the amount you’d like to withdraw{" "}
          </ModalDescription>
          <div>
            <ModalDescription bold>Funds available: </ModalDescription>
            <ModalDescription bold>£900.00 </ModalDescription>
          </div>

          <Row
            gutter={8}
            type="flex"
            justify="center"
            align="middle"
            style={{ width: "100%" }}
          >
            <Col span={10}>
              <Label>Bank name</Label>
            </Col>
            <Col span={12}>
              <Input
                size="large"
                name="bankName"
                value={bankName}
                onChange={handleInpuChange}
              />
            </Col>
          </Row>
          <Row
            gutter={8}
            type="flex"
            justify="center"
            align="middle"
            style={{ width: "100%" }}
          >
            <Col span={10}>
              <Label>Account sort code</Label>
            </Col>
            <Col span={12}>
              <Input
                size="large"
                name="bankSortCode"
                value={bankSortCode}
                onChange={handleInpuChange}
              />
            </Col>
          </Row>
          <Row
            gutter={8}
            type="flex"
            justify="center"
            align="middle"
            style={{ width: "100%" }}
          >
            <Col span={10}>
              <Label>Account number</Label>
            </Col>
            <Col span={12}>
              <Input
                size="large"
                name="bankNumber"
                value={bankNumber}
                onChange={handleInpuChange}
              />
            </Col>
          </Row>

          <Row
            gutter={8}
            type="flex"
            justify="center"
            align="middle"
            style={{ width: "100%" }}
          >
            <Col span={10}>
              <Label>Amount</Label>
            </Col>
            <Col span={12}>
              <InputNumber
                onBlur={handleBlurNumberInput}
                onFocus={handleFocusNumberInput}
                defaultValue={1000}
                size="large"
                style={{ width: "140px" }}
                formatter={value =>
                  `£ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={value => value.replace(/£\s?|(,*)/g, "")}
                onChange={value => handleNumberChange("withdrawValue", value)}
              />{" "}
            </Col>
          </Row>

          <Button
            label="Donate funds"
            type="secondary"
            style={{ width: "135px" }}
          />
          <Button
            label="Cancel"
            type="cancel"
            nobgc
            style={{ width: "135px" }}
            onClick={handleCloseModals}
          />
        </ModalContentWrapper>
      </Modal>
    </PageWrapper>
  );
};

export default Content;
