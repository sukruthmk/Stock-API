# Stock-API
A simple stock web scraper to pull data from Zacks

You can call the API like this
[http://localhost:1234/zacks?t=TDOC](http://localhost:1234/zacks?t=TDOC)

This will return response with Zacks rank and VGM
```json
{
	"ticker": "TDOC",
	"rank": 4,
	"value": "F",
	"growth": "D",
	"momentum": "C",
	"vgm": "F"
}
```
