**Requirements:**
- [node.js](https://nodejs.org/en/)
- [app-store-scraper](https://www.npmjs.com/package/app-store-scraper)
- [csv-writer](https://www.npmjs.com/package/csv-writer)

**Known Issues:**
1. Special characters may break as some apps do not encode in unicode by default.
- Microsoft Excel:
`Open CSV > Data > From Text/CSV > find csv > file origin = Unicode (UTF-8) > Load`
- Google Sheets:
`Create new sheet > File > Import > upload csv > Seperator type = Comma > Import`

2. Script occasionally throws:
```
{ Error: getaddrinfo ENOTFOUND itunes.apple.com itunes.apple.com:443
    at GetAddrInfoReqWrap.onlookup [as oncomplete] (dns.js:56:26)   
  errno: 'ENOTFOUND',
  code: 'ENOTFOUND',
  syscall: 'getaddrinfo',
  hostname: 'itunes.apple.com',
  host: 'itunes.apple.com',
  port: 443 }
```
Re-run the script until successful, may take a few tries.
