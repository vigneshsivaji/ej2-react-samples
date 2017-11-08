import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Ajax, Animation, Browser, closest, createElement, enableRipple, select, selectAll } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-react-buttons';
import { ListBase } from '@syncfusion/ej2-react-lists';
import { DataManager, DataUtil, Query } from '@syncfusion/ej2-data';
import { Popup, Tooltip } from '@syncfusion/ej2-react-popups';
import { DropDownList } from '@syncfusion/ej2-react-dropdowns'
import * as elasticlunr from './lib/elasticlunr';
import * as searchJson from './search-index.json';
import { LeftPane, setSelectList } from './leftpane';
import { Content } from './component-content';
import '../../node_modules/es6-promise/dist/es6-promise';

/**
 * Mobile View
 */
let isMobile: boolean = window.matchMedia('(max-width:550px)').matches;
/**
 * tablet mode
 */
let isTablet: boolean = window.matchMedia('(min-width:600px) and (max-width: 850px)').matches;
/**
 * PC mode
 */
let isPc: boolean = window.matchMedia('(min-width:850px)').matches;

let resizeManualTrigger: boolean = false;

/**
 * default theme on sample loaded
 */
export let selectedTheme: string = location.hash.split('/')[1] || localStorage.getItem('ej2-theme') || 'material';
localStorage.removeItem('ej2-theme');
const themeCollection: string[] = ['material', 'fabric', 'bootstrap'];
let themeList: HTMLElement = document.getElementById('themelist');

/**
 * Toggle Pane Animation
 */
let toggleAnim: Animation = new Animation({ duration: 500, timingFunction: 'ease' });
let leftToggle: Element = select('#sb-toggle-left');
let sbRightPane: HTMLElement = select('.sb-right-pane') as HTMLElement;
let sbContentOverlay: HTMLElement = select('.sb-content-overlay') as HTMLElement;
let sbBodyOverlay: HTMLElement = select('.sb-body-overlay') as HTMLElement;
let sbHeader: HTMLElement = select('#sample-header') as HTMLElement;
let leftPane: HTMLElement = select('.sb-left-pane') as HTMLElement;
let mobileOverlay: Element = select('.sb-mobile-overlay');

/**
 * SB Popups
 */
let switcherPopup: Popup;
let themeSwitherPopup: Popup;
let searchPopup: Popup;
let settingsPopup: Popup;
let searchInstance: any;
let settingElement: HTMLElement = select('.sb-setting-btn') as HTMLElement;
let openedPopup: any;
let headerThemeSwitch: HTMLElement = document.getElementById('header-theme-switcher');
let prevAction: string;

let themeDropDown: DropDownList;

/**
 * constant to process the sample url
 */
const urlRegex: RegExp = /(npmci\.syncfusion\.com|ej2\.syncfusion\.com)(\/)(development|production)*/;
const sampleRegex: RegExp = /#\/(([^\/]+\/)+[^\/\.]+)/;
const sbArray: string[] = ['angular', 'typescript', 'javascript'];
const sbObj: { [index: string]: string } = { 'angular': 'angular', 'typescript': '', 'javascript': 'javascript' };

/**
 * constant for search operations
 */
let searchEle: any = select('#search-popup');
let inputele: any = select('#search-input');
let searchOverlay: Element = select('.e-search-overlay');
let searchButton: Element = document.getElementById('sb-trigger-search');
export let setResponsiveElement: Element = select('.setting-responsive');

/**
 * Mouse or touch setting
 */
let switchText: string = localStorage.getItem('ej2-switch') ||
  (window.screen.width > 1366 ? 'touch' : 'mouse');
if (Browser.isDevice || window.screen.width <= 850) {
  switchText = 'touch';
}
changeMouseOrTouch(switchText);
overlay();
/**
 * Mobile View
 */
if (isMobile) {
  select('.sb-left-pane-footer').appendChild(select('.sb-footer-left'));
  select('.sb-left-pane').classList.add('sb-hide');
  leftToggle.classList.remove('toggle-active');

} else {
  leftPane.classList.remove('sb-hide');
}
changeMouseOrTouch(switchText);
localStorage.removeItem('ej2-switch');
enableRipple(selectedTheme === 'material' || !selectedTheme);
loadTheme(selectedTheme);

/**
 * SB Switch Link Updation
 */
