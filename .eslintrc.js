jobs:
  eslint:
    name: Run eslint scanning
    runs-on: ubuntu-latest
    permissions:
      contents: read
      security-events: write
      actions: read # only required for a private repository by github/codeql-action/upload-sarif to get the Action run status
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Install ESLint
        run: |
          npm install eslint@8.10.0
          npm install @microsoft/eslint-formatter-sarif@2.1.7
      - name: Run ESLint
        run: npx eslint . \
      --config .eslintrc.js \
      --ext .js,.jsx,.ts,.tsx \
      --format @microsoft/eslint-formatter-sarif \
      --output-file eslint-results.sarif
        continue-on-error: true

      - name: Upload analysis results to GitHub
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: eslint-results.sarif
          wait-for-processing: true
