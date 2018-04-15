var Nightmare = require('nightmare')

const getBondInfoAsync = async function(serial: string, date, value:number){
  const m = await Nightmare()
  .goto("http://www.treasurydirect.gov/BC/SBCPrice")
  .type('[name="IssueDate"]',date)
  .type('[name="SerialNumber"]',serial)
  .select('[name="Denomination"]', value)
  .click('input[type="submit"]')
  .wait('table.bnddata .altrow1 td')
  .evaluate(()=>{
      return [...document.querySelectorAll('table.bnddata .altrow1 td')]
      .map(td=>(<any>td).innerText);
  })
  .end();
  return {
      serial: m[0],
      series: m[1],
      denomination: m[2],
      issueDate: m[3],
      nextAccrual: m[4],
      finalMaturity: m[5],
      issuePrice: m[6],
      interest: m[7],
      interestRate:m[8],
      value: m[9],
      note: m[10]
    };
}

module.exports = {
  getBondInfoAsync: getBondInfoAsync
};
