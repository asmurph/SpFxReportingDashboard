import * as React from 'react';
import styles from './SpFxReportingDashboard.module.scss';
import { ISpFxReportingDashboardProps, ISpFxReportingDashboardPropsState } from './ISpFxReportingDashboardProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";
import { SPHttpClient } from '@microsoft/sp-http';


export default class SpFxReportingDashboard extends React.Component<ISpFxReportingDashboardProps, ISpFxReportingDashboardPropsState> {
  constructor(props: ISpFxReportingDashboardProps) {
    super(props);

    this.state = {
      items: []
    };
  }

  public componentDidMount() {
    const restApi = `${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('site pages')/items`;
    this.props.context.spHttpClient.get(restApi, SPHttpClient.configurations.v1)
      .then(resp => { return resp.json(); })
      .then(items => {
        this.setState({
          items: items.value ? items.value : []
        });
      });
  }
  public render(): React.ReactElement<ISpFxReportingDashboardProps> {
    const viewFields: IViewField[] = [
      {
        name: 'Title',
        displayName: 'Name',
        sorting: true,
        maxWidth: 80
      },     
      {
        name: 'Title',
        displayName: "Name",
        sorting: true,
        maxWidth: 100,
        render: (item: any) => {
          return <a href={item['Title']}>{item['Title']}</a>;
        }
      }
    ];
    
    const groupByFields: IGrouping[] = [
      {
        name: "Title", 
        order: GroupOrder.ascending 
      }
    ];

    return (
      <ListView
      items={this.state.items}
      viewFields={viewFields}
      iconFieldName="ServerRelativeUrl"
      compact={true}
      selectionMode={SelectionMode.multiple}
      selection={this._getSelection}
      groupByFields={groupByFields} />
    );
  }

  private _getSelection(items: any[]) {
    console.log('Selected items:', items);
  }
}
