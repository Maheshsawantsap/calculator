namespace my.calculator;
using { cuid } from '@sap/cds/common';
entity calculations: cuid {
   // key ID: Integer;
   input1 : Integer;
   input2 : Integer;
   operator: String;
   result  : Integer;
}