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