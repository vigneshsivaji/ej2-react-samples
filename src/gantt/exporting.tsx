import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, Toolbar, ExcelExport, PdfExport, ColumnsDirective, ColumnDirective, PdfExportProperties, DayMarkers} from '@syncfusion/ej2-react-gantt';
import { editingData, editingResources } from './data';
import { SampleBase } from '../common/sample-base';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { CheckBoxComponent, SwitchComponent } from '@syncfusion/ej2-react-buttons';

export class Exporting extends SampleBase<{}, {}> {
  private ganttInstance: GanttComponent;
  public isFitToWidth: any;
  public taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks',
    resourceInfo: 'resources'
  };
  public resourceFields: any = {
    id: 'resourceId',
    name: 'resourceName'
  };
  public splitterSettings: any = {
    position: "35%"
  };
  public projectStartDate: Date = new Date('03/25/2019');
  public projectEndDate: Date = new Date('07/28/2019');
  public gridLines: any = 'Both';
  public toolbar: any = ['ExcelExport', 'CsvExport', 'PdfExport'];
  public timelineSettings: any = {
    topTier: {
      unit: 'Week',
      format: 'MMM dd, y',
    },
    bottomTier: {
      unit: 'Day',
    },
  };
  public eventMarkers: any = [
            {
                day: new Date('04/02/2019'),
            }, {
                day: new Date("04/09/2019"),
                label: 'Research phase'
            }, {
                day: new Date("04/30/2019"),
                label: 'Design phase'
            }, {
                day: new Date("05/23/2019"),
                label: 'Production phase'
            }, {
                day: new Date("06/20/2019"),
                label: 'Sales and marketing phase'
            }
        ];
  public holidays: any = [
            {
                from: new Date('04/04/2019'),
                to: new Date('04/04/2019'),
                label: 'Local Holiday'
            }, {
                from: new Date('04/19/2019'),
                to: new Date('04/19/2019'),
                label: 'Good Friday'
            }, {
                from: new Date('04/30/2019'),
                to: new Date('04/30/2019'),
                label: 'Release Holiday'
            }, 
        ];
  public labelSettings: any = {
    leftLabel: 'TaskName'
  };
  public toolbarClick(args: ClickEventArgs): void {
    if (args.item.id === "GanttExport_excelexport") {
      this.ganttInstance.excelExport();
    }
    else if (args.item.id === "GanttExport_csvexport") {
      this.ganttInstance.csvExport();
    }
    else if (args.item.id === "GanttExport_pdfexport") {
      var exportProperties: PdfExportProperties = {
        fitToWidthSettings: {
            isFitToWidth: this.isFitToWidth,
        }};
      this.ganttInstance.pdfExport(exportProperties);
    }
  }

  public autofit(args: any) {
    if (args.checked) {
        this.isFitToWidth = true;
    } else {
        this.isFitToWidth = false;
    }
}
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
        <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex' }}>
                <label htmlFor="unchecked" style={{ fontSize: '15px', margin: '0px 5px 0px 5px' }}> AutoFit in Pdf Export </label>
              <div>
                <SwitchComponent id="unchecked" checked={false} change={this.autofit.bind(this)}></SwitchComponent>
              </div>
            </div>
        </div>
          <GanttComponent id='GanttExport' ref={gantt => this.ganttInstance = gantt} dataSource={editingData} dateFormat={'MMM dd, y'}
            treeColumnIndex={1} allowExcelExport={true} allowPdfExport={true} allowSelection={true} showColumnMenu={false} highlightWeekends={true}
            allowUnscheduledTasks={true} projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate} splitterSettings={this.splitterSettings}
            taskFields={this.taskFields} timelineSettings={this.timelineSettings} labelSettings={this.labelSettings} toolbarClick={this.toolbarClick.bind(this)}
            height='410px' gridLines={this.gridLines} holidays={this.holidays} eventMarkers={this.eventMarkers} toolbar={this.toolbar} resourceFields={this.resourceFields} resources={editingResources}>
            <ColumnsDirective>
              <ColumnDirective field='TaskID' width='80'></ColumnDirective>
              <ColumnDirective field='TaskName' width='250'></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Selection, Toolbar, ExcelExport, PdfExport, DayMarkers]} />
          </GanttComponent>
        </div>
        <div id="action-description">
          <p>This sample demonstrates client-side exporting of the Gantt, which allows you to export Gantt data to Excel, PDF and CSV formats. Using the Gantt toolbar buttons, you can export Gantt data to the desired format. </p>
        </div>
        <div id="description">
          <p>Gantt supports client-side exporting, which allows you to export its data to the Excel, PDF and CSV formats. </p>
          <p>In this demo, we have defined actions in the <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#toolbarclick">toolbarClick</a></code> event to export the Gantt data using the
            <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#excelexport">excelExport</a></code>,
            <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#pdfexport">pdfExport</a></code>
            and
            <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#csvexport">csvExport</a></code> methods.</p>
          <p>In addition we have provided support to export the Gantt component where each rows are auto-fit to the PDF document page width using
            <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/pdf-export/pdf-export">fitToWidthSettings</a></code>
            in <code>PdfExportProperties</code> and also it includes the functionality allowing the PDF export of <code>holidays</code> and <code>eventMarkers</code>.</p>
          <p>Injecting Module:</p>
          <p>To use Excel and CSV export features, we need to inject
              <code><a target="_blank"  href="https://ej2.syncfusion.com/react/documentation/api/gantt/#excelexport">
              excelExport
              </a></code> module into the <code>services</code>. </p>
          <p>To use PDF export feature, we need to inject
              <code><a target="_blank"  href="https://ej2.syncfusion.com/react/documentation/api/gantt/#pdfexport">
              pdfExport
              </a></code> module into the <code>services</code>. </p>
        </div>
      </div>
    )
  }
}
