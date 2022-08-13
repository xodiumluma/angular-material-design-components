import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatLegacyButtonModule} from '@angular/material/legacy-button';
import {MatLegacyCheckboxModule} from '@angular/material/legacy-checkbox';
import {MatLegacyInputModule} from '@angular/material/legacy-input';
import {MatLegacySelectModule} from '@angular/material/legacy-select';
import {MatLegacyTooltipModule} from '@angular/material/legacy-tooltip';
import {TooltipAutoHideExample} from './tooltip-auto-hide/tooltip-auto-hide-example';
import {TooltipCustomClassExample} from './tooltip-custom-class/tooltip-custom-class-example';
import {TooltipDelayExample} from './tooltip-delay/tooltip-delay-example';
import {TooltipDisabledExample} from './tooltip-disabled/tooltip-disabled-example';
import {TooltipManualExample} from './tooltip-manual/tooltip-manual-example';
import {TooltipMessageExample} from './tooltip-message/tooltip-message-example';
import {TooltipModifiedDefaultsExample} from './tooltip-modified-defaults/tooltip-modified-defaults-example';
import {TooltipOverviewExample} from './tooltip-overview/tooltip-overview-example';
import {TooltipPositionExample} from './tooltip-position/tooltip-position-example';
import {TooltipPositionAtOriginExample} from './tooltip-position-at-origin/tooltip-position-at-origin-example';
import {TooltipHarnessExample} from './tooltip-harness/tooltip-harness-example';

export {
  TooltipAutoHideExample,
  TooltipCustomClassExample,
  TooltipDelayExample,
  TooltipDisabledExample,
  TooltipHarnessExample,
  TooltipManualExample,
  TooltipMessageExample,
  TooltipModifiedDefaultsExample,
  TooltipOverviewExample,
  TooltipPositionExample,
  TooltipPositionAtOriginExample,
};

const EXAMPLES = [
  TooltipAutoHideExample,
  TooltipCustomClassExample,
  TooltipDelayExample,
  TooltipDisabledExample,
  TooltipHarnessExample,
  TooltipManualExample,
  TooltipMessageExample,
  TooltipModifiedDefaultsExample,
  TooltipOverviewExample,
  TooltipPositionExample,
  TooltipPositionAtOriginExample,
];

@NgModule({
  imports: [
    CommonModule,
    MatLegacyButtonModule,
    MatLegacyCheckboxModule,
    MatLegacyInputModule,
    MatLegacySelectModule,
    MatLegacyTooltipModule,
    ReactiveFormsModule,
    ScrollingModule, // Required for the auto-scrolling example
  ],
  declarations: EXAMPLES,
  exports: EXAMPLES,
})
export class TooltipExamplesModule {}
