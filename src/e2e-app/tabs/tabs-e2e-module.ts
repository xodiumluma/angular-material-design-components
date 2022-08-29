/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import {MatLegacyFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyInputModule} from '@angular/material/legacy-input';
import {MatLegacyTabsModule} from '@angular/material/legacy-tabs';
import {BasicTabs} from './tabs-e2e';

@NgModule({
  imports: [MatLegacyTabsModule, MatLegacyFormFieldModule, MatLegacyInputModule],
  declarations: [BasicTabs],
})
export class TabsE2eModule {}
