Prometheus = $src "client"
Registry  = $src "registry"

describe 'Counter', ->
    client = null
    counter = null
    before ->
        client = new Prometheus(registry: new Registry)

        counter = client.newCounter({
            namespace: "counter_test",
            name: "elapsed_counters_total",
            help: "The number of counter intervals that have elapsed."
        })

        counter.increment(period:"1sec")
        counter.increment(period:"2sec")

    it 'should generate some counter metrics', ->
        lineCount = 0
        lines=[
            '# HELP counter_test_elapsed_counters_total The number of counter intervals that have elapsed.\n' +
            '# TYPE counter_test_elapsed_counters_total counter\n',
            'counter_test_elapsed_counters_total{period="1sec"} 1\n',
            'counter_test_elapsed_counters_total{period="2sec"} 1\n'
        ]
        mockRes =
            writeHead: (statusCode, header) ->
                expect(statusCode).to.equal(200)
                expect(header).to.deep.equal('content-type': 'text/plain; version=0.0.4')
            write: (line) ->
                expect(line).to.equal lines[lineCount]
                lineCount++
            end: () ->
                expect(lineCount).to.equal lines.length

        client.metricsFunc()(null, mockRes)

describe 'Gauge', ->
    client = null
    gauge = null
    before ->
        client = new Prometheus(registry: new Registry)

        gauge = client.newGauge({
            namespace: "gauge_test",
            name: "fixed_test_number",
            help: "A few test numbers we set."
        });

        gauge.set({ period: "1sec" }, 123);
        gauge.set({ period: "1sec" }, 456);

    it 'should generate some gauge metrics', ->
        lineCount = 0
        lines=[
            '# HELP gauge_test_fixed_test_number A few test numbers we set.\n' +
            '# TYPE gauge_test_fixed_test_number gauge\n',
            'gauge_test_fixed_test_number{period="1sec"} 456\n'
        ]
        mockRes =
            writeHead: (statusCode, header) ->
                expect(statusCode).to.equal(200)
                expect(header).to.deep.equal('content-type': 'text/plain; version=0.0.4')
            write: (line) ->
                expect(line).to.equal lines[lineCount]
                lineCount++
            end: () ->
                expect(lineCount).to.equal lines.length

        client.metricsFunc()(null, mockRes)
