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

goog.provide('app.Colorpicker');
goog.require('app.Constants');


app.Colorpicker = function($elem) {
  this.elem = $elem;
  this.selector = this.elem.find('[data-colorpicker-selector]');
  this.popup = this.elem.find('[data-colorpicker-popup]');
  this.colors = this.elem.find('[data-colorpicker-color]');
  this.tools = this.elem.find('[data-tool-color]');
  this.setColor('#e34f3a');

  this.colors.each(function() {
    var el = $(this);
    var color = el.attr('data-colorpicker-color');
    el.css('background', color);
  });

  this.selector.on('click.clausedraws', this.togglePopup.bind(this));
  this.colors.on('click.clausedraws', this.onColorClick.bind(this));
};


app.Colorpicker.prototype.togglePopup = function() {
  this.popup.toggleClass('is-visible');
};


app.Colorpicker.prototype.onColorClick = function(event) {
  var color = $(event.target).closest('[data-colorpicker-color]')
      .attr('data-colorpicker-color');
  this.setColor(color);
  this.togglePopup();
};


app.Colorpicker.prototype.setColor = function(color) {
  this.selectedColor = color;
  this.colors.removeClass('is-selected');
  this.elem.find('[data-colorpicker-color="' + color + '"]').addClass('is-selected');
  this.selector.css('background', color);
  this.tools.attr('data-tool-color', color);
};


app.Colorpicker.prototype.isPopupOpen = function() {
  return this.popup.hasClass('is-visible');
};
