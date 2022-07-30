const assert = require('assert');

describe('JSON.org page', () => {
    before(() => {
        browser.enablePerformanceAudits()
    })

    it('should load within performance budget', async () => {
        /**
         * this page load will take a bit longer as the DevTools service will
         * capture all metrics in the background
         */
        browser.url('http://json.org')

        // browser.emulateDevice('iPhone X')

        let metrics = await browser.getMetrics();

        assert.ok(metrics.speedIndex < 1500) // check that speedIndex is below 1.5ms

        let score = await browser.getPerformanceScore() // get Lighthouse Performance score
        assert.ok(score >= .99) // Lighthouse Performance score is at 99% or higher

        $('=Esperanto').click()

        metrics = await browser.getMetrics()
        assert.ok(metrics.speedIndex < 1500)
        score = browser.getPerformanceScore()
        assert.ok(score >= .99)
    })

    after(() => {
        browser.disablePerformanceAudits()
    })
})