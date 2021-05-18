import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface ISpFxReportingDashboardProps {
  context: WebPartContext;
}

export interface ISpFxReportingDashboardPropsState {
  items: any[];
}