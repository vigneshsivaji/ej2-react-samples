import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, Reorder, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { ActionEventArgs } from '@syncfusion/ej2-react-grids';
import { Column} from '@syncfusion/ej2-grids';
import { projectNewData } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

export class ReorderColumn extends SampleBase<{}, {}> {
  public taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks'
  };
  public ganttObj: GanttComponent;
  public columnsDropdownObj: DropDownListComponent;
  public columnIndexDropdownObj: DropDownListComponent;

  private columnNames: { [key: string]: Object }[] = [
    { id: 'TaskID', name: 'ID' },
    { id: 'TaskName', name: 'Name' },
    { id: 'StartDate', name: 'Start Date' },
    { id: 'EndDate', name: 'End Date' },
    { id: 'Duration', name: 'Duration' },
    { id: 'Progress', name: 'Progress' },
    { id: 'Predecessor', name: 'Dependency' }
  ];

  private columnsIndex: { [key: string]: Object }[] = [
    { id: '0', name: '1' },
    { id: '1', name: '2' },
    { id: '2', name: '3' },
    { id: '3', name: '4' },
    { id: '4', name: '5' },
    { id: '5', name: '6' },
    { id: '6', name: '7' }
  ];
  private columnNameChange(args: ChangeEventArgs): void {
    let columnName: string = args.value.toString();
    let index: number = this.ganttObj.treeGrid.getColumnIndexByField(columnName);
    this.columnIndexDropdownObj.value = index.toString();
  }

  private columnIndexChange(args: ChangeEventArgs): void {
    let columnName: string = this.columnsDropdownObj.value.toString();
    let toColumnIndex: number = args.value as number;
    let column: Column = this.ganttObj.treeGrid.columns[toColumnIndex] as Column;
    this.ganttObj.reorderColumns(columnName, column.field);
  }
  private actionComplete(args: ActionEventArgs): void {
    if (args.requestType === 'reorder') {
      let columnName: string = this.columnsDropdownObj.value as string;
      let index: number = this.ganttObj.treeGrid.getColumnIndexByField(columnName);
      this.columnIndexDropdownObj.value = index.toString();
    }
  }
  public labelSettings: any = {
    leftLabel: 'TaskName'
  };
  public splitterSettings: any = {
    columnIndex: 4
};
  public projectStartDate: Date = new Date('03/24/2024');
  public projectEndDate: Date = new Date('07/06/2024');
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
        <div className='col-md-9'>
          <GanttComponent id='ReorderColumn' treeColumnIndex={1} allowReordering={true}
            ref={gantt => this.ganttObj = gantt} splitterSettings={this.splitterSettings} actionComplete= {this.actionComplete.bind(this)} dataSource={projectNewData} highlightWeekends={true}
            taskFields={this.taskFields} labelSettings={this.labelSettings} height='410px'
            projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
              <ColumnsDirective>
              <ColumnDirective field='TaskID' headerText='ID' width='100' ></ColumnDirective>
              <ColumnDirective field='TaskName' headerText='Name' width='250'></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='EndDate'></ColumnDirective>
              <ColumnDirective field='Duration'></ColumnDirective>
              <ColumnDirective field='Progress'></ColumnDirective>
              <ColumnDirective field='Predecessor' headerText='Dependency'></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Selection, Reorder]} />
          </GanttComponent>
          </div>
          <div className='col-md-3 property-section'>
          <PropertyPane title='Properties'>
            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
            <tbody>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '30%' }}>
                   <div style={{ paddingTop: '10px' }}> Column </div>
                </td>
                <td style={{ width: '50%', paddingRight: '10px' }}>
                   <div>
                      <DropDownListComponent width="120px" id="columns" change={this.columnNameChange.bind(this)}
                          dataSource={this.columnNames} fields={{ text: 'name', value: 'id' }} value="TaskID"
                          ref={dropdown=> this.columnsDropdownObj = dropdown} />
                   </div>
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '30%' }}>
                   <div> Column Index </div>
                </td>
                <td style={{ width: '50%', paddingRight: '10px' }}>
                   <div>
                      <DropDownListComponent width="120px" id="columnindex" change={this.columnIndexChange.bind(this)}
                          dataSource={this.columnsIndex} fields={{ text: 'name', value: 'id' }} value="0"
                          ref={dropdown=> this.columnIndexDropdownObj = dropdown} />
                   </div>
                </td>
              </tr>
              </tbody>
            </table>
          </PropertyPane>
        </div>

        </div>
        <div id="action-description">
        <p>This sample demonstrates the reordering feature of the Gantt columns. Select column name and index from properties panel to reorder the columns. 
        You can also reorder columns by simply dragging and dropping them to the desired position.
        </p>
        </div>

        <div id="description">
        <p>Reordering can be enabled by setting the <code>allowReordering</code> property to true.
            Reordering can be done by dragging and dropping the column header from one index to another index within the TreeGrid part.</p>
            <p>The location in which the column to be placed will be indicated by two arrows symbols.</p>
            <p>In this demo, you can either reorder columns by dragging and dropping or by selecting column name and column index from dropdown to reorder the columns.
        </p>
        <b>Injecting Module:</b>
         <p>Gantt features are segregated into individual feature-wise modules. To use reordering feature, we need to
              inject <code>Reorder</code> module into the <code>services</code>.</p>
          <p>
            More information about Column Reorder can be found in this documentation section.
         </p>
         </div>
      </div>
    )
  }
}
