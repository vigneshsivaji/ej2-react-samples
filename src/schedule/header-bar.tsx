import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  ScheduleComponent, ViewsDirective, ViewDirective, Month, Inject, ActionEventArgs, EventRenderedArgs, Resize, DragAndDrop, ToolbarItemsDirective, ToolbarItemDirective
} from '@syncfusion/ej2-react-schedule';
import { applyCategoryColor } from './helper';
import './header-bar.css';
import { createElement, compile, extend } from '@syncfusion/ej2-base';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { Popup } from '@syncfusion/ej2-popups';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';

/**
 *  Schedule header customization sample
 */

export class HeaderBar extends SampleBase<{}, {}> {
  public scheduleObj: ScheduleComponent;
  private profilePopup: Popup;
  private data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).employeeEventData, null, true) as Record<string, any>[];

  private onActionComplete(args: ActionEventArgs): void {
    if (args.requestType === 'toolBarItemRendered') {
      let scheduleElement: HTMLInputElement = document.getElementById('schedule') as HTMLInputElement;
      let userIconEle: HTMLElement = scheduleElement.querySelector('.e-schedule-user-icon') as HTMLElement;
      userIconEle.onclick = () => {
        if (this.profilePopup.element.classList.contains('e-popup-close')) {
          this.profilePopup.show();
        } else {
          this.profilePopup.hide();
        }
      };
      let userContentEle: HTMLElement = createElement('div', { className: 'e-profile-wrapper' });
      scheduleElement.parentElement.appendChild(userContentEle);
      let getDOMString: (data: object) => NodeList = compile('<div class="profile-container"><div class="profile-image">' +
        '</div><div class="content-wrap"><div class="resource-name">Nancy</div>' +
        '<div class="destination">Product Manager</div><div class="status">' +
        '<div class="status-icon"></div>Online</div></div></div>');
      let output: NodeList = getDOMString({});
      this.profilePopup = new Popup(userContentEle, {
        content: output[0] as HTMLElement,
        relateTo: '.e-schedule-user-icon',
        position: { X: 'left', Y: 'bottom' },
        collision: { X: 'flip', Y: 'flip' },
        targetType: 'relative',
        viewPortElement: scheduleElement,
        width: 185,
        height: 80
      });
      this.profilePopup.hide();
    }
  }

  // custom code start
  private hidePopup: (event: KeyboardEvent | MouseEvent) => void = (event: KeyboardEvent | MouseEvent): void => {
    if (this.profilePopup.element.classList.contains('e-popup-open') && (event.type === 'keydown' && ((event as KeyboardEvent).key === 'Escape') ||
      (event.type === 'click' && event.target && !((event.target as HTMLElement).closest('.e-schedule-user-icon') ||
        (event.target as HTMLElement).closest('.e-profile-wrapper'))))) {
      this.profilePopup.hide();
    }
  }

  componentDidMount(): void {
    document.addEventListener('keydown', this.hidePopup);
    document.addEventListener('click', this.hidePopup);
  }

  componentWillUnmount(): void {
    document.removeEventListener('keydown', this.hidePopup);
    document.removeEventListener('click', this.hidePopup);
  }
  // custom code end

  private onEventRendered(args: EventRenderedArgs): void {
    applyCategoryColor(args, this.scheduleObj.currentView);
  }

  private onChange(args: ChangeEventArgs): void {
    this.profilePopup.hide();
    this.scheduleObj.showHeaderBar = args.checked;
    this.scheduleObj.dataBind();
  }

  render() {
    return (
      <div className='schedule-control-section'>
        <div className='col-lg-9 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent cssClass='schedule-header-bar' width='100%' height='650px' id='schedule' ref={t => this.scheduleObj = t}
              selectedDate={new Date(2021, 1, 15)} eventSettings={{ dataSource: this.data }} actionComplete={this.onActionComplete.bind(this)}
              eventRendered={this.onEventRendered.bind(this)}>
              <ViewsDirective>
                <ViewDirective option='Month' />
              </ViewsDirective>
              <ToolbarItemsDirective>
                <ToolbarItemDirective name='Previous' align='Left'></ToolbarItemDirective>
                <ToolbarItemDirective name='Next' align='Left'></ToolbarItemDirective>
                <ToolbarItemDirective name='DateRangeText' align='Left'></ToolbarItemDirective>
                <ToolbarItemDirective name='Today' align='Right'></ToolbarItemDirective>
                <ToolbarItemDirective align='Right' prefixIcon='user-icon' text='Nancy' cssClass='e-schedule-user-icon'></ToolbarItemDirective>
              </ToolbarItemsDirective>
              <Inject services={[Month, Resize, DragAndDrop]} />
            </ScheduleComponent>
          </div>
        </div>
        <div className='col-lg-3 property-section'>
          <PropertyPane title='Properties'>
            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
              <tbody>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '90%' }}>
                    <div className='headerbar'>
                      <CheckBoxComponent id='headerbar' checked={true} label='Show/Hide Header bar' change={this.onChange.bind(this)} ></CheckBoxComponent>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </PropertyPane>
        </div>
        <div id='action-description'>
          <p>This demo shows the way of adding custom items into the Scheduler header bar. Here, an employee image is added to the
            header bar, clicking on which will open the popup showing that person's short profile information.</p>
        </div>
        <div id='description'>
          <p>
            In this demo, a popup has been designed separately with a person’s profile info and kept in a hidden state initially. A custom
            item has been added to the Scheduler header bar by using the
            <code><a aria-label="Toolbar items" href="https://ej2.syncfusion.com/react/documentation/api/schedule/#toolbaritems">toolbarItems</a></code> property.
            Here, the default items such as previous, next, date range text, and today have been used along with external icon as custom items.
          </p>
          <p>
            In case, if the header bar of Scheduler needs to be hidden, it can be done by setting false to <code>showHeaderBar</code> property.
          </p>
        </div>
      </div>
    );
  }
}