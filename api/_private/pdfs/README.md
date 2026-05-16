# Private PDF Sources

Paid PDFs should not be placed in the public site root.

Production should use private object storage via:

- `PDF_BEGINNERS_SOURCE_URL`
- `PDF_ADVANCED_SOURCE_URL`
- `PDF_SOURCE_AUTH_TOKEN` or `PDF_SOURCE_AUTH_HEADER`

For local testing only, you can temporarily place `beginners-guide.pdf` and `advanced-educators-guide.pdf` in this folder. PDF binaries are ignored by git.
