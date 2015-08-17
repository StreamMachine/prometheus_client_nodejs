// Increment a counter every 10ms
var Prometheus = require("prometheus-client");

var client = new Prometheus();

var counter = client.newCounter({
    namespace: "counter_test",
    name: "elapsed_counters_total",
    help: "The number of counter intervals that have elapsed."
});

gauge = client.newGauge({
    namespace: "counter_test",
    name: "random_number",
    help: "A random number we occasionally set."
});

setInterval(function() {
    counter.increment({
        period: "1sec" //period is a custom label name in this case with a value of "1sec"
    });
}, 1000);

setInterval(function() {
    counter.increment({
        period: "2sec" //creating a new series with a period label of "2sec"
    });
}, 2000);

setInterval(function() {
    gauge.set({
        period: "1sec"
    }, Math.random() * 1000);
}, 1000);

//tell our client to set up a server on the given port
client.listen(9010);
