# PDSList
A community-maintained directory of Bluesky Personal Data Servers *(PDS)*.
![https://pds.madebydanny.uk/xrpc/com.atproto.sync.getBlob?did=did:plc:l37td5yhxl2irrzrgvei4qay&cid=bafkreib3sximl3c3nbz55ihz4tvnkdix7fub74a23rxt2qeboit3t6q5ku](https://pds.madebydanny.uk/xrpc/com.atproto.sync.getBlob?did=did:plc:l37td5yhxl2irrzrgvei4qay&cid=bafkreib3sximl3c3nbz55ihz4tvnkdix7fub74a23rxt2qeboit3t6q5ku)
## JSON Structure

The `pdslist.json` file contains an array of PDS server objects with the following fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `url` | string | ✅ | The base URL of your PDS server (HTTPS only) |
| `supportedHandles` | array | ✅ | Domain patterns your PDS supports (e.g., `*.example.com`) |
| `maintainer` | string | ✅ | Bluesky handle of the maintainer (`@handle.domain`) |
| `contactEmail` | string | ⚠️ | Contact email for the administrator |
| `tosUrl` | string | ⚠️ | Terms of Service URL |
| `privacyUrl` | string | ⚠️ | Privacy Policy URL |
| `inviteCodeRequired` | boolean | ✅ | Whether invite codes are required |

**Example:**
```json
{
  "url": "https://pds.example.com",
  "supportedHandles": ["*.example.com"],
  "maintainer": "@admin.example.com",
  "contactEmail": "admin@example.com",
  "tosUrl": "https://pds.example.com/tos",
  "privacyUrl": "https://pds.example.com/privacy",
  "inviteCodeRequired": true
}
```
## Removals
- **Remove:** Submit an issue titled "Remove [your-pds-name]" or create a PR removing your entry

## License & Support

Open source and community-maintained. For questions, open an issue

**Disclaimer:** This is a community list. Always review server terms and privacy policies before joining.
