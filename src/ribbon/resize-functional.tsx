import * as React from 'react';
import { useRef, useEffect } from 'react';
import { Ribbon, RibbonComponent, RibbonTabsDirective, RibbonTabDirective, RibbonCollectionsDirective, RibbonCollectionDirective, RibbonGroupsDirective, RibbonGroupDirective, RibbonItemsDirective, RibbonItemDirective, RibbonColorPicker, DisplayMode, RibbonGroupButtonSelection } from '@syncfusion/ej2-react-ribbon';
import { RibbonFileMenu, RibbonItemSize, Inject, FileMenuEventArgs, LauncherClickEventArgs } from '@syncfusion/ej2-react-ribbon';
import { ItemModel } from '@syncfusion/ej2-react-splitbuttons';
import { FilteringEventArgs } from "@syncfusion/ej2-dropdowns";
import { Query } from "@syncfusion/ej2-data";
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import { MenuItemModel } from '@syncfusion/ej2-react-navigations';
import { SliderComponent } from '@syncfusion/ej2-react-inputs';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { updateSampleSection } from '../common/sample-base';
import './resize.css';

const Resize = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    let resizeRibbonObj = useRef<RibbonComponent>(null);

    const pasteOptions: ItemModel[] = [{ text: "Keep Source Format" }, { text: "Merge Format" }, { text: "Keep Text Only" }];
    const findOptions: ItemModel[] = [{ text: "Find", iconCss: "e-icons e-search" }, { text: "Advanced Find", iconCss: "e-icons e-search" }, { text: "Go to", iconCss: "e-icons e-arrow-right" }];
    const selectOptions: ItemModel[] = [{ text: "Select All" }, { text: "Select Objects" }];
    const dictateOptions: ItemModel[] = [{ text: "Chinese" }, { text: "English" }, { text: "German" }, { text: "French" }];
    const tableOptions: ItemModel[] = [{ text: "Insert Table" }, { text: "Draw Table" }, { text: "Convert Table" }, { text: "Excel SpreadSheet" }];
    const shapeOptions: ItemModel[] = [{ text: "Lines" }, { text: "Rectangles" }, { text: "Basic Arrows" }, { text: "Basic Shapes" }, { text: "FlowChart" }];
    const headerOptions: ItemModel[] = [{ text: "Insert Header" }, { text: "Edit Header" }, { text: "Remove Header" }];
    const footerOptions: ItemModel[] = [{ text: "Insert Footer" }, { text: "Edit Footer" }, { text: "Remove Footer" }];
    const pageOptions: ItemModel[] = [{ text: "Insert Top of page" }, { text: "Insert Bottom of page" }, { text: "Format Page Number" }];
    const linkOptions: ItemModel[] = [{ text: "Insert Link", iconCss: "e-icons e-link" }, { text: "Recent Links", iconCss: "e-icons e-clock" }, { text: "Bookmarks", iconCss: "e-icons e-bookmark" }];

    const fontSize: string[] = ["8", "9", "10", "11", "12", "14", "16", "18", "20", "22", "24", "26", "28", "36", "48", "72", "96"];
    const fontStyle: string[] = ["Algerian", "Arial", "Calibri", "Cambria", "Cambria Math", "Courier New", "Candara", "Georgia", "Impact", "Segoe Print", "Segoe Script", "Segoe UI", "Symbol", "Times New Roman", "Verdana", "Windings"];
    function filtering(e: FilteringEventArgs) {
        let query = new Query();
        query = (e.text !== "") ? query.where("Text", "contains", e.text, true) : query;
        e.updateData(fontStyle, query);
    }

    const fileOptions: MenuItemModel[] = [{ text: "New", iconCss: "e-icons e-file-new", id: "new" },
    { text: "Open", iconCss: "e-icons e-folder-open", id: "Open" },
    { text: "Rename", iconCss: "e-icons e-rename", id: "rename" },
    {
        text: "Save as", iconCss: "e-icons e-save", id: "save",
        items: [
            { text: "Microsoft Word (.docx)", iconCss: "sf-icon-word", id: "newword" },
            { text: "Microsoft Word 97-2003(.doc)", iconCss: "sf-icon-word", id: "oldword" },
            { text: "Download as PDF", iconCss: "e-icons e-export-pdf", id: "pdf" }]
    }]

    let toastInstance = useRef<ToastComponent>(null);

    let isPasteDisabled: boolean = true;
    const enablePaste = () => { 
        if (!isPasteDisabled) { return; }
        resizeRibbonObj.current.enableItem('resize-pastebtn');
        isPasteDisabled = false;
    }

    const updateContent = (args) => {
        toastInstance.current.show({ content: "Last clicked item is " + args });
    }

    const sliderRef = useRef(null);
    const onCreated = () => {
        var container = document.getElementById('ribbonContainer');
        var slider = sliderRef.current;
        slider.max = container.offsetWidth;
        slider.value = container.offsetWidth;
        slider.min = 350;
    }

    useEffect(() => {
        const onResize = () => {
            var container = document.getElementById('ribbonContainer');
            container.style.width = '100%'; 
            var slider = sliderRef.current;
            slider.max = container.offsetWidth;
            slider.value = container.offsetWidth;
        }
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
        }
    })

    const onChange = (args) => {
        var container = document.getElementById('ribbonContainer');
        container.style.width = args.value + 'px';
        resizeRibbonObj.current.refreshLayout();
    }

    const fileSelect = (args: FileMenuEventArgs) => {
        if(args.item.id === "newword" || args.item.id === "oldword" || args.item.id === "pdf"){
            updateContent("File -> Save as -> " + args.item.text);
        }
        else {
            updateContent("File -> " + args.item.text);
        }
      }
    
    const launchClick = (args: LauncherClickEventArgs) => {
        if (args.groupId == "clipboard") {
            updateContent("Clipboard Launcher Icon");
        }
        else if (args.groupId == "illustration") {
            updateContent("Illustration Launcher Icon");
        }
        else if (args.groupId == "header_footer") {
            updateContent("Header & Footer Launcher Icon");
        }
    }

    return (
        <div className='control-pane'>
            <div className='col-lg-12 control-section resize-ribbon-section'>
                <div className='control ribbon-sample'>
                    <div id="ribbonContainer" className='resize-ribbon-container'>
                        <RibbonComponent id='ribbon' ref={ resizeRibbonObj } enablePersistence={true} fileMenu={{ visible: true, menuItems: fileOptions, select: fileSelect }} launcherIconClick={launchClick}>
                            <RibbonTabsDirective>
                                <RibbonTabDirective header='Home'>
                                    <RibbonGroupsDirective>
                                        <RibbonGroupDirective header="Clipboard" id='clipboard' groupIconCss="e-icons e-paste" showLauncherIcon={true}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="SplitButton" disabled={true} id="resize-pastebtn" allowedSizes={RibbonItemSize.Large}
                                                            splitButtonSettings={{ iconCss: "e-icons e-paste", items: pasteOptions, content: "Paste", select: (args) => { updateContent("Paste -> " + args.item.text); }, click: () => { updateContent("Paste"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-cut", content: "Cut", clicked: () => { updateContent("Cut"); enablePaste(); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                                <RibbonCollectionDirective >
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-copy", content: "Copy", clicked: () => { updateContent("Copy"); enablePaste(); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-format-painter", content: "Format Painter", clicked: () => { updateContent("Format Painter") } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Font" overflowHeader="More Font Options" groupIconCss="e-icons e-bold" isCollapsible={false} enableGroupOverflow={true} orientation="Row" cssClass='font-group'>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="ComboBox" comboBoxSettings={{ dataSource: fontStyle, index: 3, label: 'Font Style', width: '115px', popupWidth: '150px', allowFiltering: true, filtering: filtering, select: (args) => { if (args.itemData) { updateContent("Font Style -> " + args.itemData.text); } } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="ComboBox" comboBoxSettings={{ dataSource: fontSize, index: 3, label: 'Font Size', width: '65px', popupWidth: '85px', select: (args) => { if (args.itemData) { updateContent("Font Size -> " + args.itemData.text); } } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="GroupButton" allowedSizes={RibbonItemSize.Small} groupButtonSettings={{selection: RibbonGroupButtonSelection.Multiple, header: 'Format Styles', items: [{iconCss: 'e-icons e-bold', content: 'Bold', selected: true, click: () => { updateContent("Bold") }}, {iconCss: 'e-icons e-italic', content: 'Italic', click: () => { updateContent("Italic") }}, {iconCss: 'e-icons e-underline', content: 'Underline', click: () => { updateContent("Underline") }}, {iconCss: 'e-icons e-strikethrough', content: 'Strikethrough', click: () => { updateContent("Strikethrough") }},{iconCss: 'e-icons e-change-case', content: 'Change Case', click: () => { updateContent("Change Case") }}]}}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="ColorPicker" allowedSizes={RibbonItemSize.Small} displayOptions={DisplayMode.Simplified | DisplayMode.Classic} colorPickerSettings={{value: '#123456', change: (args) => { updateContent(args.currentValue.hex + " color"); }}}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Paragraph" groupIconCss="e-icons e-align-center" orientation="Row">
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Small} buttonSettings={{ iconCss: "e-icons e-decrease-indent", content: 'Decrease Indent', clicked: () => { updateContent("Decrease Indent"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Small} buttonSettings={{ iconCss: "e-icons e-increase-indent", content: 'Increase Indent', clicked: () => { updateContent("Increase Indent"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Small} buttonSettings={{ iconCss: "e-icons e-paragraph", content: 'Paragraph', clicked: () => { updateContent("Paragraph Mark"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="GroupButton" allowedSizes={RibbonItemSize.Small} groupButtonSettings={{selection: RibbonGroupButtonSelection.Single, header: 'Alignment', items: [{iconCss: 'e-icons e-align-left', selected: true, click: () => { updateContent("Align Left") }}, {iconCss: 'e-icons e-align-center', click: () => { updateContent("Align Center") }}, {iconCss: 'e-icons e-align-right', click: () => { updateContent("Align Right") }}, {iconCss: 'e-icons e-justify', click: () => { updateContent("Justify") }}]}}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Editing" groupIconCss="e-icons e-edit" orientation="Column">
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="SplitButton" splitButtonSettings={{ iconCss: "e-icons e-search", items: findOptions, content: "Find", select: (args) => { updateContent("Find -> " + args.item.text); }, click: () => { updateContent("Find"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-replace", content: 'Replace', clicked: () => { updateContent("Replace"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="SplitButton" splitButtonSettings={{ iconCss: "e-icons e-mouse-pointer", items: selectOptions, content: "Select", select: (args) => { updateContent("Select -> " + args.item.text); }, click: () => { updateContent("Select"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Voice" groupIconCss="sf-icon-dictate" isCollapsible={false}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="SplitButton" disabled={true} allowedSizes={RibbonItemSize.Large} splitButtonSettings={{ iconCss: "sf-icon-dictate", items: dictateOptions, content: "Dictate", select: (args) => { updateContent("Dictate -> " + args.item.text); }, click: () => { updateContent("Dictate"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                    </RibbonGroupsDirective>
                                </RibbonTabDirective>
                                <RibbonTabDirective header='Insert'>
                                    <RibbonGroupsDirective>
                                        <RibbonGroupDirective header="Tables" isCollapsible={false}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="DropDown" allowedSizes={RibbonItemSize.Large} dropDownSettings={{ iconCss: "e-icons e-table", items: tableOptions, content: "Table", select: (args) => { updateContent("Table -> " + args.item.text); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Illustration" overflowHeader="Illustrations" id="illustration" groupIconCss="e-icons e-image" enableGroupOverflow={true} orientation="Row">
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                    <RibbonItemDirective id='pictureddl' type="DropDown" dropDownSettings={{ iconCss: "e-icons e-image", content: "Pictures", target: '#resize-pictureList' }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="DropDown" dropDownSettings={{ iconCss: "sf-icon-shapes", items: shapeOptions, content: "Shapes", select: (args) => { updateContent("Shapes -> " + args.item.text); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "sf-icon-3d-model", content: "3D Models", clicked: () => { updateContent("3D Models"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "sf-icon-smart-art", content: "Smart Art", clicked: () => { updateContent("Smart Art"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "sf-icon-chart", content: "Charts", clicked: () => { updateContent("Chart"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "sf-icon-screenshot", content: "Screenshot", clicked: () => { updateContent("Screenshot"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Header & Footer" id="header_footer" groupIconCss="e-icons e-table" orientation="Column" showLauncherIcon={true}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="DropDown" dropDownSettings={{ iconCss: "e-icons e-header", items: headerOptions, content: "Header", select: (args) => { updateContent("Header -> " + args.item.text); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="DropDown" dropDownSettings={{ iconCss: "e-icons e-footer", items: footerOptions, content: "Footer", select: (args) => { updateContent("Footer -> " + args.item.text); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="DropDown" dropDownSettings={{ iconCss: "e-icons e-page-numbering", items: pageOptions, content: "Page Numbering", select: (args) => { updateContent("Page Numbering -> " + args.item.text); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Comments" isCollapsible={false}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Large} buttonSettings={{ iconCss: "e-icons e-comment-add", content: "New Comment", clicked: () => { updateContent("New Comment"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Links" groupIconCss="e-icons e-link" isCollapsible={false}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="DropDown" allowedSizes={RibbonItemSize.Large} dropDownSettings={{ iconCss: "e-icons e-link", items: linkOptions, content: "Link", select: (args) => { updateContent("Link -> " + args.item.text); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                    </RibbonGroupsDirective>
                                </RibbonTabDirective>
                                <RibbonTabDirective header='View'>
                                    <RibbonGroupsDirective>
                                        <RibbonGroupDirective header="Views" groupIconCss='e-icons e-print' orientation='Row'>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "sf-icon-read", content: "Read Mode", clicked: () => { updateContent("Read Mode"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-print", content: "Print Layout", clicked: () => { updateContent("Print Layout"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "sf-icon-web-layout", content: "Web Layout", clicked: () => { updateContent("Web Layout"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Zoom" groupIconCss="e-icons e-zoom-to-fit" orientation="Row">
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-zoom-in", content: "Zoom in", clicked: () => { updateContent("Zoom in"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-zoom-out", content: "Zoom out", clicked: () => { updateContent("Zoom out"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Show" isCollapsible={true}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="CheckBox" checkBoxSettings={{ label: "Ruler", checked: false, change: () => { updateContent("Ruler"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="CheckBox" checkBoxSettings={{ label: "Gridlines", checked: false, change: () => { updateContent("Gridlines"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="CheckBox" checkBoxSettings={{ label: "Navigation Pane", checked: true, change: () => { updateContent("Navigation Pane"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Dark Mode" isCollapsible={false}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "sf-icon-mode", content: "Dark Mode", clicked: () => { updateContent("Dark Mode"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                    </RibbonGroupsDirective>
                                </RibbonTabDirective>
                            </RibbonTabsDirective>
                            <Inject services={[RibbonFileMenu, RibbonColorPicker]} />
                        </RibbonComponent>
                        <div id="ribbonPlaceHolder">
                            <div style={{ width: '100%', height: '40px' }}>
                                <p className='displayText'>Resize Ribbon</p>
                                <div id='ribbonSlider' style={{ width: '200px', margin: '0 15px' }}>
                                    <SliderComponent id='slider' ref={sliderRef} min={350} change={onChange.bind(this)} created={onCreated.bind(this)} />
                                </div>
                            </div>
                            <div className="content1"></div>
                            <div className="content2"></div>
                            <div className="content3"></div>
                            <div className="content4"></div>
                            <ToastComponent id='toast' ref={ toastInstance } position={{ X: 'Right' }} height={25} width='auto' timeOut={2000} cssClass='e-toast-info' showCloseButton={true} target="#ribbonPlaceHolder" newestOnTop={true} animation={{ show: { effect: 'FadeIn' }, hide: { effect: 'FadeOut' } }} />
                        </div>
                        <ListViewComponent id='resize-pictureList' dataSource={['This Device', 'Stock Images', 'Online Images']} showHeader={true} headerTitle="Insert Picture From" select={ (args) => { updateContent("Picture -> " + args.text); }}></ListViewComponent>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the adaptiveness of the ribbon to different screen sizes. Move the slider to resize the ribbon.</p>
            </div>
            <div id="description">
                <p>The ribbon supports three sizes of ribbon items in classic mode: <code>Large</code>, <code>Medium</code>, and <code>Small</code>, and two sizes in simplified mode: <code>Medium</code>, and <code>Small</code>. The ribbon items switch between these sizes based on the screen size.
        In addition, the ribbon also has overflow dropdowns and horizontal scrolling to ensure all items are accessible in all screen sizes and resolutions.</p>
            </div>
        </div>
    );
}
export default Resize;
