/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  OnDestroy,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  MAT_OPTGROUP,
  MAT_OPTION_PARENT_COMPONENT,
  MatOptgroup,
  MatOption,
  mixinDisableRipple,
  CanDisableRipple,
  _MatOptionBase,
  _MatOptgroupBase,
} from '@angular/material/core';
import {ActiveDescendantKeyManager} from '@angular/cdk/a11y';
import {BooleanInput, coerceBooleanProperty, coerceStringArray} from '@angular/cdk/coercion';
import {Platform} from '@angular/cdk/platform';
import {panelAnimation} from './animations';
import {Subscription} from 'rxjs';

/**
 * Autocomplete IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let _uniqueAutocompleteIdCounter = 0;

/** Event object that is emitted when an autocomplete option is selected. */
export class MatAutocompleteSelectedEvent {
  constructor(
    /** Reference to the autocomplete panel that emitted the event. */
    public source: _MatAutocompleteBase,
    /** Option that was selected. */
    public option: _MatOptionBase,
  ) {}
}

/** Event object that is emitted when an autocomplete option is activated. */
export interface MatAutocompleteActivatedEvent {
  /** Reference to the autocomplete panel that emitted the event. */
  source: _MatAutocompleteBase;

  /** Option that was selected. */
  option: _MatOptionBase | null;
}

// Boilerplate for applying mixins to MatAutocomplete.
/** @docs-private */
const _MatAutocompleteMixinBase = mixinDisableRipple(class {});

/** Default `mat-autocomplete` options that can be overridden. */
export interface MatAutocompleteDefaultOptions {
  /** Whether the first option should be highlighted when an autocomplete panel is opened. */
  autoActiveFirstOption?: boolean;

  /** Whether the active option should be selected as the user is navigating. */
  autoSelectActiveOption?: boolean;

  /** Class or list of classes to be applied to the autocomplete's overlay panel. */
  overlayPanelClass?: string | string[];
}

/** Injection token to be used to override the default options for `mat-autocomplete`. */
export const MAT_AUTOCOMPLETE_DEFAULT_OPTIONS = new InjectionToken<MatAutocompleteDefaultOptions>(
  'mat-autocomplete-default-options',
  {
    providedIn: 'root',
    factory: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY,
  },
);

/** @docs-private */
export function MAT_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY(): MatAutocompleteDefaultOptions {
  return {autoActiveFirstOption: false, autoSelectActiveOption: false};
}

