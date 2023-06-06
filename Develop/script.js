// Assignment Code
var generateBtn = document.querySelector("#generate");
var passwordTextbox = document.getElementById("password");

let includeLowercaseCheckBox = document.getElementById("includeLowercase");
let includeUppercaseCheckBox = document.getElementById("includeUppercase");
let includeNumericCheckBox = document.getElementById("includeNumeric");
let includeSpecialCharactersCheckBox = document.getElementById("includeSpecialCharacters");

// define a password object with default properties
let passwordCriteria = {
  includeLowercase: false,
  includeUppercase: false,
  includeNumeric: false,
  includeSpecialCharacters: false,
  length: 8
}


// Add event listeners
generateBtn.addEventListener("click", writePassword);

includeLowercaseCheckBox.addEventListener("change", (event) => {
  passwordCriteria.includeLowercase = event.target.checked;
  // console.log(passwordCriteria)
})
includeUppercaseCheckBox.addEventListener("change", (event) => {
  passwordCriteria.includeUppercase = event.target.checked;
  // console.log(passwordCriteria) //delete

})
includeNumericCheckBox.addEventListener("change", (event) => {
  passwordCriteria.includeNumeric = event.target.checked;
  // console.log(passwordCriteria) //delete

})
includeSpecialCharactersCheckBox.addEventListener("change", (event) => {
  passwordCriteria.includeSpecialCharacters = event.target.checked;
  // console.log(passwordCriteria) //delete
})

// Write password to the #password input
function writePassword() {
  passwordTextbox.textContent = generatePassword(passwordCriteria);
}

let generatePassword = (passwordCriteria) => {

  // ask for the length of the intended password
  let res = prompt("What is the length of the intended password. \n Please enter a digit between 8 to 128.")
  console.log(!Number(res))
  while (
    res === null
    || res.length === 0
    || !Number(res)
    || !Number.isInteger(Number(res))
    || Number(res) > 128
    || Number(res) < 8) {

    res = prompt(`"${res}" is an invalid input. \n Please enter a digit between 8 to 128.`)
  }
  passwordCriteria.length = Number(res);

  // check if character types should be include in the password
  while (
    !(passwordCriteria.includeLowercase
      || passwordCriteria.includeUppercase
      || passwordCriteria.includeNumeric
      || passwordCriteria.includeSpecialCharacters)) {
    if (prompt("Whether or not to include lowercase") === null) {
      passwordCriteria.includeLowercase = false;
    } else {
      passwordCriteria.includeLowercase = true;
    }

    if (prompt("Whether or not to include uppercase") === null) {
      passwordCriteria.includeUppercase = false;
    } else {
      passwordCriteria.includeUppercase = true;
    }

    if (prompt("Whether or not to include numeric") === null) {
      passwordCriteria.includeNumeric = false;
    } else {
      passwordCriteria.includeNumeric = true;
    }

    if (prompt("Whether or not to include special characters") === null) {
      passwordCriteria.includeSpecialCharacters = false;
    } else {
      passwordCriteria.includeSpecialCharacters = true;
    }
  }
  console.log(passwordCriteria)

  //Prepare the character Array
  let characters = [
    'abcdefghijklmnopqrstuvwxyz',  // lowercase letters
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',  // uppercase letters
    '0123456789',                   // numeric digits
    '!@#$%^&*()'                    // special characters
  ];

  let charactersString = "";
  if (passwordCriteria.includeLowercase) {
    charactersString += characters[0];
  }
  if (passwordCriteria.includeUppercase) {
    charactersString += characters[1];
  }
  if (passwordCriteria.includeNumeric) {
    charactersString += characters[2];
  }
  if (passwordCriteria.includeSpecialCharacters) {
    charactersString += characters[3];
  }

  let charactersArray = charactersString.split('')

  // split the password
  let password = "";
  for (let i = 0; i < passwordCriteria.length; i++) {
    password += charactersArray[Math.floor(Math.random() * charactersArray.length)]
  }

  return password
}





