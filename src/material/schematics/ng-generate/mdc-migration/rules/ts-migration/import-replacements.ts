/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

export const IMPORT_REPLACEMENTS: {[component: string]: {old: string; new: string}} = {
  'button': {
    old: '@angular/material/button',
    new: '@angular/material-experimental/mdc-button',
  },
  'card': {
    old: '@angular/material/card',
    new: '@angular/material-experimental/mdc-card',
  },
  'checkbox': {
    old: '@angular/material/legacy-checkbox',
    new: '@angular/material/checkbox',
  },
  'chips': {
    old: '@angular/material/chips',
    new: '@angular/material-experimental/mdc-chips',
  },
  'dialog': {
    old: '@angular/material/legacy-dialog',
    new: '@angular/material/dialog',
  },
  'autocomplete': {
    old: '@angular/material/autocomplete',
    new: '@angular/material-experimental/mdc-autocomplete',
  },
  'form-field': {
    old: '@angular/material/form-field',
    new: '@angular/material-experimental/mdc-form-field',
  },
  'input': {
    old: '@angular/material/input',
    new: '@angular/material-experimental/mdc-input',
  },
  'select': {
    old: '@angular/material/select',
    new: '@angular/material-experimental/mdc-select',
  },
  'core': {
    old: '@angular/material/core',
    new: '@angular/material/core',
  },
  'list': {
    old: '@angular/material/list',
    new: '@angular/material-experimental/mdc-list',
  },
  'menu': {
    old: '@angular/material/menu',
    new: '@angular/material-experimental/mdc-menu',
  },
  'progress-bar': {
    old: '@angular/material/progress-bar',
    new: '@angular/material-experimental/mdc-progress-bar',
  },
  'progress-spinner': {
    old: '@angular/material/legacy-progress-spinner',
    new: '@angular/material/progress-spinner',
  },
  'radio': {
    old: '@angular/material/radio',
    new: '@angular/material-experimental/mdc-radio',
  },
  'sidenav': {
    old: '@angular/material/sidenav',
    new: '@angular/material-experimental/mdc-sidenav',
  },
  'slide-toggle': {
    old: '@angular/material/legacy-slide-toggle',
    new: '@angular/material/slide-toggle',
  },
  'slider': {
    old: '@angular/material/slider',
    new: '@angular/material-experimental/mdc-slider',
  },
  'snack-bar': {
    old: '@angular/material/legacy-snack-bar',
    new: '@angular/material/snack-bar',
  },
  'table': {
    old: '@angular/material/legacy-table',
    new: '@angular/material/table',
  },
  'tabs': {
    old: '@angular/material/legacy-tabs',
    new: '@angular/material/tabs',
  },
  'paginator': {
    old: '@angular/material/legacy-paginator',
    new: '@angular/material/paginator',
  },
  'tooltip': {
    old: '@angular/material/tooltip',
    new: '@angular/material-experimental/mdc-tooltip',
  },
};
