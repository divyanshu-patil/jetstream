import { QueryResultsColumn } from '@jetstream/api-interfaces';
import { MapOf } from '@jetstream/types';
import { Field } from 'jsforce';
import { ReactNode } from 'react';
import { FieldDefinition } from '../salesforce/types';

export type IconType = 'action' | 'custom' | 'doctype' | 'standard' | 'utility';
export interface IconObj {
  type: IconType;
  icon: string;
  description?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface WorkerMessage<T, K = any, E = any> {
  name: T;
  data: K;
  error?: E;
}

export interface QueryFields {
  // this is also the path that will be appended to each field
  // this should end in a "." for related objects
  key: string;
  expanded: boolean;
  loading: boolean;
  filterTerm: string;
  sobject: string;
  fields: MapOf<FieldWrapper>;
  visibleFields: Set<string>;
  selectedFields: Set<string>;
}

export interface FieldWrapper {
  name: string; // this is also the field key
  label: string;
  type: string;
  sobject: string;
  relatedSobject?: string;
  // text used to filter data
  filterText: string;
  metadata: Field;
  fieldDefinition: FieldDefinition;
  // key of related object within QueryFieldMap - only populated for relationship fields and key will only exist once expanded and fetched
  relationshipKey?: string;
}

// Generic size types
export type SizeSmMdLg = SizeSm | SizeMd | SizeLg;
export type SizeSmMdLgXl = SizeSmMdLg | SizeXl;
export type SizeSmMdLgXlFull = SizeSmMdLgXl | SizeFull;
export type SizeSm = 'sm';
export type SizeMd = 'md';
export type SizeLg = 'lg';
export type SizeXl = 'xl';
export type SizeFull = 'full';

// Generic position types
export type PositionLeftRight = PositionLeft | PositionRight;
export type PositionLeftRightTopBottom = PositionLeft | PositionRight | PositionTop | PositionBottom;
export type PositionAll =
  | PositionLeftRight
  | PositionLeftRightTopBottom
  | PositionLeftTop
  | PositionLeftBottom
  | PositionTopLeft
  | PositionTopRight
  | PositionRightTop
  | PositionRightBottom
  | PositionBottomLeft
  | PositionBottomRight;
export type PositionLeft = 'left';
export type PositionLeftTop = 'left-top';
export type PositionLeftBottom = 'left-bottom';
export type PositionTop = 'top';
export type PositionTopLeft = 'top-left';
export type PositionTopRight = 'top-right';
export type PositionRight = 'right';
export type PositionRightTop = 'right-top';
export type PositionRightBottom = 'right-bottom';
export type PositionBottom = 'bottom';
export type PositionBottomLeft = 'bottom-left';
export type PositionBottomRight = 'bottom-right';

export type MimeType = MimeTypePlainText | MimeTypeCsv;
export type MimeTypePlainText = 'text/plain;charset=utf-8';
export type MimeTypeCsv = 'text/csv;charset=utf-8';

// Generic status types
export type Info = 'info';
export type Success = 'success';
export type Warning = 'warning';
export type Error = 'error';

export type Default = 'default';
export type Inverse = 'inverse';
export type Light = 'light';

export type InfoSuccessWarningError = Info | Success | Warning | Error;
export type SuccessWarningError = Success | Warning | Error;
export type DefaultInverseLight = Default | Inverse | Light;
export type BadgeTypes = SuccessWarningError | DefaultInverseLight;

export interface ListItemGroup {
  id: string;
  label: string;
  items: ListItem[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ListItem<T = string, V = any> {
  id: string;
  label: string;
  secondaryLabel?: string;
  value: T;
  meta?: V;
}

export type AndOr = 'AND' | 'OR';
export type AscDesc = 'ASC' | 'DESC';
export type FirstLast = 'FIRST' | 'LAST';

export interface ExpressionType {
  action: AndOr;
  rows: ExpressionConditionType[];
  groups: ExpressionGroupType[];
}

export interface ExpressionGroupType {
  key: number;
  action: AndOr;
  rows: ExpressionConditionType[];
}

export interface ExpressionConditionType {
  key: number;
  selected: ExpressionConditionRowSelectedItems;
}

export interface ExpressionConditionRowSelectedItems {
  resource: string | null;
  resourceGroup: string | null;
  operator: QueryFilterOperator | null;
  value: string;
}

export type QueryFilterOperator =
  | 'eq'
  | 'ne'
  | 'lt'
  | 'lte'
  | 'gt'
  | 'gte'
  | 'contains'
  | 'doesNotContain'
  | 'startsWith'
  | 'doesNotStartWith'
  | 'endsWith'
  | 'doesNotEndWith'
  | 'in'
  | 'notIn'
  | 'includes'
  | 'excludes';

export interface QueryOrderByClause {
  key: number;
  field: string | null;
  fieldLabel: string;
  order: AscDesc;
  nulls: FirstLast | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DropDownItem<T = any> {
  id: string;
  subheader?: string;
  value: string | ReactNode;
  icon?: IconObj;
  metadata?: T;
}

export interface QueryFieldHeader {
  label: string;
  accessor: string;
  title: string;
  columnMetadata: QueryResultsColumn;
}