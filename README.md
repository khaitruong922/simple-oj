# Simple OJ

An attempt to build a simple NodeJS online judge.

## Requirements

-   NodeJS

-   Docker

## Run project

```
yarn
docker compose build
yarn start
```

## How it works:

-   Create a NodeJS docker container to safely execute submission code.

-   Run the submission file with predefined input and redirect program output into a file.

-   Compare the output file with the test output file and return the verdict.
