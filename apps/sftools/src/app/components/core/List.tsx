/** @jsx jsx */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { css, jsx } from '@emotion/core';
import { Fragment, FunctionComponent } from 'react';
import ListItem from './ListItem';
import ListItemCheckbox from './ListItemCheckbox';

export interface ListProps {
  items: any[];
  useCheckbox?: boolean;
  isActive: (item: any) => boolean;
  // function used to extract
  getContent: (
    items: any
  ) => {
    key: string;
    id?: string;
    heading?: string | JSX.Element;
    subheading?: string;
  };
  onSelected: (item: any) => void;
}

export const List: FunctionComponent<ListProps> = ({ items, useCheckbox = false, isActive, getContent, onSelected }) => {
  return (
    <Fragment>
      {Array.isArray(items) && items.length > 0 && (
        <ul
          className="slds-has-dividers_bottom-space"
          css={css`
            background-color: #fff;
          `}
        >
          {items.map((item) => {
            const { key, id, heading, subheading } = getContent(item);
            return useCheckbox ? (
              <ListItemCheckbox
                key={key}
                id={id || key}
                isActive={isActive(item)}
                heading={heading}
                subheading={subheading}
                onSelected={() => onSelected(key)}
              />
            ) : (
              <ListItem key={key} isActive={isActive(item)} heading={heading} subheading={subheading} onSelected={() => onSelected(key)} />
            );
          })}
        </ul>
      )}
    </Fragment>
  );
};

export default List;