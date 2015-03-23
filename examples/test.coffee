# Increment a counter every 10ms

Prometheus = require "../"

client = new Prometheus()

counter = client.newCounter
    namespace:  "counter_test"
    name:       "elapsed_counters_total"
    help:       "The number of counter intervals that have elapsed."

gauge = client.newGauge
    namespace:  "counter_test"
    name:       "random_number"
    help:       "A random number we occasionally set."

setInterval ->
    counter.increment(period:"1sec")
, 1000

setInterval ->
    counter.increment(period:"2sec")
, 2000

setInterval ->
    gauge.set period:"1sec", Math.random()*1000
, 1000

# tell our client to set up a server on the given port
client.listen(9010)