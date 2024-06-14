import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { GanttComponent, Inject, Selection, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { updateSampleSection } from '../common/sample-base';

const Default = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])

  const taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks'
  };
  const labelSettings: any = {
    leftLabel: 'TaskName'
  };
  const projectStartDate: Date = new Date('03/24/2024');
  const projectEndDate: Date = new Date('07/06/2024');

  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GanttComponent id='Default' dataSource={projectNewData} treeColumnIndex={1}
          taskFields={taskFields} labelSettings={labelSettings} height='410px'
          projectStartDate={projectStartDate} projectEndDate={projectEndDate}>
          <ColumnsDirective>
            <ColumnDirective field='TaskID' width='80' ></ColumnDirective>
            <ColumnDirective field='TaskName' headerText='Job Name' width='250' clipMode='EllipsisWithTooltip'></ColumnDirective>
            <ColumnDirective field='StartDate'></ColumnDirective>
            <ColumnDirective field='Duration'></ColumnDirective>
            <ColumnDirective field='Progress'></ColumnDirective>
            <ColumnDirective field='Predecessor'></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Selection]} />
        </GanttComponent>
      </div>
      <div id="action-description">
        <p>This sample visualizes the various phases involved in a manufacturing process of a product which transforms from
          a conceptual model to a sellable product.</p>
      </div>
      <div id="description">
        <p>
          In this example, you can see how to render a Gantt chart with the provided data source. The default timeline
          view week-day mode is applied to Gantt chart. The dependency lines are enabled in this example to represent the
          execution order or the hierarchy between the phases.
        </p>
        <p>
          Tooltip is enabled for all the UI in this example. To see the tooltip in action, hover the mouse over or tap
          taskbars, timeline units and dependency lines in touch enabled devices.
        </p>
        <p>
          Gantt component features are segregated into individual feature-wise modules. To use a selection support we need to inject the
          <code>Selection</code> module.
        </p>
      </div>
    </div>
  )
}
export default Default;