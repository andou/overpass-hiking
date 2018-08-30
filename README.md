Overpass Hiking
============

### GeoData Manipulation Toolkit for hi-tech hikers

#### Samples

##### Output in JSON di una query
~~~bash
$ npm run -s querydisplay -- --query=appennines-ligurian-peaks-over1600
~~~

##### Apertura automatica di geojson.io su base query
~~~bash
$ npm run -s querydisplay -- --query=appennines-ligurian-peaks-over1600 | geojsonio
~~~

##### Creazione di un tileset con tippecanoe per mapbox studio
~~~bash
$ npm run -s queryoutfile -- --query=appennines-ligurian-peaks-over1600
$ tippecanoe -zg -o ./tilesets/appennines-ligurian-peaks-over1600.mbtiles -l appennines-ligurian-peaks-over1600 -n "Ligurian Appenines Peaks Over 1600 meters" --drop-densest-as-needed --extend-zooms-if-still-dropping ./retrieved-data/appennines_ligurian_peaks_over1600-1535615574643.geojson
~~~