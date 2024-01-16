load("//src/cdk:config.bzl", "CDK_ENTRYPOINTS")
load("//src/cdk-experimental:config.bzl", "CDK_EXPERIMENTAL_ENTRYPOINTS")
load("//src/material:config.bzl", "MATERIAL_ENTRYPOINTS", "MATERIAL_TESTING_ENTRYPOINTS")
load(
  "//src/material-experimental:config.bzl",
  "MATERIAL_EXPERIMENTAL_ENTRYPOINTS",
  "MATERIAL_EXPERIMENTAL_TESTING_ENTRYPOINTS",
)
load("//:packages.bzl", "MDC_PACKAGES")

# List of externals omitted from the APF package output
# We don't want to sort externals - we want to group entries manually
# buildifier: disable=unsorted-list-items
PKG_EXTERNALS = [
  # framework
  "@angular/animations",
  "@angular/common",
  "@angular/common/http",
  "@angular/common/http/testing",
  "@angular/common/testing",
  "@angular/core",
  "@angular/core/testing",
  "@angular/forms",
  "@angular/platform-browser",
  "@angular/platform-browser-dynamic",
  "@angular/platform-browser-dynamic/testing",
  "@angular/platform-browser/animations",
  "@angular/platform-server",
  "@angular/router",

  # project main entry points
  "@angular/cdk",
  "@angular/cdk-experimental",
  "@angular/google-maps",
  "@angular/material",
  "@angular/material-experimental",
  "@angular/material-moment-adapter",
  "@angular/material-luxon-adapter",
  "@angular/material-date-fns-adapter",
  "@angular/youtube-player",
  
  # third-party libraries
  "kagekiri",
  "moment",
  "moment/locale/fr",
  "moment/locale/ja",
  "luxon",
  "date-fns",
  "protractor",
  "rxjs",
  "rxjs/operators",
  "selenium-webdriver",

  # TODO: take out slider deep dependencies as we have removed dependencies on MDC's JS
  "@material/slider/adapter",
  "@material/slider/foundation",
  "@material/slider/types",
]

# Configures externals for all MDC packages
def setup_mdc_externals():
  for pkg_name in MDC_PACKAGES:
      PKG_EXTERNALS.append(pkg_name)

# For a given package & its entry points - create externals
def setup_entry_point_externals(packageName, entryPoints):
    PKG_EXTERNALS.extend(["@angular/%s/%s" % (packageName, entrypoint) for entrypoint in entryPoints])

setup_mdc_externals()

setup_entry_point_externals("cdk", CDK_ENTRYPOINTS)
setup_entry_point_externals("cdk-experimental", CDK_EXPERIMENTAL_ENTRYPOINTS)
setup_entry_point_externals("material", MATERIAL_ENTRYPOINTS + MATERIAL_TESTING_ENTRYPOINTS)
setup_entry_point_externals(
    "material-experimental", 
    MATERIAL_EXPERIMENTAL_ENTRYPOINTS + MATERIAL_EXPERIMENTAL_TESTING_ENTRYPOINTS,
)

# Examples package - external module names
# Individual examples are grouped by package and component
# We add configure these entry-points as external
setup_entry_point_externals("components-examples/cdk", CDK_ENTRYPOINTS)
setup_entry_point_externals("components-examples/cdk-experimental", CDK_EXPERIMENTAL_ENTRYPOINTS)
setup_entry_point_externals(
    "components-examples/material",
    MATERIAL_ENTRYPOINTS + MATERIAL_TESTING_ENTRYPOINTS,
)
setup_entry_point_externals(
    "components-examples/material-experimental",
    MATERIAL_EXPERIMENTAL_ENTRYPOINTS + MATERIAL_EXPERIMENTAL_TESTING_ENTRYPOINTS,
)