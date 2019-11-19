"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      let searchTraits = promptTraits("Well can you input some traits if asked? Enter 'yes' or 'no'", yesNo).toLowerCase();
      let searchTraitResults = searchByTraits(people);
      let traitResults = searchTraitResults;
      let traitResultsLength = traitResults.length;
      if(traitResultsLength > 21 ){
        break;
      }else{
      let foundNames = descendantsNames(traitResults);
      alert("Based on the traits we found, " + foundNames);
      console.log(searchTraitResults);
      }
      break;
      default:
    app(people); // restart app 
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
    displayPerson(person);
    break;
    case "family":
    // TODO: get person's family
    displayFamily(person, people);
    break;
    case "descendants":
    // TODO: get person's descendants
    let emptyArray = [];
    let finalDescendants = searchDescendants(person, people, emptyArray);
    let famBamNames = descendantsNames(finalDescendants);
    alert("Descendants of " + person.firstName + " " + person.lastName + ":" + "\n" + famBamNames);
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchDescendants(person, people, foundDescendants){
  let children = people.filter(function(el){
    if(person.id === el.parents[0] || person.id === el.parents[1]){
      return true;
    }else{
      return false;
    }
  });
    foundDescendants = foundDescendants.concat(children);
    if(children.length > 0){
    let childrenLength = children.length;
    for(let i = 0; i < childrenLength; i++){
      foundDescendants = searchDescendants(children[i], people, foundDescendants)
    }

  }
   return foundDescendants;
}

function descendantsNames(finalDescendants){
  let arrayNames = finalDescendants;
  let arrayNamesLength = finalDescendants.length;
  let childrenNames = " ";
  for(let i = 0; i < arrayNamesLength; i++){
  childrenNames +="\n" + arrayNames[i].firstName + " " + arrayNames[i].lastName;
    
  }
  finalDescendants = childrenNames;
  return finalDescendants;
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars).trim();
  let firstChar = firstName.slice(0, 1);
  let firstChars = firstName.slice(1);
  firstChar = firstChar.toUpperCase();
  firstChars = firstChars.toLowerCase();
  firstName = firstChar + firstChars;
  let lastName = promptFor("What is the person's last name?", chars).trim();
  let lastChar = lastName.slice(0, 1);
  let lastChars = lastName.slice(1);
  lastChar = lastChar.toUpperCase();
  lastChars = lastChars.toLowerCase();
  lastName = lastChar + lastChars;

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson[0];
}


