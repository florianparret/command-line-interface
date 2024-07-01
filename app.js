import data from "./data.js";

const getCommandAndValue = () => {
  const longArgFlag = process.argv.slice(2);
  const longArg = longArgFlag[0].split("=");
  const command = longArg[0].slice(2);
  const value = longArg[1];
  const result = { command: command, value: value };
  return result;
};

const commandAndValue = getCommandAndValue();
const command = commandAndValue.command;
const value = commandAndValue.value;

const filter = (value) => {
  const result = [];
  data.map((country, index) => {
    let isContainAnimalValue = false;

    for (let i = 0; i < country.people.length; i++) {
      isContainAnimalValue = JSON.stringify(country.people[i].animals)
        .toLowerCase()
        .includes(value.toLowerCase());
      if (isContainAnimalValue) {
        result.push({ name: country.name, people: [] });
        break;
      }
    }
    country.people.map((person) => {
      if (
        JSON.stringify(person.animals)
          .toLowerCase()
          .includes(value.toLowerCase())
      ) {
        result[result.length - 1].people.push({
          name: person.name,
          animals: [],
        });
      }
      person.animals = person.animals.filter((animal) => {
        if (animal.name.toLowerCase().includes(value.toLowerCase())) {
          result[result.length - 1].people[
            result[result.length - 1].people.length - 1
          ].animals.push({ name: animal.name });
        }
      });
    });
  });
  console.dir(result, { depth: null, colors: true });
};

switch (command) {
  case "filter":
    filter(value);
    break;
  case "count":
    console.log("count command is not implemented yet");
    break;
  default:
    console.log(`Sorry, ${expr} is not a command. Type --help.`);
}