/** Base class with all of the `MatAutocomplete` functionality. */
@Directive()
export abstract class _MatAutocompleteBase
  extends _MatAutocompleteMixinBase
  implements AfterContentInit, CanDisableRipple, OnDestroy
{
  private _activeOptionChanges = Subscription.EMPTY;

  /** Class to apply to the panel when it's visible. */
  protected abstract _visibleClass: string;

  /** Class to apply to the panel when it's hidden. */
  protected abstract _hiddenClass: string;

  /** Manages active item in option list based on key events. */
  _keyManager: ActiveDescendantKeyManager<_MatOptionBase>;

  /** Whether the autocomplete panel should be visible, depending on option length. */
  showPanel: boolean = false;

  /** Whether the autocomplete panel is open. */
  get isOpen(): boolean {
    return this._isOpen && this.showPanel;
  }
  _isOpen: boolean = false;

  // The @ViewChild query for TemplateRef here needs to be static because some code paths
  // lead to the overlay being created before change detection has finished for this component.
  // Notably, another component may trigger `focus` on the autocomplete-trigger.

  /** @docs-private */
  @ViewChild(TemplateRef, {static: true}) template: TemplateRef<any>;

  /** Element for the panel containing the autocomplete options. */
  @ViewChild('panel') panel: ElementRef;

  /** Reference to all options within the autocomplete. */
  abstract options: QueryList<_MatOptionBase>;

  /** Reference to all option groups within the autocomplete. */
  abstract optionGroups: QueryList<_MatOptgroupBase>;

  /** Aria label of the autocomplete. */
  @Input('aria-label') ariaLabel: string;

  /** Input that can be used to specify the `aria-labelledby` attribute. */
  @Input('aria-labelledby') ariaLabelledby: string;

  /** Function that maps an option's control value to its display value in the trigger. */
  @Input() displayWith: ((value: any) => string) | null = null;

  /**
   * Whether the first option should be highlighted when the autocomplete panel is opened.
   * Can be configured globally through the `MAT_AUTOCOMPLETE_DEFAULT_OPTIONS` token.
   */
  @Input()
  get autoActiveFirstOption(): boolean {
    return this._autoActiveFirstOption;
  }
  set autoActiveFirstOption(value: BooleanInput) {
    this._autoActiveFirstOption = coerceBooleanProperty(value);
  }
  private _autoActiveFirstOption: boolean;

  /** Whether the active option should be selected as the user is navigating. */
  @Input()
  get autoSelectActiveOption(): boolean {
    return this._autoSelectActiveOption;
  }
  set autoSelectActiveOption(value: BooleanInput) {
    this._autoSelectActiveOption = coerceBooleanProperty(value);
  }
  private _autoSelectActiveOption: boolean;

  /**
   * Specify the width of the autocomplete panel.  Can be any CSS sizing value, otherwise it will
   * match the width of its host.
   */
  @Input() panelWidth: string | number;

  /** Event that is emitted whenever an option from the list is selected. */
  @Output() readonly optionSelected: EventEmitter<MatAutocompleteSelectedEvent> =
    new EventEmitter<MatAutocompleteSelectedEvent>();

  /** Event that is emitted when the autocomplete panel is opened. */
  @Output() readonly opened: EventEmitter<void> = new EventEmitter<void>();

  /** Event that is emitted when the autocomplete panel is closed. */
  @Output() readonly closed: EventEmitter<void> = new EventEmitter<void>();

  /** Emits whenever an option is activated. */
  @Output() readonly optionActivated: EventEmitter<MatAutocompleteActivatedEvent> =
    new EventEmitter<MatAutocompleteActivatedEvent>();

  /**
   * Takes classes set on the host mat-autocomplete element and applies them to the panel
   * inside the overlay container to allow for easy styling.
   */
  @Input('class')
  set classList(value: string | string[]) {
    if (value && value.length) {
      this._classList = coerceStringArray(value).reduce((classList, className) => {
        classList[className] = true;
        return classList;
      }, {} as {[key: string]: boolean});
    } else {
      this._classList = {};
    }

    this._setVisibilityClasses(this._classList);
    this._elementRef.nativeElement.className = '';
  }
  _classList: {[key: string]: boolean} = {};

  /** Unique ID to be used by autocomplete trigger's "aria-owns" property. */
  id: string = `mat-autocomplete-${_uniqueAutocompleteIdCounter++}`;

  /**
   * Tells any descendant `mat-optgroup` to use the inert a11y pattern.
   * @docs-private
   */
  readonly inertGroups: boolean;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _elementRef: ElementRef<HTMLElement>,
    @Inject(MAT_AUTOCOMPLETE_DEFAULT_OPTIONS) defaults: MatAutocompleteDefaultOptions,
    platform?: Platform,
  ) {
    super();

    // TODO(crisbeto): the problem that the `inertGroups` option resolves is only present on
    // Safari using VoiceOver. We should occasionally check back to see whether the bug
    // wasn't resolved in VoiceOver, and if it has, we can remove this and the `inertGroups`
    // option altogether.
    this.inertGroups = platform?.SAFARI || false;
    this._autoActiveFirstOption = !!defaults.autoActiveFirstOption;
    this._autoSelectActiveOption = !!defaults.autoSelectActiveOption;
  }

  ngAfterContentInit() {
    this._keyManager = new ActiveDescendantKeyManager<_MatOptionBase>(this.options).withWrap();
    this._activeOptionChanges = this._keyManager.change.subscribe(index => {
      if (this.isOpen) {
        this.optionActivated.emit({source: this, option: this.options.toArray()[index] || null});
      }
    });

    // Set the initial visibility state.
    this._setVisibility();
  }

  ngOnDestroy() {
    this._keyManager?.destroy();
    this._activeOptionChanges.unsubscribe();
  }

  /**
   * Sets the panel scrollTop. This allows us to manually scroll to display options
   * above or below the fold, as they are not actually being focused when active.
   */
  _setScrollTop(scrollTop: number): void {
    if (this.panel) {
      this.panel.nativeElement.scrollTop = scrollTop;
    }
  }

  /** Returns the panel's scrollTop. */
  _getScrollTop(): number {
    return this.panel ? this.panel.nativeElement.scrollTop : 0;
  }

  /** Panel should hide itself when the option list is empty. */
  _setVisibility() {
    this.showPanel = !!this.options.length;
    this._setVisibilityClasses(this._classList);
    this._changeDetectorRef.markForCheck();
  }

  /** Emits the `select` event. */
  _emitSelectEvent(option: _MatOptionBase): void {
    const event = new MatAutocompleteSelectedEvent(this, option);
    this.optionSelected.emit(event);
  }

  /** Gets the aria-labelledby for the autocomplete panel. */
  _getPanelAriaLabelledby(labelId: string | null): string | null {
    if (this.ariaLabel) {
      return null;
    }

    const labelExpression = labelId ? labelId + ' ' : '';
    return this.ariaLabelledby ? labelExpression + this.ariaLabelledby : labelId;
  }

  /** Sets the autocomplete visibility classes on a classlist based on the panel is visible. */
  private _setVisibilityClasses(classList: {[key: string]: boolean}) {
    classList[this._visibleClass] = this.showPanel;
    classList[this._hiddenClass] = !this.showPanel;
  }
}

@Component({
  selector: 'mat-autocomplete',
  templateUrl: 'autocomplete.html',
  styleUrls: ['autocomplete.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'matAutocomplete',
  inputs: ['disableRipple'],
  host: {
    'class': 'mat-mdc-autocomplete',
  },
  providers: [{provide: MAT_OPTION_PARENT_COMPONENT, useExisting: MatAutocomplete}],
  animations: [panelAnimation],
})
export class MatAutocomplete extends _MatAutocompleteBase {
  /** Reference to all option groups within the autocomplete. */
  @ContentChildren(MAT_OPTGROUP, {descendants: true}) optionGroups: QueryList<MatOptgroup>;
  /** Reference to all options within the autocomplete. */
  @ContentChildren(MatOption, {descendants: true}) options: QueryList<MatOption>;
  protected _visibleClass = 'mat-mdc-autocomplete-visible';
  protected _hiddenClass = 'mat-mdc-autocomplete-hidden';
}
