# A11y

![Npm Version](https://img.shields.io/npm/v/npm.svg)
[![Build Status](https://travis-ci.com/farskid/a11y.svg?branch=master)](https://travis-ci.com/farskid/a11y)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/farskid/a11y/pulls)
[![license](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)](https://github.com/farskid/a11y/blob/master/LICENSE)

An experimental attempt to run accessibility insights, using different insight
engines.

## How to install

```
npm install @farskid/a11y --save-dev
```

or

```
yarn add @farskid/a11y -D
```

## How it works

The command line runs two engines, **pa11y** and **axe core**, gathers their
respenctive insights, prints the report to the stdout and stores the results in
`a11y-report-pa11y.json` and `a11y-report-axecore.json` inside a directory that
you can define.

## Example

Running from command line:

```
a11y --url https://localhost:3000 --out ./reports/
```

## API

| Command line option | Descriptopn                                                                                 | Example               | Required | Default |
| :------------------ | :------------------------------------------------------------------------------------------ | :-------------------- | :------: | :-----: |
| `--url`             | Specify the url to look into                                                                | http://localhost:3000 | **Yes**  |    -    |
| `--out`             | Specify the output directoty for stored reports                                             | ./reports/            |  **No**  |   ./    |
| `--standard`        | Specify the standard to test against (Supported Standards: `WCAG2A`,`WCAG2AA`,`Section508`) | Section508            |  **No**  | WCAG2A  |
| `--fail-on-error`        | If the process should fail and exit in case it finds any errors (it doesn't consider warnings and notices) | false            |  **No**  | false  |

> Note: `--out` will create all parent directories that do not exist recursively!

> Note: Standards are case sensitive!

## Roadmap

- [ ] Sync stored issue interface of engines
- [ ] Possible integration with Cypress to inspect the issues in action
- [ ] Visualize the stored issues in a generated HTML with reasonable styles

## License

[MIT](./LICENSE)

Made by Farzad YZ [@farzad_yz](https://twitter.com/farzad_yz).
