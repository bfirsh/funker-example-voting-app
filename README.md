# Funker example app

This is an example app using [Funker](https://github.com/bfirsh/funker). It is very similar to [Docker's example voting app](https://github.com/docker/example-voting-app), except instead of using a message queue and worker, it calls a Funker function to process votes in the background.

The Funker function being used is in `process-vote/handler.js`, and it is called from `vote/app.py`.

## Getting started

Download [Docker for Mac or Windows](https://www.docker.com).

Run in this directory:

    $ docker-compose up

The app will be running at [http://localhost:5000](http://localhost:5000), and the results will be at [http://localhost:5001](http://localhost:5001).
