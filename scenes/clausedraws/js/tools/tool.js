/*
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

goog.provide('app.Tool');
goog.require('app.shared.utils');
goog.require('app.utils');


/**
 * Base tool item
 * @constructor
 * @param {!jQuery} $elem toolbox elem
 * @param {string} name The name of the tool.
 * Element should have class Tool-name.
 * @param {{x: number, y: number}} mouseOffset Tool offset relative to the mouse
 */
app.Tool = function($elem, name, mouseOffset) {
  this.elem = $elem;
  this.el = this.elem.find('[data-tool="' + name + '"]');
  this.hoverEl = this.el.find('[data-tool-hover]');
  this.isSelected = false;
  // TODO: calculate this based on circle size
  this.mouseOffset = mouseOffset || {x: -10, y: 10};
  this.soundKey = '';
};


/**
 * Select this tool from the toolbox
 * @param {!app.Mouse.CoordsType} mouseCoords at selection time
 */
app.Tool.prototype.select = function(mouseCoords) {
  this.isSelected = true;

  this.el.addClass('Tool--selected');
  this.width = this.el.width();

  if (app.shared.utils.touchEnabled) {
    this.elem.css({ 'background-size': 0 }); // Hide tool on touch devices
  } else {
    // this.elem.css({ cursor: 'none' });
  }

  this.move(mouseCoords);
  window.santaApp.fire('sound-trigger', 'selfie_click');
};


/**
 * Deselect this tool
 */
app.Tool.prototype.deselect = function() {
  this.isSelected = false;

  this.el.removeClass('Tool--selected');
  this.hoverEl.css({
    top: '',
    left: ''
  });
  // this.elem.css({
  //   cursor: ''
  // });

  this.stopMousedown();
  this.reset();
};


/**
 * Move the tool to the specified mouse position
 * @param {!app.Mouse.CoordsType} mouseCoords transformed coords
 */
app.Tool.prototype.move = function(mouseCoords) {
  this.hoverEl.css({
    left: mouseCoords.x + (this.mouseOffset.x),
    top: mouseCoords.y + (this.mouseOffset.y) + window.santaApp.headerSize,
  });
};


/**
 * Reset on mouse up
 */
app.Tool.prototype.reset = function() {
  return null;
}


/**
 * Draws to the canvas using this tool
 * @param  {!HTMLCanvasElement} canvas The canvas to draw to
 * @param  {!app.Canvas.CoordsType} mouseCoords Mouse coords
 * @param  {!HTMLCanvasElement} prevCanvas  The previously saved canvas
 * @param  {!number} size  The current size setting
 * @param  {!string} color  The current color setting
 * @return {boolean} Whether the canvas was changed
 */
app.Tool.prototype.draw = function(canvas, mouseCoords, prevCanvas, size, color) {
  return false;
}


/**
 * Start playing the tool's sound
 */
app.Tool.prototype.startMousedown = function() {
  app.utils.triggerStart(this.soundKey);
  this.el.addClass('Tool--down');
}


/**
 * Stop playing the tool's sound
 */
app.Tool.prototype.stopMousedown = function() {
  app.utils.triggerStop(this.soundKey);
  this.el.removeClass('Tool--down');
}

