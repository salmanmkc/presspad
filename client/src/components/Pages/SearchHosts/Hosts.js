import React from 'react';
import {
  HostsSection,
  HostCardsWrapper,
  MasonryColumn,
  MasonryItem,
} from './style';
import * as T from '../../Common/Typography';
import HostCard from './HostCard';
import { withWindowWidth } from '../../../HOCs';
import { LAPTOP_WIDTH, TABLET_WIDTH } from '../../../constants/screenWidths';

const countColumns = windowWidth => {
  if (windowWidth >= LAPTOP_WIDTH) return 3;
  if (windowWidth >= TABLET_WIDTH) return 2;
  return 1;
};
// https://medium.com/the-andela-way/how-to-create-a-masonry-layout-component-using-react-f30ec9ca5e99
const MasonryLayout = withWindowWidth(({ children, windowWidth }) => {
  const columnWrapper = {};
  const result = [];
  const columns = countColumns(windowWidth);

  // create columns
  for (let i = 0; i < columns; i += 1) {
    columnWrapper[`column${i}`] = [];
  }

  for (let i = 0; i < children.length; i += 1) {
    const columnIndex = i % columns;
    columnWrapper[`column${columnIndex}`].push(
      <MasonryItem>{children[i]}</MasonryItem>,
    );
  }

  for (let i = 0; i < columns; i += 1) {
    result.push(
      <MasonryColumn ml={i > 0}>{columnWrapper[`column${i}`]}</MasonryColumn>,
    );
  }
  return result;
});

export const Hosts = ({ listings, windowWidth }) => (
  <HostsSection>
    <T.H3C>available hosts </T.H3C>
    <HostCardsWrapper>
      <MasonryLayout>
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
          />
        ))}
      </MasonryLayout>
    </HostCardsWrapper>
  </HostsSection>
);

export default Hosts;
