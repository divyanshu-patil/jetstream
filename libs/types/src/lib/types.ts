import { SalesforceId } from 'jsforce';
import { SalesforceOrgEdition, SalesforceOrgLocaleKey } from './salesforce/types';

export interface MapOf<T> {
  [key: string]: T;
}

export interface RecordAttributes {
  type: string;
  url: string;
}

export interface ApplicationCookie {
  serverUrl: string;
}

export type UserProfileUsernameStatus = 'ACTIVE' | 'PENDING' | 'REJECTED';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  active: boolean;
  data?: any; // could be used in future
  passwordChangeRequired: boolean;
  preferredLanguages: string[];
  timezone: string;
  tenantId: string;
  usernameStatus: UserProfileUsernameStatus;
  username: string;
  verified: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Record<T = any> = { attributes?: RecordAttributes; Id?: SalesforceId } & T;

export interface SalesforceOrg {
  uniqueId: string;
  filterText: string;
  accessToken: string;
  instanceUrl: string;
  loginUrl: string;
  userId: string;
  email: string;
  organizationId: string;
  username: string;
  displayName: string;
  thumbnail?: string;
  apiVersion?: number;
  orgName?: string;
  orgCountry?: string;
  orgOrganizationType?: SalesforceOrgEdition;
  orgInstanceName?: string;
  orgIsSandbox?: boolean;
  orgLanguageLocaleKey?: SalesforceOrgLocaleKey;
  orgNamespacePrefix?: string;
  orgTrialExpirationDate?: string;
}