import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SpFxReportingDashboardWebPartStrings';
import SpFxReportingDashboard from './components/SpFxReportingDashboard';
import { ISpFxReportingDashboardProps } from './components/ISpFxReportingDashboardProps';

export interface ISpFxReportingDashboardWebPartProps {
  description: string;
}

export default class SpFxReportingDashboardWebPart extends BaseClientSideWebPart<ISpFxReportingDashboardWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISpFxReportingDashboardProps> = React.createElement(
      SpFxReportingDashboard,
      {
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
