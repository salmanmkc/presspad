import React from 'react';
import { HostsSection, HostCardsWrapper } from './style';
import * as T from '../../Common/Typography';
import HostCard from './HostCard';

// https://medium.com/the-andela-way/how-to-create-a-masonry-layout-component-using-react-f30ec9ca5e99
const MasonryLayout = ({ columns, children, gap }) => {
  const columnWrapper = {};
  const result = [];

  // create columns
  for (let i = 0; i < columns; i += 1) {
    columnWrapper[`column${i}`] = [];
  }

  for (let i = 0; i < children.length; i += 1) {
    const columnIndex = i % columns;
    columnWrapper[`column${columnIndex}`].push(
      <div style={{ marginBottom: `${gap}px` }}>{children[i]}</div>,
    );
  }

  for (let i = 0; i < columns; i += 1) {
    result.push(
      <div
        style={{
          marginLeft: `${i > 0 ? gap : 0}px`,
          flex: 1,
        }}
      >
        {columnWrapper[`column${i}`]}
      </div>,
    );
  }
  return result;
};

export const Hosts = ({ listings }) => (
  <HostsSection>
    <T.H3C>available hosts </T.H3C>
    <HostCardsWrapper>
      <MasonryLayout columns={3} gap={10}>
        {[
          ...listings,
          ...listings,
          ...listings,
          ...listings,
          ...listings,
          ...listings,
          ...listings,
          ...listings,
          ...listings,
          ...listings,
          ...listings,
        ].map((listing, i) => (
          <HostCard
            img={listing.photos[0].url}
            city={listing.address.city}
            postcode={listing.address.postcode}
            long={i % 2}
          >
            {console.log(listing)}
          </HostCard>
        ))}
      </MasonryLayout>
    </HostCardsWrapper>
  </HostsSection>
);

export default Hosts;
