> [!IMPORTANT]
> This repository was created to demo the simplicity of creating an AI tool with hosting on firebase and a cloud function backend to call the Gemini API. Things change so fast in AI lately that this hasn't been updated, so I am archiving the repo. The code may or may not work, use at your own risk.

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
