# Gemini Demo Tech Support

This repo is a demo of using cloud functions with Gemini to build Gen AI apps. It uses [Cloud Functions](https://cloud.google.com/functions)
as a backend.

It includes:

- Pre built tests using mocha and chai to get started easily.
- Hosting the function locally on port 8080.
- Cloudbuild yaml file for easy integration to continuous delivery if required.
- Github Actions for testing and branch status checks on PR merges.

Requires Node v22 or higher.

## Usage

### Local hosting

`npm start` will kick up the server and host your code on port 8080.

You can then run something like:

```bash
curl -X POST -H "Content-Type: application/json" \
    -d '{"message": "Help my printer isnt working."}' \
    http://localhost:8080
```

To see how your function would respond once deployed.

### Testing

`npm test` will run all tests in the /tests folder.
