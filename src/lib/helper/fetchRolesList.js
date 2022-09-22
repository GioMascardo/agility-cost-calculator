import Airtable from "airtable";

const base = new Airtable({
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
}).base("app50vqJxIvrcmWf9");

export default async function fetchRoleList(role) {
  let workFromHomeArr = [];
  let officeArr = [];

  const filteredRecords = await base("tbls3ucbJyYatNXyR")
    .select({ filterByFormula: `NOT({Roles} != '${role}')` })
    .all();

  filteredRecords.map((record) => {
    const {
      Role: role,
      ["Experience Level"]: experienceLevel,
      ["Work Option"]: workOption,
      ["Hire With Agility USD"]: hireAgilityusd,
      ["Hire Onshore USD"]: hireOnshoreusd,
      ["Your Savings USD"]: yourSavingsusd,
      ["Hire With Agility CAD"]: hireAgilitycad,
      ["Hire Onshore CAD"]: hireOnshorecad,
      ["Your Savings CAD"]: yourSavingscad,
      ["Hire With Agility AUD"]: hireAgilityaud,
      ["Hire Onshore AUD"]: hireOnshoreaud,
      ["Your Savings AUD"]: yourSavingsaud,
      ["Hire With Agility GBP"]: hireAgilitygbp,
      ["Hire Onshore GBP"]: hireOnshoregbp,
      ["Your Savings GBP"]: yourSavingsgbp,
      ["Hire With Agility SGD"]: hireAgilitysgd,
      ["Hire Onshore SGD"]: hireOnshoresgd,
      ["Your Savings SGD"]: yourSavingssgd,
      ["Hire With Agility NZD"]: hireAgilitynzd,
      ["Hire Onshore NZD"]: hireOnshorenzd,
      ["Your Savings NZD"]: yourSavingsnzd,
    } = record.fields;

    const refactoredRecord = {
      role,
      experienceLevel,
      workOption,
      currencies: {
        usd: [hireAgilityusd, hireOnshoreusd, yourSavingsusd],
        cad: [hireAgilitycad, hireOnshorecad, yourSavingscad],
        aud: [hireAgilityaud, hireOnshoreaud, yourSavingsaud],
        gbp: [hireAgilitygbp, hireOnshoregbp, yourSavingsgbp],
        sgd: [hireAgilitysgd, hireOnshoresgd, yourSavingssgd],
        nzd: [hireAgilitynzd, hireOnshorenzd, yourSavingsnzd],
      },
    };

    if (refactoredRecord.workOption === "Office") {
      officeArr = [...officeArr, refactoredRecord];
    } else {
      workFromHomeArr = [...workFromHomeArr, refactoredRecord];
    }
  });

  const parsedList = [
    { workOption: "Work From Home", roles: workFromHomeArr },
    { workOption: "Office", roles: officeArr },
  ];
  return parsedList;
}
