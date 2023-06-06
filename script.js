// declare variables
var generateBtn = document.querySelector("#generate");
generateBtn.disabled = true;

var passwordTextbox = document.getElementById("password");

let includeLowercaseCheckBox = document.getElementById("includeLowercase");
let includeUppercaseCheckBox = document.getElementById("includeUppercase");
let includeNumericCheckBox = document.getElementById("includeNumeric");
let includeSpecialCharactersCheckBox = document.getElementById("includeSpecialCharacters");
let warningTxt = document.getElementById("warningTxt");
let passwordLength = document.getElementById("passwordLength");


// define a password object with default properties
let passwordCriteria = {
  includeLowercase: false,
  includeUppercase: false,
  includeNumeric: false,
  includeSpecialCharacters: false,
  length: 8,
  validPasswordLength: false
}


// Add event listeners
generateBtn.addEventListener("click", writePassword);

includeLowercaseCheckBox.addEventListener("change", (event) => {
  passwordCriteria.includeLowercase = event.target.checked;
  validatePassword();
})

includeUppercaseCheckBox.addEventListener("change", (event) => {
  passwordCriteria.includeUppercase = event.target.checked;
  validatePassword();
})

includeNumericCheckBox.addEventListener("change", (event) => {
  passwordCriteria.includeNumeric = event.target.checked;
  validatePassword();
})

includeSpecialCharactersCheckBox.addEventListener("change", (event) => {
  passwordCriteria.includeSpecialCharacters = event.target.checked;
  validatePassword();
})

passwordLength.addEventListener("input", (event) => {
  // validate the password length input while input
  let value = event.target.value;
  if (
    value === null
    || value.length === 0
    || !Number(value)
    || !Number.isInteger(Number(value))
    || Number(value) > 128
    || Number(value) < 8) {

    passwordCriteria.validPasswordLength = false;
    updateWarningTxt(`"${value}" is an invalid input. \n Please enter a digit between 8 to 128.`)

  } else {
    passwordCriteria.length = Number(value);
    passwordCriteria.validPasswordLength = true;
    updateWarningTxt("")
  }
  validatePassword();
})


// update the warning text
let updateWarningTxt = (text) => {
  warningTxt.textContent = text;
}


// Write password to the #password input
function writePassword() {
  passwordTextbox.textContent = generatePassword();
}


// valid the password, disable the generateBtn for invalid requirements
let validatePassword = () => {

  if (!passwordCriteria.validPasswordLength) {
    generateBtn.disabled = true;
    return;
  } else if (!(passwordCriteria.includeLowercase || passwordCriteria.includeUppercase || passwordCriteria.includeNumeric || passwordCriteria.includeSpecialCharacters)) {
    updateWarningTxt("At least one character type should be selected.")
    generateBtn.disabled = true;
  } else {
    generateBtn.disabled = false;
    updateWarningTxt("");
  }
}



// generate Password
let generatePassword = () => {

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





