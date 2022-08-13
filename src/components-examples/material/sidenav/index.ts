import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatLegacyButtonModule} from '@angular/material/legacy-button';
import {MatLegacyCheckboxModule} from '@angular/material/legacy-checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyListModule} from '@angular/material/legacy-list';
import {MatLegacyRadioModule} from '@angular/material/legacy-radio';
import {MatLegacySelectModule} from '@angular/material/legacy-select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {SidenavAutosizeExample} from './sidenav-autosize/sidenav-autosize-example';
import {SidenavBackdropExample} from './sidenav-backdrop/sidenav-backdrop-example';
import {SidenavDisableCloseExample} from './sidenav-disable-close/sidenav-disable-close-example';
import {SidenavDrawerOverviewExample} from './sidenav-drawer-overview/sidenav-drawer-overview-example';
import {SidenavFixedExample} from './sidenav-fixed/sidenav-fixed-example';
import {SidenavModeExample} from './sidenav-mode/sidenav-mode-example';
import {SidenavOpenCloseExample} from './sidenav-open-close/sidenav-open-close-example';
import {SidenavOverviewExample} from './sidenav-overview/sidenav-overview-example';
import {SidenavPositionExample} from './sidenav-position/sidenav-position-example';
import {SidenavResponsiveExample} from './sidenav-responsive/sidenav-responsive-example';
import {SidenavHarnessExample} from './sidenav-harness/sidenav-harness-example';

export {
  SidenavAutosizeExample,
  SidenavBackdropExample,
  SidenavDisableCloseExample,
  SidenavDrawerOverviewExample,
  SidenavHarnessExample,
  SidenavFixedExample,
  SidenavModeExample,
  SidenavOpenCloseExample,
  SidenavOverviewExample,
  SidenavPositionExample,
  SidenavResponsiveExample,
};

const EXAMPLES = [
  SidenavAutosizeExample,
  SidenavBackdropExample,
  SidenavDisableCloseExample,
  SidenavDrawerOverviewExample,
  SidenavHarnessExample,
  SidenavFixedExample,
  SidenavModeExample,
  SidenavOpenCloseExample,
  SidenavOverviewExample,
  SidenavPositionExample,
  SidenavResponsiveExample,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatLegacyButtonModule,
    MatLegacyCheckboxModule,
    MatIconModule,
    MatLegacyListModule,
    MatLegacyRadioModule,
    MatSidenavModule,
    MatLegacySelectModule,
    MatToolbarModule,
    ReactiveFormsModule,
  ],
  declarations: EXAMPLES,
  exports: EXAMPLES,
})
export class SidenavExamplesModule {}
