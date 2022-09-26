import {createTestApp, patchDevkitTreeToExposeTypeScript} from '@angular/cdk/schematics/testing';
import {SchematicTestRunner, UnitTestTree} from '@angular-devkit/schematics/testing';
import {createNewTestRunner, migrateComponents, THEME_FILE} from './test-setup-helper';

describe('multiple component styles', () => {
  let runner: SchematicTestRunner;
  let cliAppTree: UnitTestTree;

  async function runMigrationTest(
    components: string[],
    oldFileContent: string,
    newFileContent: string,
  ) {
    cliAppTree.create(THEME_FILE, oldFileContent);
    const tree = await migrateComponents(components, runner, cliAppTree);
    expect(tree.readContent(THEME_FILE)).toBe(newFileContent);
  }

  beforeEach(async () => {
    runner = createNewTestRunner();
    cliAppTree = patchDevkitTreeToExposeTypeScript(await createTestApp(runner));
  });

  describe('mixin migrations', () => {
    it('should replace the old themes with the new ones', async () => {
      await runMigrationTest(
        ['checkbox', 'radio'],
        `
        @use '@angular/material' as mat;
        $theme: ();
        @include mat.legacy-checkbox-theme($theme);
        @include mat.legacy-radio-theme($theme);
      `,
        `
        @use '@angular/material' as mat;
        $theme: ();
        @include mat.checkbox-theme($theme);
        @include mat.checkbox-typography($theme);
        @include mat.radio-theme($theme);
        @include mat.radio-typography($theme);
      `,
      );
    });

    it('should add theme once if both components include it', async () => {
      await runMigrationTest(
        ['button', 'snack-bar'],
        `
        @use '@angular/material' as mat;
        $theme: ();
        @include mat.legacy-button-theme($theme);
        @include mat.legacy-snack-bar-theme($theme);
      `,
        `
        @use '@angular/material' as mat;
        $theme: ();
        @include mat.button-theme($theme);
        @include mat.button-typography($theme);
        @include mat.fab-theme($theme);
        @include mat.fab-typography($theme);
        @include mat.icon-button-theme($theme);
        @include mat.icon-button-typography($theme);
        @include mat.snack-bar-theme($theme);
        @include mat.snack-bar-typography($theme);
      `,
      );
    });

    it('should add correct theme if all-component-themes mixin included', async () => {
      await runMigrationTest(
        ['checkbox', 'radio'],
        `
        @use '@angular/material' as mat;
        $theme: ();
        @include mat.all-legacy-component-themes($theme);
      `,
        `
        @use '@angular/material' as mat;
        $theme: ();
        @include mat.all-component-themes($theme);
      `,
      );
    });

    it('should add correct theme with multi-line theme if all-component-themes mixin included', async () => {
      await runMigrationTest(
        ['checkbox', 'radio'],
        `
        @use '@angular/material' as mat;
        $theme: ();
        @include mat.all-legacy-component-themes((
          color: $config,
          typography: null,
          density: null,
        ));
      `,
        `
        @use '@angular/material' as mat;
        $theme: ();
        @include mat.all-component-themes((
          color: $config,
          typography: null,
          density: null,
        ));
      `,
      );
    });

    it('should add multiple themes for multiple all-component-themes mixins', async () => {
      await runMigrationTest(
        ['checkbox', 'radio'],
        `
        @use '@angular/material' as mat;
        $light-theme: ();
        $dark-theme: ();
        @include mat.all-legacy-component-themes($light-theme);
        @include mat.all-legacy-component-themes($dark-theme);
      `,
        `
        @use '@angular/material' as mat;
        $light-theme: ();
        $dark-theme: ();
        @include mat.all-component-themes($light-theme);
        @include mat.all-component-themes($dark-theme);
      `,
      );
    });
  });
});
