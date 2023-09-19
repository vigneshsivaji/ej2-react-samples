/**
 * AutoComplete Default functionality Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { AutoCompleteComponent, Inject, VirtualScroll } from '@syncfusion/ej2-react-dropdowns';
import './default.css';
import * as data from './dataSource.json';

const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    // define the array of string
    let records: { [key: string]: Object }[] = [];

    for (let i = 1; i <= 150; i++) {
        const item: { [key: string]: Object } = {
            id: 'id' + i,
            text: `Item ${i}`,
        };
        records.push(item);
    }
    const fields: { [key: string]: string } = { text: 'text', value: 'text' };

    return (
        <div id='combodefault' className='control-pane'>
            <div className='control-section'>
                <div className='col-lg-12 control-wrappers'>
                    <div id='default'>
                        <AutoCompleteComponent id="datas" dataSource={records} placeholder="e.g. Item 1" enableVirtualization={true} fields={fields} popupHeight="200px">
                            <Inject services={[VirtualScroll]}/>
                        </AutoCompleteComponent>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This example demonstrates the virtualization support of the AutoComplete. The component has 150 items bound to it; however, when you open the suggestion list, only few items are loaded based on the popup height, and the remaining items are loaded while scrolling.</p>
            </div>
            <div id="description">
                <p>The <code>AutoComplete</code> component supports virtualization, which improves UI performance for large amounts of data. To enable virtualization, set the <code>enableVirtualization</code> property to true. When virtualization is enabled, AutoComplete doesn't render the entire suggestion data source on initial component rendering. It loads the N number of items in the popup on initial rendering and the remaining set number of items will load while scrolling.
            Virtualization works with both local and remote data.</p>
            <p>To perform the virtualization feature in the AutoComplete, the <code>VirtualScroll</code> module has to be injected at the application level.</p>
            </div>
        </div>
    );
}
export default Default;