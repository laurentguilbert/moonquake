# Moonquake - 2022 Space Apps Challenge

This repository contains the code used to complete the Challenge [Make a Moonquake Map!](https://2022.spaceappschallenge.org/challenges/2022-challenges/moonquake-map/details)
of [2022 Nasa Space Apps Challenge](https://www.spaceappschallenge.org/).

## Scraping the data

To make use of the [Apollo seismic data](https://pds-geosciences.wustl.edu/lunar/urn-nasa-pds-apollo_pse/data/) we made two other repositories:

- To scrape and download all seismic data : [link to repository](https://github.com/aanghelidi/space-app-moon-scraper)
- To process **seed data** (downsampling and filtering channel) and adapt it for the backend of the application : [link to repository](https://github.com/aanghelidi/space-app-moon-exporter)
## Demo

[Moonquake Study](https://moonquake.study/)

## Usage/Examples

To build the project with `docker`

```
docker build -t moonquake:0.1 -f ./deploy/Dockerfile .
```

## Authors

- [@aanghelidi](https://github.com/aanghelidi)
- [@gcalmettes](https://github.com/gcalmettes/)
- [@laurentguilbert](https://github.com/laurentguilbert)

