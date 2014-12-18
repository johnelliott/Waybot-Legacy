waybot ([blog](http://waybot.tumblr.com/))
======

A fun way to count bicycle traffic using Arduino, Raspberry Pi, and the web.

Follow along at [http://waybot.tumblr.com/](http://waybot.tumblr.com/).

The purpose of this project is to practice new techniques with ruby, rails, and integrating hardware with the web. 

This app is an interface to run, store, and view bicycle traffic data collection sessions. Second, I have an Arduino automatic traffic recorder sending data in a format that the app can ingest over a USB connection. This will [Waybot-node](https://github.com/johnelliott/Waybot-node)allows uploads by adding a Raspberry Pi with a Node.js app via websockets.

Currently I have a basic live chart functionging. I'd like to support starting, stopping and persisting the data from the front-end back to rails, and making the whole process more robust and to support inspecting and stopping an in-progress data collection run.