waybot ([blog](http://waybot.tumblr.com/))
======

A fun way to count bicycle traffic using Arduino, Raspberry Pi, and the web.

Follow along at [http://waybot.tumblr.com/](http://waybot.tumblr.com/).

The purpose of this project is to practice new techniques with ruby, rails, and integrating hardware with the web. I expect this to be a challenge because it will touch everything from setting up an analog sensor to putting its data in a browser via the web.

The first phase is to set up an interface to run, store, and view bicycle traffic data collection sessions. This will be a Rails app.
Second, I plan to update the arduino software to output data in a format that the app can ingest. This will allow uploads.
Third, add a feature to run data collection sessions directly from the browser. This requires getting data directly from the arduino board via USB and onto the web. It's a stretch goal and may not be possible during the first week of work on this project.