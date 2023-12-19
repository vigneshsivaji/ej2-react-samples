/**
 * Sample for Doughnut chart
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, PieSeries, IAccLoadedEventArgs, AccumulationDataLabel, Inject, AccumulationTheme, IPointRenderEventArgs } from '@syncfusion/ej2-react-charts';

import { Browser } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2/base';
export let data1: any[] = [{ x: 'Chrome', y: 59.28, text: ' Chrome: 59.28%' }, { x: 'UC Browser', y: 4.37, text: 'UC Browser: 4.37%' },
{ x: 'Opera', y: 2.12, text: 'Opera: 2.12%' }, { x: 'Sogou Explorer', y: 1.73, text: 'Sogou Explorer: 1.73%' },
{ x: 'QQ', y: 3.96, text: 'QQ: 3.96%' }, { x: 'Safari', y: 5.73, text: 'Safari: 5.73%' },
{ x: 'Internet Explorer', y: 6.12, text: 'Internet Explorer: 6.12%' },
{ x: 'Edge', y: 7.48, text: 'Edge: 7.48%' },
{ x: 'Others', y: 9.21, text: 'Others: 9.21%' }];
export class AccumulationDoughnut extends SampleBase<{}, {}> {
    public pie: AccumulationChartComponent;
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <AccumulationChartComponent id="pie-chart" centerLabel={{ text: 'Mobile<br>Browsers<br>Statistics', hoverTextFormat: '${point.x}<br>Browser Share<br>${point.y}%', textStyle: { fontWeight: '600', size: Browser.isDevice ? '7px' : '15px' } }} enableSmartLabels={true} load={this.load.bind(this)} loaded={this.onChartLoad.bind(this)}  pointRender={this.pointRender} enableBorderOnMouseMove={false} legendSettings={{ visible: false }}>
                        <Inject services={[PieSeries, AccumulationDataLabel]} />
                        <AccumulationSeriesCollectionDirective>
                            <AccumulationSeriesDirective dataSource={data1} xName='x' yName='y' innerRadius='65%' border={{width:1}} startAngle= {Browser.isDevice ? 30 : 62 } dataLabel={{ visible: true, position: 'Outside', name: 'text', font: { fontWeight: '600' }, connectorStyle:{length : '20px', type: 'Curve'} }} radius= {Browser.isDevice ? '40%' : '70%'} />
                        </AccumulationSeriesCollectionDirective>
                    </AccumulationChartComponent>
                </div>
                <div id="action-description">
                    <p>This React donut chart example visualizes mobile browser statistics. The center label shows information about the data in the donut series.</p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure a donut chart. To create a donut in the pie series, we use the <code>innerRadius</code> property. The <code>centerLabel</code> property allows you to specify the default text that will be rendered in the center. You can also customize the text that will render when the mouse pointer is hovered over one of the donut slices using the <code>hoverTextFormat</code> property.
                    </p> 
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        The Charts component’s features are segregated into individual feature modules. To use pie chart, we need to inject <code>PieSeries</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information about the donut series can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/accumulation-chart/pie-dough-nut/">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
    public onChartLoad(args: IAccLoadedEventArgs): void {
        document.getElementById('pie-chart').setAttribute('title', '');
    };
        
    public load(args: IAccLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").
        replace(/light/i, "Light").replace(/contrast/i,'Contrast')   as AccumulationTheme;
    };
    public seriesColor = ['#FFE066', "#FAB666", "#F68F6A", "#F3646A", "#CC555A", "#9C4649"];

    public pointRender: EmitType<IPointRenderEventArgs> = (args: IPointRenderEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'material';
        if (selectedTheme === 'fluent' || selectedTheme === 'bootstrap5') {
            args.fill = this.seriesColor[args.point.index % 10];
        } 
        if (selectedTheme.indexOf('dark') > -1) {
            if (selectedTheme.indexOf('material') > -1) {
                args.border.color = '#303030';
            }
            else if (selectedTheme.indexOf('bootstrap5') > -1) {
                args.border.color = '#212529';
            }
            else if (selectedTheme.indexOf('bootstrap') > -1) {
                args.border.color = '#1A1A1A';
            }
            else if (selectedTheme.indexOf('fabric') > -1) {
                args.border.color = '#201f1f';
            }
            else if (selectedTheme.indexOf('fluent') > -1) {
                args.border.color = '#252423';
            }
            else if (selectedTheme.indexOf('bootstrap') > -1) {
                args.border.color = '#1A1A1A';
            }
            else if (selectedTheme.indexOf('tailwind') > -1) {
                args.border.color = '#1F2937';
            }
            else {
                args.border.color = '#222222';
            }
        }
        else if (selectedTheme.indexOf('highcontrast') > -1) {
            args.border.color = '#000000';
        }
        else {
            args.border.color = '#FFFFFF';
        }
    };
        
}