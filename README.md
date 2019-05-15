# A11y

An experimental attempt to run accessibility insights, using different insight
engines.

## How to install

```
npm install https://github.com/farskid/a11y.git --save-dev
```

or

```
yarn add https://github.com/farskid/a11y.git -D
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

| Command line option | Descriptopn                                     | Example               | Required |
| ------------------- | ----------------------------------------------- | --------------------- | -------- |
| `--url`             | Specify the url to look into                    | http://localhost:3000 | **Yes**  |
| `--out`             | Specify the output directoty for stored reports | ./reports/            | **No**   |

## License

[MIT](./LICENSE)

Made by Farzad YZ [@farzad_yz](https://twitter.com/farzad_yz).
