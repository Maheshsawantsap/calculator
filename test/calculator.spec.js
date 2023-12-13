const { resolve } = require('path');
const { promisify } = require('util');
const {test } = require('@jest/globals');
const cds = require('@sap/cds');
const { GET, before, after } = require('@sap/cds');

const calculationTestData = [{"value1": 50,"value2": 2,"operator": "add"}]
beforeAll(async ()=> {
    const csn = await promisify(cds.load)(resolve(__dirname,'../srv/calculator-service.cds'));
    await cds.deploy(csn);
    await cds.serve('CalculatorService').from(resolve(__dirname,'../srv/calcuator-service.js'));
    // await cds.connect();
});

afterAll(async ()=> {
    // await cds.disconnect();
});
test('Get calculation records from DB', async ()=> {
    const response = await GET('/CalculatorService/getCalculations')
    expect(response.status).toBe(200);
    expect(response.data).toEqual(calculationTestData);
})