export function setSbLink(): void {
  let href: string = location.href;
  let link: string[] = href.match(urlRegex);
  let sample: string[] = href.match(sampleRegex);
  for (let sb of sbArray) {
    let ele: HTMLFormElement = (select('#' + sb) as HTMLFormElement);
    ele.href = ((link) ? ('http://' + link[1] + '/' + (link[3] ? (link[3] + '/') : '')) :
      ('http://ej2.syncfusion.com/')) + (sbObj[sb] ? (sb + '/') : '') +
      'demos/#/' + (sample ? (sample[1] + (sb !== 'typescript' ? '' : '.html')) : '');
  }
}

/**
 * Set Mouse or Touch on page load
 */
function changeMouseOrTouch(str: string): void {
  let activeEle: Element = setResponsiveElement.querySelector('.active');
  if (activeEle) {
    activeEle.classList.remove('active');
  }
  if (str === 'mouse') {
    document.body.classList.remove('e-bigger');
  } else {
    document.body.classList.add('e-bigger');
  }
  setResponsiveElement.querySelector('#' + str).classList.add('active');
}

/**
 * Render Sample Browser Popups
 */
function renderSbPopups(): void {
  switcherPopup = new Popup(document.getElementById('sb-switcher-popup'), {
    relateTo: select('.sb-header-text-right') as HTMLElement, position: { X: 'left' },
    collision: { X: 'flip', Y: 'flip' },
    offsetX: 0,
    offsetY: -15,
  });
  themeSwitherPopup = new Popup(document.getElementById('theme-switcher-popup'), {
    offsetY: 2,
    relateTo: select('.theme-wrapper') as HTMLElement, position: { X: 'left', Y: 'bottom' },
    collision: { X: 'flip', Y: 'flip' }
  });
  searchPopup = new Popup(searchEle, {
    offsetY: 5,
    relateTo: inputele, position: { X: 'left', Y: 'bottom' }
    , collision: { X: 'flip', Y: 'flip' }
  });
  settingsPopup = new Popup(document.getElementById('settings-popup'), {
    offsetX: -245,
    offsetY: 5,
    relateTo: settingElement as HTMLElement,
    position: { X: 'right', Y: 'bottom' }
    , collision: { X: 'flip', Y: 'flip' }
  });
  if (!isMobile) {
    settingsPopup.hide();
  } else {
    select('.sb-mobile-preference').appendChild(select('#settings-popup'));
  }
  searchPopup.hide();
  switcherPopup.hide();
  themeSwitherPopup.hide();
  themeDropDown = new DropDownList({
    index: 0,
    change: (e: any) => { switchTheme(e.value); }
  });
  themeDropDown.appendTo('#sb-setting-theme');

  /**
   * add header to element
   */
  let prevbutton: Button = new Button({ iconCss: 'sb-icons sb-icon-Previous', cssClass: 'e-flat' }, '#mobile-prev-sample');
  let nextbutton: Button = new Button(
    {
      iconCss: 'sb-icons sb-icon-Next',
      cssClass: 'e-flat', iconPosition: 'right'
    }, '#mobile-next-sample');
}

function processDeviceDependables(): void {
  if (Browser.isDevice) {
    select('.sb-desktop-setting').classList.add('sb-hide');
  } else {
    select('.sb-desktop-setting').classList.remove('sb-hide');
  }
}


/**
 * Theme change function
 */

function changeTheme(e: MouseEvent): void {
  let target: Element = e.target as HTMLElement;
  target = closest(target, 'li');
  let themeName: string = target.id;
  switchTheme(themeName);
  // loadTheme(themeName);
}

function switchTheme(str: string): void {
  let hash: string[] = location.hash.split('/');
  if (hash[1] !== str) {
    hash[1] = str;
    location.hash = hash.join('/');
  }
}

/**
 * Header Click Event Handling
 */
function sbHeaderClick(action: string, preventSearch?: boolean): void {
  if (openedPopup) {
    openedPopup.hide(new Animation({ name: 'FadeOut', duration: 300, delay: 0 }));
  }
  if (preventSearch !== true && !searchOverlay.classList.contains('sb-hide')) {
    searchOverlay.classList.add('sb-hide');
    searchButton.classList.remove('active');
  }
  let curPopup: Popup;
  switch (action) {
    case 'changeSampleBrowser':
      curPopup = switcherPopup;
      break;
    case 'changeTheme':
      headerThemeSwitch.classList.toggle('active');
      curPopup = themeSwitherPopup;
      break;
    case 'toggleSettings':
      settingElement.classList.toggle('active');
      themeDropDown.index = themeCollection.indexOf(selectedTheme);
      curPopup = settingsPopup;
      break;
  }
  if (action === 'closePopup') {
    headerThemeSwitch.classList.remove('active');
    settingElement.classList.remove('active');
  }
  if (curPopup && curPopup !== openedPopup) {
    curPopup.show(new Animation({ name: 'FadeIn', duration: 400, delay: 0 }));
    openedPopup = curPopup;
  } else {
    openedPopup = null;
  }
  prevAction = action;
}

