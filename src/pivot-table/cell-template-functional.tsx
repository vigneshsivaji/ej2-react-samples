import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PivotViewComponent, IDataOptions, IDataSet, IAxisSet, LoadEventArgs } from '@syncfusion/ej2-react-pivotview';
import { updateSampleSection } from '../common/sample-base';
import * as localData from './pivot-data/rData.json';
import './cell-template.css';

/**
 * PivotView Cell Template Sample.
 */
/* tslint:disable */
let data: IDataSet[] = (localData as any).data

let dataSourceSettings: IDataOptions = {
    expandAll: true,
    enableSorting: true,
    drilledMembers: [{ name: 'Year', items: ['FY 2015', 'FY 2017', 'FY 2018'] }],
    formatSettings: [{ name: 'ProCost', format: 'C0' }, { name: 'PowUnits', format: 'N0' }],
    rows: [
        { name: 'Year', caption: 'Production Year' },
        { name: 'HalfYear', caption: 'Half Year' }
    ],
    columns: [
        { name: 'EnerType', caption: 'Energy Type' },
        { name: 'EneSource', caption: 'Energy Source' }
    ],
    values: [
        { name: 'ProCost', caption: 'Revenue Growth' }
    ],
    filters: []
};

function CellTemplate () {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    
    let pivotObj: PivotViewComponent;

    function cellTemplate(props): JSX.Element {
        return (<span className="tempwrap e-pivot-trend-neutral pv-icons"></span>);
    }

    /* jshint ignore:start */
    function trend(): void {
        let cTable: HTMLElement[] = [].slice.call(document.getElementsByClassName("e-table"));
        let colLen: number = pivotObj.pivotValues[3].length;
        let cLen: number = cTable[1].children[0].children.length - 1;
        let rLen: number = cTable[1].children[1].children.length;
        let rowIndx: number;

        for (let k = 0; k < rLen; k++) {
            if (pivotObj.pivotValues[k] && pivotObj.pivotValues[k][0] !== undefined) {
                rowIndx = ((pivotObj.pivotValues[k][0]) as IAxisSet).rowIndex;
                break;
            }
        }
        var rowHeaders = [].slice.call(cTable[1].children[1].querySelectorAll('.e-rowsheader'));
        var rows = pivotObj.dataSourceSettings.rows;
        if (rowHeaders.length > 1) {
            for (var i = 0, Cnt = rows; i < Cnt.length; i++) {
                var fields = {};
                var fieldHeaders = [];
                for (var j = 0, Lnt = rowHeaders; j < Lnt.length; j++) {
                    var header = rowHeaders[j];
                    if (header.className.indexOf('e-gtot') === -1 && header.className.indexOf('e-rowsheader') > -1 && header.getAttribute('fieldname') === rows[i].name) {
                        var headerName = rowHeaders[j].getAttribute('fieldname') + '_' + rowHeaders[j].textContent;
                        fields[rowHeaders[j].textContent] = j;
                        fieldHeaders.push(rowHeaders[j].textContent);
                    }
                }
                if (i === 0) {
                    for (let rnt: number = 0, Lnt = fieldHeaders; rnt < Lnt.length; rnt++) {
                        if (rnt !== 0) {
                            let row: number = fields[fieldHeaders[rnt]];
                            let prevRow: number = fields[fieldHeaders[rnt - 1]];
                            for (var j = 1, ci = 1; j < cLen && ci < colLen; j++ , ci++) {
                                if (!cTable[1].children[1].children[row]) {
                                    break;
                                }
                                let node: HTMLElement = cTable[1].children[1].children[row].childNodes[j] as HTMLElement;
                                let prevNode: HTMLElement = cTable[1].children[1].children[prevRow].childNodes[j] as HTMLElement;
                                let ri: string = undefined;
                                let prevRi: string = undefined;
                                if (node) {
                                    ri = node.getAttribute("index");
                                }
                                if (prevNode) {
                                    prevRi = prevNode.getAttribute("index");
                                }
                                if (ri && ri < [].slice.call(pivotObj.pivotValues).length) {
                                    if ((pivotObj.pivotValues[prevRi][ci]).value > (pivotObj.pivotValues[ri][ci]).value && node.querySelector('.tempwrap')) {
                                        let trendElement: HTMLElement = node.querySelector('.tempwrap');
                                        trendElement.className = trendElement.className.replace('e-pivot-trend-neutral', 'e-pivot-trend-loss');
                                    } else if ((pivotObj.pivotValues[prevRi][ci]).value < (pivotObj.pivotValues[ri][ci]).value && node.querySelector('.tempwrap')) {
                                        let trendElement: HTMLElement = node.querySelector('.tempwrap');
                                        trendElement.className = trendElement.className.replace('e-pivot-trend-neutral', 'e-pivot-trend-profit');
                                    }
                                }
                            }
                        }
                    }
                } else {
                    for (let rnt: number = 0, Lnt = fieldHeaders; rnt < Lnt.length; rnt++) {
                        var row = fields[fieldHeaders[rnt]];
                        for (let j: number = 1, ci = 1; j < cLen && ci < colLen; j++ , ci++) {
                            if (!cTable[1].children[1].children[row]) {
                                break;
                            }
                            let node: HTMLElement = cTable[1].children[1].children[row].childNodes[j] as HTMLElement;
                            let prevNode: HTMLElement = cTable[1].children[1].children[row - 1].childNodes[j] as HTMLElement;
                            let ri: string = undefined;
                            let prevRi: string = undefined;
                            if (node) {
                                ri = node.getAttribute("index");
                            }
                            if (prevNode) {
                                prevRi = prevNode.getAttribute("index");
                            }
                            if (ri < [].slice.call(pivotObj.pivotValues).length) {
                                let cRowFieldName: string = (cTable[1].children[1].children[row].childNodes[0] as HTMLElement).getAttribute('fieldname');
                                let prevRowFieldName: string = (cTable[1].children[1].children[row - 1].childNodes[0] as HTMLElement).getAttribute('fieldname');
                                if ((pivotObj.pivotValues[prevRi][ci]).value > (pivotObj.pivotValues[ri][ci]).value && node.querySelector('.tempwrap') &&
                                    cRowFieldName === prevRowFieldName) {
                                    let trendElement: HTMLElement = node.querySelector('.tempwrap');
                                    trendElement.className = trendElement.className.replace('e-pivot-trend-neutral', 'e-pivot-trend-loss');
                                } else if ((pivotObj.pivotValues[prevRi][ci]).value < (pivotObj.pivotValues[ri][ci]).value && node.querySelector('.tempwrap') &&
                                    cRowFieldName === prevRowFieldName) {
                                    let trendElement: HTMLElement = node.querySelector('.tempwrap');
                                    trendElement.className = trendElement.className.replace('e-pivot-trend-neutral', 'e-pivot-trend-profit');
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    /* jshint ignore:end */

    function onLoad(args: LoadEventArgs): void {
        if (data[0].Year === undefined) {
            let date: Date;
            for (let ln: number = 0, lt: number = data.length; ln < lt; ln++) {
                date = new Date(data[ln].Date.toString());
                let dtYr: number = date.getFullYear();
                let dtMn: number = date.getMonth();
                let dtdv: number = (dtMn + 1) / 3;
                data[ln].Year = 'FY ' + dtYr;
                data[ln].Quarter = dtdv <= 1 ? 'Q1 ' + ('FY ' + dtYr) : dtdv <= 2 ? 'Q2 ' + ('FY ' + dtYr) :
                    dtdv <= 3 ? 'Q3 ' + ('FY ' + dtYr) : 'Q4 ' + ('FY ' + dtYr);
                data[ln].HalfYear = (dtMn + 1) / 6 <= 1 ? 'H1 ' + ('FY ' + dtYr) : 'H2 ' + ('FY ' + dtYr);
                delete (data[ln].Date);
            }
        }
        args.dataSourceSettings.dataSource = data;
    }

    return (
        <div className='control-pane'>
            <div className='control-section' id='pivot-table-section'>
                <PivotViewComponent id='PivotView' dataSourceSettings={dataSourceSettings} width={'100%'} height={'300'} gridSettings={{ columnWidth: 140 }}
                    load={onLoad} dataBound={trend.bind(this)} ref={(pivotview) => { pivotObj = pivotview }} cellTemplate={cellTemplate.bind(this)}>
                </PivotViewComponent>
            </div>
            <div id="action-description">
                <p> In this sample, we demonstrate on how to provide templates for each pivot table value cell based on user
                    requirement.</p>
            </div>
            <div id="description">
                <p>
                    The Pivot Table provides a custom layout for each cell's display using the cell template feature.
                    The <code>cellTemplate</code> property accepts either an HTML string or the element's ID, which can be used to
                    append additional HTML elements in order to showcase each cell with a template.
                    Using cell templates in this sample, we are representing the revenue cost for each year with trend icons.
                    To calculate the trend, we have applied conditions for each cell using pivot values from a
                    <code>dataBound</code> event.
                    Based on the applied condition, we are showing the appropriate trend icons.
                </p>
            </div>
        </div>
    )
}

export default CellTemplate;