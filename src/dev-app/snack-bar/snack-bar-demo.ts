/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Component, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {Directionality} from '@angular/cdk/bidi';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatLegacyFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyInputModule} from '@angular/material/legacy-input';
import {MatSelectModule} from '@angular/material/select';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'snack-bar-demo',
  styleUrls: ['snack-bar-demo.css'],
  templateUrl: 'snack-bar-demo.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatLegacyFormFieldModule,
    MatLegacyInputModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
})
export class SnackBarDemo {
  @ViewChild('template') template: TemplateRef<any>;
  message = 'Snack Bar opened.';
  actionButtonLabel = 'Retry';
  action = false;
  setAutoHide = true;
  autoHide = 10000;
  addExtraClass = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(public snackBar: MatSnackBar, private _dir: Directionality) {}

  open() {
    const config = this._createConfig();
    this.snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
  }

  openTemplate() {
    const config = this._createConfig();
    this.snackBar.openFromTemplate(this.template, config);
  }

  private _createConfig() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    config.panelClass = this.addExtraClass ? ['demo-party'] : undefined;
    config.direction = this._dir.value;
    return config;
  }
}
