# Bluesky PDS Directory

**WILL MOVE TO Tangled SOON*tm***
A community-maintained directory of Bluesky Personal Data Servers *(PDS)*.

## JSON Structure

The `pdslist.json` file contains an array of PDS server objects. Each object has the following structure:

```json
{
  "url": "https://ypds.example.com",
  "supportedHandles": ["*.example.com", "*.example.net"],
  "maintainer": "@your-handle.example.com",
  "tosUrl": "https://pds.example.com/terms",
  "privacyUrl": "https://pds.example.com/privacy",
  "inviteCodeRequired": false
}
```

### Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `url` | string | ✅ Yes | The base URL of your PDS server (must include https://) |
| `supportedHandles` | array of strings | ✅ Yes | Domain patterns for handles your PDS supports (e.g., `*.example.com`) |
| `maintainer` | string | ✅ Yes | Bluesky handle of the server maintainer (format: `@handle.domain.com`) |
| `contactEmail` | string | ⚠️ Optional | Contact email for the PDS administrator |
| `tosUrl` | string | ⚠️ Optional | URL to your Terms of Service page |
| `privacyUrl` | string | ⚠️ Optional | URL to your Privacy Policy page |
| `inviteCodeRequired` | boolean | ✅ Yes | Whether new users need an invite code to join (`true` or `false`) |

### Example Entry

```json
{
  "url": "https://pds.myserver.com",
  "supportedHandles": [
    "*.myserver.com",
    "*.myserver.org"
  ],
  "maintainer": "@admin.myserver.com",
  "contactEmail": "admin@myserver.com",
  "tosUrl": "https://pds.myserver.com/terms-of-service",
  "privacyUrl": "https://pds.myserver.com/privacy-policy",
  "inviteCodeRequired": true
}
```

## Adding Your PDS

We welcome additions to the directory! There are two ways to add your PDS:

### Option 1: Submit a GitHub Issue

1. Go to the [Issues](../../issues) page
2. Click "New Issue"
3. Select the "Add New PDS" template (or create a new issue)
4. Fill in the template with your PDS information:
   - PDS URL
   - Supported handles
   - Your maintainer handle
   - Contact email (optional)
   - Terms of Service URL (if available)
   - Privacy Policy URL (if available)
   - Whether invite codes are required
5. Submit the issue

A maintainer will review your submission and add it to the list.

### Option 2: Submit a Pull Request

1. Fork this repository
2. Edit `pdslist.json`
3. Add your PDS entry to the array following the structure above
4. Ensure your JSON is valid (use a JSON validator)
5. Commit your changes with a clear message: `Add [your-pds-name] to directory`
6. Create a Pull Request with:
   - A clear title: "Add [your PDS name]"
   - Description of your PDS
   - Confirmation that you maintain the server

### Submission Guidelines

✅ **Do:**
- Use valid JSON formatting
- Include all required fields
- Use HTTPS URLs only
- Provide accurate information
- Test your PDS is accessible before submitting

❌ **Don't:**
- Submit inactive or offline servers
- Include test or development servers
- Use HTTP (non-secure) URLs
- Submit duplicate entries

## Review Process

All submissions are reviewed by maintainers to ensure:
- JSON is properly formatted
- URLs are accessible and valid
- Information is accurate
- The PDS is actively maintained
- Terms and privacy policies exist (if links provided)

## Updating Your Entry

If you need to update your PDS information:

1. Submit an issue with "Update [your-pds-name]" as the title
2. Or create a Pull Request with the updated information

## Removing Your Entry

To remove your PDS from the directory:

1. Submit an issue with "Remove [your-pds-name]" as the title
2. Or create a Pull Request removing your entry

## Code of Conduct

Please be respectful and professional in all interactions. This is a community resource for everyone.

## License

This project is open source and available for anyone to use and contribute to.

## Support

For questions or issues:
- Open a GitHub Issue
- Check existing issues for similar questions

---

**Note:** This is a community-maintained list. We cannot guarantee the availability, security, or policies of listed servers. Always review a server's terms and privacy policy before joining.