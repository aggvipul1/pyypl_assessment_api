import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: 'cypress/api_specs/*.ts',
    supportFile: false,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: true,
      html: true,
      json: true,
      code: false
    },
  }
});
