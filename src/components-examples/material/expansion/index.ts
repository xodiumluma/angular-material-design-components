import {NgModule} from '@angular/core';
import {MatLegacyButtonModule} from '@angular/material/legacy-button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyInputModule} from '@angular/material/legacy-input';
import {ExpansionExpandCollapseAllExample} from './expansion-expand-collapse-all/expansion-expand-collapse-all-example';
import {ExpansionOverviewExample} from './expansion-overview/expansion-overview-example';
import {ExpansionStepsExample} from './expansion-steps/expansion-steps-example';
import {ExpansionHarnessExample} from './expansion-harness/expansion-harness-example';

export {
  ExpansionExpandCollapseAllExample,
  ExpansionHarnessExample,
  ExpansionOverviewExample,
  ExpansionStepsExample,
};

const EXAMPLES = [
  ExpansionExpandCollapseAllExample,
  ExpansionHarnessExample,
  ExpansionOverviewExample,
  ExpansionStepsExample,
];

@NgModule({
  imports: [
    MatLegacyButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatIconModule,
    MatLegacyInputModule,
  ],
  declarations: EXAMPLES,
  exports: EXAMPLES,
})
export class ExpansionExamplesModule {}
