import Airtable from "airtable";

const base = new Airtable({
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
}).base("appH9R8fMHzMrQA8z");

export default async function fetchRoleList(role) {
  let workFromHomeArr = [];
  let officeArr = [];

  const filteredRecords = await base("tbliwQjVfECiSHGAb")
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