/**
 * toggle search overlay
 */
function toggleSearchOverlay(): void {
  sbHeaderClick('closePopup', true);
  inputele.value = '';
  searchPopup.hide();
  searchButton.classList.toggle('active');
  searchOverlay.classList.toggle('sb-hide');
  if (!searchOverlay.classList.contains('sb-hide')) {
    inputele.focus();
  }
}

/**
 * Storing the mouse action
 */
function setMouseOrTouch(e: MouseEvent): void {
  let ele: Element = closest(e.target as HTMLElement, '.sb-responsive-items');
  let switchType: string = ele.id;
  changeMouseOrTouch(switchType);
  sbHeaderClick('closePopup');
  localStorage.setItem('ej2-switch', switchType);
  location.reload();
}

/**
 * Binding events for sample browser operations
 */
function bindEvents(): void {
  document.getElementById('sb-switcher').addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    sbHeaderClick('changeSampleBrowser');
  });
  headerThemeSwitch.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    sbHeaderClick('changeTheme');
  });
  themeList.addEventListener('click', changeTheme);
  document.addEventListener('click', sbHeaderClick.bind(this, 'closePopup'));
  settingElement.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    sbHeaderClick('toggleSettings');
  });
  searchButton.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSearchOverlay();
  });
  document.getElementById('settings-popup').addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  });
  inputele.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  });
  inputele.addEventListener('keyup', onsearchInputChange);
  setResponsiveElement.addEventListener('click', setMouseOrTouch);
  leftToggle.addEventListener('click', toggleLeftPane);
  mobileOverlay.addEventListener('click', toggleMobileOverlay);
  select('.sb-header-settings').addEventListener('click', viewMobilePrefPane);

  document.getElementById('switch-sb').addEventListener('click', (e: MouseEvent) => {
    let target: Element = closest(e.target as any, 'li');
    if (target) {
      let anchor: any = target.querySelector('a');
      if (anchor) {
        anchor.click();
      }
    }
  });

  /**
   * resize event
   */
  window.addEventListener('resize', processResize);
  select('.sb-right-pane').addEventListener('click', () => {
    if (isTablet && isLeftPaneOpen()) {
      toggleLeftPane();
    }
  });
  searchEle.addEventListener('click', (e: MouseEvent) => {
    let curEle: Element = closest(e.target as any, 'li');
    if (curEle && curEle.classList.contains('e-list-item')) {
      let tcontent: any = select('.e-text-content', curEle);
      let hashval: string = '#/' + selectedTheme + '/' + tcontent.getAttribute('data');
      inputele.value = '';
      searchPopup.hide();
      searchOverlay.classList.add('e-search-hidden');
      if (location.hash !== hashval) {
        overlay();
        location.hash = hashval;
        // setSelectList();
      }
    }
  });
}

/**
 * search input change
 */
function onsearchInputChange(e: KeyboardEvent): void {
  if (e.keyCode === 27) {
      toggleSearchOverlay();
  }
  let searchString: string = (e.target as any).value;
  // changeInputIcons(searchString.length > 0);
  if (searchString.length <= 2) {
      searchPopup.hide();
      return;
  }
  let val: any = [];
  val = searchInstance.search(searchString, {
      fields: {
          component: { boost: 1 },
          name: { boost: 2 }
      },
      expand: true,
      boolean: 'AND',
  });
  if (val.length) {
      let data: DataManager = new DataManager(val);
      let controls: any = data.executeLocal(new Query().take(10).select('doc'));
      let ds: any = DataUtil.group(controls, 'component');
      let dataSource: { [key: string]: Object }[] & Object[] = [];
      for (let j: number = 0; j < ds.length; j++) {
          let itemObj: any = ds[j].items;
          let field: string = 'name';
          let grpItem: { [key: string]: Object } = {};
          let hdr: string = 'isHeader';
          grpItem[field] = ds[j].key;
          grpItem[hdr] = true;
          grpItem.items = itemObj;
          dataSource.push(grpItem);
          for (let k: number = 0; k < itemObj.length; k++) {
              dataSource.push(itemObj[k]);
          }
      }
      let ele: any = ListBase.createList(dataSource, {
          fields: { id: 'uid', groupBy: 'component', text: 'name' },
          template: '<div class="e-text-content e-icon-wrapper" data="${path}" uid="${uid}">' +
          '<span class="e-list-text" role="list-item">' +
          '${name}</span></div>',
          groupTemplate:
          '${if(items[0]["component"])}<div class="e-text-content"><span class="e-search-group">${items[0].component}</span>' +
          '</div>${/if}'
      });
      searchPopup.element.innerHTML = '';
      highlight(searchString, ele);
      searchPopup.element.appendChild(ele);
      searchPopup.show();
  } else {
      searchPopup.element.innerHTML = '<div class="search-no-record">We’re sorry. We cannot find any matches for your search term.</div>';
      searchPopup.show();
  }
}
function highlight(searchString: string, listElement: any): void {
  let regex: RegExp = new RegExp(searchString.split(' ').join('|'), 'gi');
  let contentElements: any[] = selectAll('.e-list-item .e-text-content .e-list-text', listElement);
  for (let i: number = 0; i < contentElements.length; i++) {
      let spanText: any = select('.sb-highlight');
      if (spanText) {
          contentElements[i].innerHTML = contentElements[i].text;
      }
      contentElements[i].innerHTML = contentElements[i].innerHTML.replace(regex, (matched: string) => {
          return '<span class="sb-highlight">' + matched + '</span>';
      });
  }
}
/**
 * Mobile Right pane toggle functions
 */
