import {FocusMonitor} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule, ViewportRuler} from '@angular/cdk/scrolling';
import {CdkTableModule, DataSource} from '@angular/cdk/table';
import {Component, ElementRef, NgModule, ErrorHandler} from '@angular/core';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatLegacyCardModule} from '@angular/material/legacy-card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyInputModule} from '@angular/material/legacy-input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatLegacyProgressBarModule} from '@angular/material/legacy-progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatLegacyTooltipModule} from '@angular/material/legacy-tooltip';
import {MatBottomSheetModule, MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDividerModule} from '@angular/material/divider';
import {MatLegacyFormFieldModule} from '@angular/material/legacy-form-field';
import {MatSortModule} from '@angular/material/sort';
import {MatStepperModule} from '@angular/material/stepper';
import {YouTubePlayerModule} from '@angular/youtube-player';
import {GoogleMapsModule} from '@angular/google-maps';
import {Observable, of as observableOf} from 'rxjs';

export class TableDataSource extends DataSource<any> {
  connect(): Observable<any> {
    return observableOf([{userId: 1}, {userId: 2}]);
  }

  disconnect() {}
}

@Component({
  template: `<button>Do the thing</button>`,
})
export class TestEntryComponent {}

@Component({
  selector: 'kitchen-sink',
  templateUrl: './kitchen-sink.html',
  styles: [
    `
    .universal-viewport {
      height: 100px;
      border: 1px solid black;
    }
  `,
  ],
})
export class KitchenSink {
  /** List of columns for the CDK and Material table. */
  tableColumns = ['userId'];

  /** Data source for the CDK and Material table. */
  tableDataSource = new TableDataSource();

  /** Data used to render a virtual scrolling list. */
  virtualScrollData = Array(10000).fill(50);

  constructor(
    snackBar: MatSnackBar,
    dialog: MatDialog,
    viewportRuler: ViewportRuler,
    focusMonitor: FocusMonitor,
    elementRef: ElementRef<HTMLElement>,
    bottomSheet: MatBottomSheet,
  ) {
    focusMonitor.focusVia(elementRef, 'program');
    snackBar.open('Hello there');
    dialog.open(TestEntryComponent);
    bottomSheet.open(TestEntryComponent);

    // Do a sanity check on the viewport ruler.
    viewportRuler.getViewportRect();
    viewportRuler.getViewportSize();
    viewportRuler.getViewportScrollPosition();
  }
}

@NgModule({
  imports: [
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatLegacyCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatLegacyFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatLegacyInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatLegacyProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatLegacyTooltipModule,
    MatExpansionModule,
    MatSortModule,
    MatTableModule,
    MatStepperModule,
    ScrollingModule,

    // CDK Modules
    CdkTableModule,
    DragDropModule,

    // Other modules
    YouTubePlayerModule,
    GoogleMapsModule,
  ],
  declarations: [KitchenSink, TestEntryComponent],
  exports: [KitchenSink, TestEntryComponent],
  providers: [
    {
      // If an error is thrown asynchronously during server-side rendering it'll get logged to stderr,
      // but it won't cause the build to fail. We still want to catch these errors so we provide an
      // `ErrorHandler` that re-throws the error and causes the process to exit correctly.
      provide: ErrorHandler,
      useValue: {handleError: ERROR_HANDLER},
    },
  ],
})
export class KitchenSinkModule {}

export function ERROR_HANDLER(error: Error) {
  throw error;
}
