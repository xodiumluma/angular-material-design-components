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