function toggleRightPane(): void {
  themeDropDown.index = themeCollection.indexOf(selectedTheme);
  let mRightPane: HTMLElement = select('.sb-mobile-right-pane') as HTMLElement;
  select('.sb-mobile-overlay').classList.toggle('sb-hide');
  let reverse: boolean = mRightPane.classList.contains('sb-hide');
  mRightPane.classList.remove('sb-hide');
  toggleAnim.animate(mRightPane, {
    name: reverse ? 'SlideRightIn' : 'SlideRightOut', end: (): void => {
      if (!reverse) {
        mRightPane.classList.add('sb-hide');
      }
    }
  });
}
function viewMobilePrefPane(): void {
  select('.sb-mobile-prop-pane').classList.add('sb-hide');
  select('.sb-mobile-preference').classList.remove('sb-hide');
  toggleRightPane();
}
export function viewMobilePropPane(): void {
  select('.sb-mobile-preference').classList.add('sb-hide');
  select('.sb-mobile-prop-pane').classList.remove('sb-hide');
  toggleRightPane();
}
export function isLeftPaneOpen(): boolean {
  return leftToggle.classList.contains('toggle-active');
}
function isVisible(elem: string): boolean {
  return !select(elem).classList.contains('sb-hide');
}
/**
 * Mobile Overlay 
 */
function toggleMobileOverlay(): void {
  if (!select('.sb-left-pane').classList.contains('sb-hide')) {
    toggleLeftPane();
  }
  if (!select('.sb-mobile-right-pane').classList.contains('sb-hide')) {
    toggleRightPane();
  }
}
function removeMobileOverlay(): void {
  select('.sb-mobile-overlay').classList.add('sb-hide');
}
export function removeOverlay(): void {
  sbContentOverlay.classList.add('sb-hide');
  sbRightPane.classList.remove('sb-right-pane-overlay');
  sbHeader.classList.remove('sb-right-pane-overlay');
  mobNavOverlay(false);
  if (!sbBodyOverlay.classList.contains('sb-hide')) {
    sbBodyOverlay.classList.add('sb-hide');
  }
  sbRightPane.scrollTop = 0;
}

export function sampleOverlay(): void {
  sbHeader.classList.add('sb-right-pane-overlay');
  sbRightPane.classList.add('sb-right-pane-overlay');
  mobNavOverlay(true);
  sbContentOverlay.classList.remove('sb-hide');
}

function mobNavOverlay(isOverlay: boolean): void {
  if (Browser.isDevice) {
    let mobileFoorter: HTMLElement = select('.sb-mobilefooter') as HTMLElement;
    if (isOverlay) {
      mobileFoorter.classList.add('sb-right-pane-overlay');
    } else {
      mobileFoorter.classList.remove('sb-right-pane-overlay');
    }
  }
}
function overlay(): void {
  sbHeader.classList.add('sb-right-pane-overlay');
  sbBodyOverlay.classList.remove('sb-hide');
}

