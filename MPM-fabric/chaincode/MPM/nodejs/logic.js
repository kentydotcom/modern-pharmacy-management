'use strict';
const { Contract} = require('fabric-contract-api');

class prescription extends Contract {



   async queryRecord(ctx,prescriptionId) {

    let dataAsBytes = await ctx.stub.getState(prescriptionId);
    // let dataAsBytes = await ctx.stub.getState(prescriptionId,prescriptionTag);
    if (!dataAsBytes || dataAsBytes.toString().length <= 0) {
      throw new Error('PRESCRIPTION WITH THIS ID DOES NOT EXIST: ');
       }
      let data=JSON.parse(dataAsBytes.toString());

      return JSON.stringify(data);
     }

   async addRecord(ctx,prescriptionId,data1,data2,data3,data4,data5,data6) {

    let data={
      '001-PRESCRIPTION-ID:':prescriptionId,
      '002-PROVIDER-ID:':data1,
      '003-MEMBER-ID:':data2,
      '004-PAYER-ID:':data3,
      '005-PRESCRIPTION':data4,
      '006-REMARKS':data5,
      '007-CONSENT:':data6,
       };

    await ctx.stub.putState(prescriptionId,Buffer.from(JSON.stringify(data)));

    console.log('PRESCRIPTION RECORD ADDED TO THE LEDGER SUCCESSFULLY!');

  }


  //  async addTag(ctx,prescriptionTag,message) {
  //
  //   let tag={
  //     'PRESCRIPTION-TAG:':prescriptionTag,
  //     'MESSAGE:':message,
  //      };
  //
  //   await ctx.stub.putState(prescriptionId,Buffer.from(JSON.stringify(tag)));
  //
  //   console.log('TAG ADDED TO PRESCRIPTION RECORD SUCCESSFULLY!');
  //
  // }


}

module.exports=prescription;
