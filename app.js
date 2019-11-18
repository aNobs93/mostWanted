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
      let searchTraitResults;
          searchTraitResults = searchByTraits(people);
      // TODO: search by traits
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
    searchDescendants(person, people);
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

function searchDescendants(person, people){
  let kids = " ";
  let grandKids = " ";
  let children = people.filter(function(el){
    if(person.id === el.parents[0] || person.id === el.parents[1]){
      return true;
    }else{
      return false;
    }
  })
  if(children.length === 4){
    kids += "\nKids: " + children[0].firstName + children[0].lastName + children[1].firstName + children[1].lastName + children[2].firstName + children[2].lastName + children[3].firstName + children[3].lastName;
  }
  else if(children.length === 3){
    kids += "\nKids: " + children.firstName[0] + children.lastName[0] + children.firstName[1] + children.lastName[1] + children.firstName[2] + children.lastName[2];
  }
  else if(children.length === 2){
    kids += "\nKids: " + children.firstName[0] + children.lastName[0] + children.firstName[1] + children.lastName[1];
  }
  else if(children.length === 1){
    kids += "\nKids: " + children.firstName[0] + children.lastName[0];
  }
}
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let firstChar = firstName.slice(0, 1);
  let firstChars = firstName.slice(1);
  firstChar = firstChar.toUpperCase();
  firstChars = firstChars.toLowerCase();
  firstName = firstChar + firstChars;
  let lastName = promptFor("What is the person's last name?", chars);
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

    let displayOption = prompt("Gender/Height/Weight/EyeColor/Occupation?").toLowerCase().trim();
    let newArray = " ";
  switch(displayOption){
    case "gender":
    let gender = prompt("Male/Female?").toLowerCase();
    newArray = people.filter(function(person){
      if(person.gender === gender){
        return true;
      }else{
        return false;
      }
    })
   
    break;
    case "height":
    // TODO: get person's family
    
    break;
    case "weight":
    let weight = prompt("Pleases enter weight in numbers.");
    newArray = people.filter(function(person){
      if(person.weight == weight){
        return true;
      }else{
        return false;
      }
    })
    break;
    case "eyecolor":
    let eyecolor = prompt("Please enter Eye Color").toLowerCase();
    newArray = people.filter(function(person){
      if(person.EyeColor === eyecolor){
        return true;
      }else{
        return false;
      }
    })
    break;
    case "occupation":
    let occupation = prompt("Please enter occupation").toLowerCase();
    newArray = people.filter(function(person){
      if(person.occupation === occupation){
        return true;
      }else{
        return false;
      }
    })
    break; // stop execution
    default:
    return newArray; // ask again
  }
}


























//   let traitQuestion = prompt("Male/Female?").toLowerCase();
//   let gender = traitQuestion;

//   let foundTraits = people.filter(function(person){
//     if(person.gender === gender){
//       return true;
//     }
//       else{
//         return false;
//       }
//   })

//   return foundTraits;
// }
 // || person.height == height || person.weight == weight || person.eyeColor === eyeColor
// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
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
  else if(parents.length === 0){
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

  // + "\n" + parents[0] + "\n" + parents[1]
}

// function that prompts and validates user input
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


// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
