const bigdecimal = require('decimal.js');
const cds = require("@sap/cds");
 
module.exports = cds.service.impl(async (srv) => {
    const { calculations } = srv.entities;
 
    srv.before("CREATE", [calculations], async (req) => {
      const { input1, input2, operator } = req.data;
      const result = await calculateResult( input1, input2, operator );
      req.data.result = result;
      console.log("Calculated result...");
    });
 
    const calculateResult = ( input1, input2, operator ) => {
      const bd_input1 = new bigdecimal(input1);
      const bd_input2 = new bigdecimal(input2);
      let result = '';
 
      if(operator === 'add' && typeof input1 === 'number' && typeof input2 === 'number' ) {
        result = bd_input1.plus(bd_input2);
      } else  if(operator === 'sub' && typeof input1 === 'number' && typeof input2 === 'number' ) {
        result = bd_input1.minus(bd_input2);
      } else  if(operator === 'divide' && typeof input1 === 'number' && typeof input2 === 'number' ) {
        result = bd_input1.dividedBy(bd_input2);
      } else {
        result = 'Error: Unsupported oprator';
      }
      return result;
    }
})
 