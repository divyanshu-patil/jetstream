import { AsyncJob, AsyncJobType } from '@jetstream/types';
import { Icon } from '@jetstream/ui';
import moment from 'moment-mini';
import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { downloadJob } from './job-utils';

const JOBS_WITH_DOWNLOAD: AsyncJobType[] = ['BulkDelete'];

export interface JobProps {
  job: AsyncJob;
  dismiss: (job: AsyncJob) => void;
}

export const Job: FunctionComponent<JobProps> = ({ job, dismiss }) => {
  const status = job.statusMessage || job.status;
  let message;
  const inProgress = job.status === 'pending' || job.status === 'in-progress';
  if (inProgress) {
    message = 'Job started ' + moment(job.started).fromNow();
  } else {
    message = 'Job finished ' + moment(job.finished).fromNow();
  }
  return (
    <li className="slds-global-header__notification">
      <div className="slds-has-flexi-truncate slds-p-around_xxx-small">
        <div className="slds-grid slds-grid_align-spread">
          <div className="slds-has-flexi-truncate">
            <h3 className="slds-truncate" title={job.title}>
              <strong>{job.title}</strong>
            </h3>
            <p
              className={classNames('slds-truncate', {
                'slds-text-color_success': job.status === 'success',
                'slds-text-color_error': job.status === 'failed',
              })}
              title={status}
            >
              {status}
            </p>
            <p className="slds-text-color_weak">
              {inProgress && (
                <abbr className="slds-m-horizontal_xx-small">
                  <Icon
                    type="utility"
                    icon="sync"
                    className="slds-icon slds-icon-text-default slds-icon_xx-small"
                    containerClassname="slds-icon_container slds-icon-utility-sync"
                    description="in progress"
                  />
                </abbr>
              )}
              {job.status === 'success' && (
                <abbr className="slds-m-horizontal_xx-small">
                  <Icon
                    type="utility"
                    icon="success"
                    className="slds-icon slds-icon-text-success slds-icon_xx-small"
                    containerClassname="slds-icon_container slds-icon-utility-success"
                    description="in progress"
                  />
                </abbr>
              )}
              {job.status === 'aborted' && (
                <abbr className="slds-m-horizontal_xx-small">
                  <Icon
                    type="utility"
                    icon="info"
                    className="slds-icon slds-icon-text-info slds-icon_xx-small"
                    containerClassname="slds-icon_container slds-icon-utility-info"
                    description="in progress"
                  />
                </abbr>
              )}
              {job.status === 'failed' && (
                <abbr className="slds-m-horizontal_xx-small">
                  <Icon
                    type="utility"
                    icon="error"
                    className="slds-icon slds-icon-text-error slds-icon_xx-small"
                    containerClassname="slds-icon_container slds-icon-utility-error"
                    description="in progress"
                  />
                </abbr>
              )}
              {message}
              {/* TODO: have an optional link to SFDC or some abort action - would need to store data on the job to know what to do */}
              {/* TODO: add way to dismiss an item */}
              {/* TODO: do we need an entire page dedicated to event results? */}
            </p>
          </div>
        </div>
        {job.results && (
          <div className="slds-m-top_x-small slds-grid slds-grid_align-spread">
            <div className="slds-col">
              {JOBS_WITH_DOWNLOAD.includes(job.type) && (
                <button className="slds-button slds-button_neutral" onClick={() => downloadJob(job)}>
                  <Icon type="utility" icon="download" className="slds-button__icon slds-button__icon_left" omitContainer />
                  Download Results
                </button>
              )}
            </div>
            <div className=" slds-col">
              <button className="slds-button slds-button_neutral" onClick={() => dismiss(job)}>
                Dismiss
              </button>
            </div>
          </div>
        )}
      </div>
    </li>
  );
};

export default Job;