export function toggleLeftPane(): void {
  isMobile = document.body.offsetWidth <= 550;
  let rightPane: HTMLElement = select('.sb-right-pane') as HTMLElement;
  let reverse: boolean = leftPane.classList.contains('sb-hide');
  if (reverse) {
    leftToggle.classList.add('toggle-active');
    mobileOverlay.classList.remove('sb-hide');
  } else {
    leftToggle.classList.remove('toggle-active');
    mobileOverlay.classList.add('sb-hide');
  }
  if (!isMobile) {
    rightPane.classList.add('control-transition');
    rightPane.style.overflowY = 'hidden';
    if (!reverse) {
      rightPane.classList.add('control-animate');
      rightPane.classList.remove('control-fullview');
    } else {
      rightPane.classList.add('control-reverse-animate');
      rightPane.classList.add('control-fullview');
    }
  }
  leftPane.classList.remove('sb-hide');
  leftPane.style.overflowY = 'hidden';
  toggleAnim.animate(leftPane, {
    name: reverse ? 'SlideLeftIn' : 'SlideLeftOut', end: (): void => {
      if (!isMobile) {
        rightPane.classList.remove('control-transition');
        rightPane.style.overflowY = 'auto';
        if (!reverse) {
          rightPane.classList.remove('control-animate');
        } else {
          rightPane.classList.remove('control-reverse-animate');
        }
        rightPane.classList.toggle('control-fullview');
      }
      if (!reverse) {
        leftPane.classList.add('sb-hide');
      }
      leftPane.style.overflowY = '';
      resizeManualTrigger = true;
      window.dispatchEvent(new Event('resize'));
      resizeManualTrigger = false;
    }
  });
}

/**
 * Resize event processing
 */
function processResize(e: any): void {
  if (resizeManualTrigger) {
    return;
  }
  isMobile = document.body.offsetWidth <= 550;
  isTablet = document.body.offsetWidth >= 550 && document.body.offsetWidth <= 850;
  isPc = document.body.offsetWidth >= 850;
  processDeviceDependables();
  let leftPane: Element = select('.sb-left-pane');
  let rightPane: Element = select('.sb-right-pane');
  let footer: Element = select('.sb-footer-left');
  let pref: Element = select('#settings-popup');
  if (isMobile) {
    if (!footer.parentElement.classList.contains('sb-left-pane-footer')) {
      select('.sb-left-pane-footer').appendChild(footer);
    }
    if (!leftPane.classList.contains('sb-hide')) {
      toggleLeftPane();
    }
    if (!pref.parentElement.classList.contains('sb-mobile-preference')) {
      select('.sb-mobile-preference').appendChild(pref);
    }
    settingsPopup.show();
    let propPanel: Element = select('#control-content .property-section');
    if (propPanel) {
      select('.sb-mobile-prop-pane').appendChild(propPanel);
      select('.sb-mobile-setting').classList.remove('sb-hide');
    }
  }
  if (isTablet || isPc) {
    if (footer.parentElement.classList.contains('sb-left-pane-footer')) {
      select('.sb-footer').appendChild(footer);
    }
    if (isTablet) {
      if (!leftPane.classList.contains('sb-hide')) {
        toggleLeftPane();
      }
      setTimeout(() => {
        if (!rightPane.classList.contains('control-fullview')) {
          rightPane.classList.add('control-fullview');
        }
      }, 500);
    }
    if (isPc) {
      if (isVisible('.sb-left-pane')) {
        rightPane.classList.remove('control-fullview');
      } else {
        toggleLeftPane();
      }
    }
    if (pref.parentElement.classList.contains('sb-mobile-preference')) {
      select('#sb-popup-section').appendChild(pref);
      settingsPopup.hide();
    }
    let mobilePropPane: Element = select('.sb-mobile-prop-pane .property-section');
    if (mobilePropPane) {
      select('.control-section').appendChild(mobilePropPane);
    }
  }
  if (!select('.sb-mobile-right-pane').classList.contains('sb-hide')) {
    toggleRightPane();
  }
  if (isVisible('.sb-mobile-overlay')) {
    removeMobileOverlay();
  }
  if (switcherPopup) {
    switcherPopup.refresh();
  }
}

/**
 * Theme Loading
 */
function loadTheme(theme: string): void {
  themeList.querySelector('.active').classList.remove('active');
  themeList.querySelector('#' + theme).classList.add('active');
  let ajax: Ajax = new Ajax('./styles/' + theme + '.css', 'GET', true);
  ajax.send().then((result: any) => {
    let doc: HTMLFormElement = document.getElementById('themelink') as HTMLFormElement;
    doc.innerHTML = result;
    selectedTheme = theme;
    //renderPopups
    renderSbPopups();
    bindEvents();
    /**
     * load elastic lunr
     */
    (elasticlunr as any).clearStopWords();
    searchInstance = (elasticlunr as any).Index.load(searchJson);

    ReactDOM.render(<LeftPane />
      , document.getElementById('left-pane-component')
    );
    setSelectList();
    removeOverlay();
    ReactDOM.render(<Content />, document.getElementById('tab-component'));
    document.querySelector('.sb-right-pane').scrollTop = 0;
  });
}
