# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
- Nothing

## [3.0.0] - 2020-04-26
### Added
- Added `unsafeArgs`

### Changed
- `args` are now sanatized to prevent XSS
- Better handling of blank messages

## [2.1.0] - 2020-04-21
### Added
- `<fluent-provider />` as a way to simplifying adding bundles

### Changed
- Improve checking and setting for bundles

## [2.0.0] - 2020-04-19
### Changed
- Instead of the user passing in a `FluentResource` the now pass in an array of `FluentBundle`

## [1.0.1] - 2020-04-18
### Changed
- Fixed formatting of attributes

## [1.0.0] - 2020-04-15
### Added
- Initial commit
- See docs at v1.0.0