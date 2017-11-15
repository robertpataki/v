'use strict';

// Vendor imports
const BREWSER = require('brewser/dist/brewser.min').br;

// Component imports
import Sidebar from 'components/sidebar';

// Module imports
export default class MCP {
  constructor(app) {
    if (!app) {
      console.error('[MCP] - `app` is required!');
      return;
    }

    this.eventDispatcher = {
      events: {
        RESIZE: 'resize',
        DELAYED_RESIZE: 'debouncedResize',
        SIDEBAR_SHOWN: 'sidebarShown',
        SIDEBAR_HIDDEN: 'sidebarHidden',
      },
    };

    this.app = app;

    this._init();
  }





////////////////////////////////////
/////// Private methods
////////////////
  _init() { 
    this.sidebar = new Sidebar(this.eventDispatcher);

    $(window).on(this.eventDispatcher.events.RESIZE, _.bind(this._handleResize, this));
    this._handleResize();
  }



////////////////////////////////////
/////// Event handlers
////////////////

  _handleResize(e) {
    $(this.eventDispatcher).trigger(this.eventDispatcher.events.RESIZE);

    if(this._resizeTimeout) {
      clearTimeout(this._resizeTimeout);        
    }

    // Trigger delayed resize event
    this._resizeTimeout = setTimeout(_.bind(this._handleDelayedResize, this), MCP.RESIZE_DELAY);
  }

  _handleDelayedResize(e) {
    $(this.eventDispatcher).trigger(this.eventDispatcher.events.DELAYED_RESIZE);
  }
}





////////////////////////////////////
/////// Static class vars
////////////////

MCP.RESIZE_DELAY = 500;