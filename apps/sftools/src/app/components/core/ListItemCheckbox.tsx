/** @jsx jsx */
import { jsx } from '@emotion/core';
import isString from 'lodash/isString';
import { FunctionComponent } from 'react';
import Checkbox from './Checkbox';

export interface ListItemCheckboxProps {
  id: string;
  heading: string | JSX.Element;
  subheading?: string;
  isActive?: boolean;
  onSelected: () => void;
}

export const ListItemCheckbox: FunctionComponent<ListItemCheckboxProps> = ({ id, heading, subheading, isActive, onSelected }) => {
  return (
    <li className="slds-item">
      <div className="slds-grid slds-has-flexi-truncate">
        <div>
          <Checkbox id={id} checked={!!isActive} label="" hideLabel={true} onChange={() => onSelected && onSelected()} />
        </div>
        <div className="slds-col slds-grow">
          {isString(heading) ? <div>{heading}</div> : heading}
          {subheading && <div className="slds-text-body_small slds-text-color_weak">{subheading}</div>}
        </div>
      </div>
    </li>
  );
};

export default ListItemCheckbox;