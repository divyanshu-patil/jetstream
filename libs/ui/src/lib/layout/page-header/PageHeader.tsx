/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PageHeaderProps {}

export const PageHeader: FunctionComponent<PageHeaderProps> = ({ children }) => {
  return <div className="slds-page-header">{children}</div>;
};

export default PageHeader;