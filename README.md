# Prometheus Client

WIP [Prometheus](http://prometheus.io) instrumentation metrics library for
Node.JS. Metrics are intended to be scraped by a Prometheus server.

## Usage

### Getting Started

Install the `prometheus-client` package with NPM:

    npm install prometheus-client

Then require the package and set up a new client instance:

    Prometheus = require("prometheus-client")

    client = new Prometheus({namespace:"my_app"})

