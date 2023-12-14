const cds = require('@sap/cds');
const path = require('path');
const { GET, POST, expect } = cds.test(path.join(__dirname, '/..'), "--in-memory");
let ID;
describe('Consuming Services locally', () => {
 
  it('test service existence', () => {
    const { CalculatorService } = cds.services;
    const { calculations } = CalculatorService.entities
    expect(CalculatorService).to.exist;
    expect(calculations).to.exist;
  })
 
  it('Test HTTP POST request', async () => {
    try {
        const calcs = await POST('/odata/v4/calculator/calculations', { "input1": 35, "input2": 5, "operator": "add" });
        expect(calcs.status).to.equal(201);
    } catch (err) {
        console.log(err);
    }
  });
 
  it('Test HTTP GET request', async () => {
    try {
    const calcs = await GET('/odata/v4/calculator/calculations');
      expect(calcs.status).to.equal(200);
      expect(calcs.data.value[0].result).to.equal(40);
    console.log(calcs.data.value[0]);
    ID = calcs.data.value[0].ID;
    } catch (err) {
        console.log(err);
    }
  })
 
  it('Test HTTP POST request', async () => {
    try {
        const calcs = await GET(`/odata/v4/calculator/calculations(${ID})`, { "input1": 35, "input2": 5, "operator": "add" });
        expect(calcs.status).to.equal(200);
    } catch (err) {
        console.log(err);
    }
  });
 
})