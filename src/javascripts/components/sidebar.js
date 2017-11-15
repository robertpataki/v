'use strict';

// Vendor imports
import $ from 'jquery';
import _ from 'lodash';
import { TweenMax, Expo } from 'gsap';
const BREWSER = require('brewser/dist/brewser.min').br;


let instance = null;

export default class Sidebar {
  constructor (eventDispatcher) {
    if (typeof eventDispatcher === 'undefined') {
      console.error('[Sidebar] - constructor needs eventDispatcher');
      return;
    }

    if (!instance) {
      this.eventDispatcher = eventDispatcher;
      this._init();

      instance = this;
    }

    return this.getInstance();
  }

////////////////////////////////////
/////// Private methods
////////////////
  
  _init() {
    this.$el = $('#sidebar');
    this.$trigger = $('#sidebar-trigger');
    this.$contents = this.$el.find('.sidebar-contents');
    this.hidden = false;

    this.$trigger.on('click tap', _.bind(this._handleTriggerClick, this));

    $(this.eventDispatcher).on(this.eventDispatcher.events.RESIZE, _.bind(this._handleResize, this));
  }

////////////////////////////////////
/////// Event handlers
////////////////

  _handleTriggerClick(e) {
    if (this.hidden) {
      this.show();
    } else {
      this.hide();
    }
  }

  _handleResize(e) {

    this.isSmallScreen = BREWSER.windowWidth < 768;

    if (!this.hidden) {
      if (this.isSmallScreen) {
        TweenMax.set(this.$el, {
          width: '100%',
          height: '50vh',
        });
      } else {
        TweenMax.set(this.$el, {
          width: '30%',
          height: 'auto',
        });
      }
    } else {
      if (!this.isSmallScreen) {
        TweenMax.set(this.$el, {
          width: '0',
          height: 'auto',
        });
      }
    }
  }

////////////////////////////////////
/////// Public methods
////////////////

  show() {
    if (this.hidden) {
      this.hidden = false;

      TweenMax.to(this.$contents, 0.3, {
        opacity: 1,
      });

      if (this.isSmallScreen) {
        TweenMax.set(this.$el, {
          width: '100%'
        });

        TweenMax.to(this.$el, 0.45, {
          height: '50vh',
          ease: Expo.easeOut,
        });
      } else {
        TweenMax.set(this.$el, {
          height: 'auto'
        });

        TweenMax.to(this.$el, 0.45, {
          width: '30%',
          ease: Expo.easeOut,
        });
      }
    }
  }

  hide() {
    if (!this.hidden) {
      this.hidden = true;

      TweenMax.to(this.$contents, 0.3, {
        opacity: 0,
      });

      if (this.isSmallScreen) {
        TweenMax.to(this.$el, 0.45, {
          height: 0,
          ease: Expo.easeOut,
        });
      } else {
        TweenMax.to(this.$el, 0.45, {
          width: 0,
          ease: Expo.easeOut,
        });
      }
    }
  }

  getInstance() {
    return instance;
  }
}