function searchByTraits(people){
  let searchResults = people;
  
  while(searchResults.length > 1){
    let displayOption = prompt("Please enter one of the following traits you would like to search for.\nAfter the first initial search you will be able to refine that search with another trait.\nGender\nHeight\nWeight\nEyeColor\nOccupation\nAge\nOr simply Quit to end the program").toLowerCase().trim();
  switch(displayOption){
    case "gender":
    searchResults = searchByGender(searchResults);
   
    break;
    case "height":
    searchResults = searchByHeight(searchResults);
    
    break;
    case "weight":
    searchResults = searchByWeight(searchResults);

    break;
    case "eyecolor":
    searchResults = searchByEyeColor(searchResults);

    break;
    case "occupation":
    searchResults = searchByOccupation(searchResults);

    break; // stop execution
    case "age":
    searchResults = searchByAge(searchResults);

    break;
   case "quit":
    alert("Have a good day.")
    return searchResults;

    break;
    case "null":
    alert("Have a good day.")
    return searchResults;
  }
}
 return searchResults;
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  let realAge = getAge(person);
  personInfo += "Age: " + realAge + "\n";
  personInfo += "Height: " + (person.height*0.083333) + "\n";
  personInfo += "Weight: " + person.weight +"lbs" +"\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

function getAge(person) {
    let today = new Date();

    let birthDate = new Date(person.dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function getAge2(person){
    let today = new Date();
    let date = today.getFullYear();
    let birthDate = person.dob;
    let finalDate = birthDate.split("/");
    let age = date - finalDate[2]
        return age;
    
}

function displayFamily(person, people){
let familyString = "";
  let spouse = people.filter(function(el){
      if(el.id === person.currentSpouse){
        return true;
      }else{
        return false;
      }
   })
  if(spouse.length === 1){  
  familyString += "Spouse: " + spouse[0].firstName + " " + spouse[0].lastName;
}else if(spouse.length < 1){
  familyString += "Spouse: none";
}
  let parents = people.filter(function(el){
    if(el.id === person.parents[0] || el.id === person.parents[1]){
      return true;
    }else{
      return false;
    }
  })
  if(parents.length === 1){
  familyString += "\nParents: " + parents[0].firstName + " " + parents[0].lastName;
}
  else if(parents.length > 1){
    familyString += "\nParents: " + parents[0].firstName + " " + parents[0].lastName + ", " + parents[1].firstName + " " + parents[1].lastName;
}
  else if(parents.length < 1){
    familyString += "\nParents: None";
    alert(familyString);
    return familyString;

  }
  let siblings = people.filter(function(el){
    if(el.id != person.id && el.parents[0] === parents[0].id || el.parents[0] === parents[1].id && el.parents[1] === parents[0] || el.parents[1] === parents[1]){
      return true;
    }else{
      return false;
    }
  })
  if(siblings.length === 1){
    familyString += "\nSiblings: " + siblings[0].firstName + " " + siblings[0].lastName;
    alert(familyString);
  }else if(siblings.length === 2){
    familyString += "\nSiblings: " + siblings[0].firstName + " " + siblings[0].lastName + ", " + siblings[1].firstName + " " + siblings[1].lastName;
    alert(familyString);
  }else if(siblings.length === 3){
    familyString += "\nSiblings: " + siblings[0].firstName + " " + siblings[0].lastName + ", " + siblings[1].firstName + " " + siblings[1].lastName + ", " + siblings[2].firstName + " " + siblings[2].lastName;
    alert(familyString);
  }else if(siblings.length === 4){
    familyString += "\nSiblings: " + siblings[0].firstName + " " + siblings[0].lastName + ", " + siblings[1].firstName + " " + siblings[1].lastName + ", " + siblings[2].firstName + " " + siblings[2].lastName + ", " + siblings[3].firstName + " " + siblings[3].lastName;
    alert(familyString);  
  }else{
    alert(familyString);
  }
}

function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

function promptTraits(question, valid){
  do{ 
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

function chars(input){
  return true;
}

function searchByGender(people){
      let gender = prompt("Male/Female?").toLowerCase();
    let newArray = people.filter(function(el){
      if(el.gender === gender){
        return true;
      }
      else{
        return false;
      }
    })
    return newArray;
}

function searchByHeight(people){
     let height = prompt("Please enter height");
    let newArray = people.filter(function(el){
      if(el.height == height){
        return true;
      }
      else{ 
        return false;
      }
    })
    return newArray;
}

function searchByWeight(people){
      let weight = prompt("Pleases enter weight in numbers.");
    let newArray = people.filter(function(el){
      if(el.weight == weight){
        return true;
      }
      else{
        return false;
      }
    })
    return newArray;
}

function searchByEyeColor(people){
      let eyecolor = prompt("Please enter Eye Color").toLowerCase();
    let newArray = people.filter(function(el){
      if(el.EyeColor === eyecolor){
        return true;
      }
      else{
        return false;
      }
    })
    return newArray;
}

function searchByOccupation(people){
      let occupation = prompt("Please enter occupation").toLowerCase();
    let newArray = people.filter(function(el){
      if(el.occupation === occupation){
        return true;
      }
      else{
        return false;
      }
    })
    return newArray;
}

function searchByAge(people){
      let knownDOB = prompt("Do you know there DOB? Yes/No").toLowerCase();
      if(knownDOB === "yes"){
        let dOB = prompt("Please enter DOB. mm/dd/yyyy")
        let newArray = people.filter(function(el){
        if(el.dob === dOB){
          return true;
        }
        else{
          return false;
        }
      })

      }else if(knownDOB === "no"){
        let knownAge = prompt("Please enter there age.").trim();
        let newArray = people.filter(function(person){
            let peoplesAge = getAge2(person);
            if (peoplesAge == knownAge){
              return true;
            }
            else{
              return false;
            }

      })
        return newArray;
  }
}