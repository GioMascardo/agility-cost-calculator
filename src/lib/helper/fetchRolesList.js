import Airtable from "airtable";

const base = new Airtable({
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
}).base("appmmz8CRrkwSw3Om");

export default async function fetchRoleList(role) {
  let workFromHomeArr = [];
  let officeArr = [];

  const filteredRecords = await base("tblXJyjikon2jn9gY")
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
    } = record.fields;

    const refactoredRecord = {
      role,
      experienceLevel,
      workOption,
      hireAgilityusd,
      hireOnshoreusd,
      yourSavingsusd,
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
