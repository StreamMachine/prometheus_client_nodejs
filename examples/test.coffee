# Increment a counter every 10ms

Prometheus = require "../"

client = new Prometheus namespace:"counter_test"

counter = client.newCounter
    name:   "elapsed_counters_total"
    help:   "The number of counter intervals that have elapsed."

client.register(counter)

setInterval ->
    counter.increment(period:"1sec")
, 1000

setInterval ->
    counter.increment(period:"2sec")
, 2000

# tell our client to set up a server on the given port
client.listen(9010)