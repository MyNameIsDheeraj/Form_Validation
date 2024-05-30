const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const number = document.querySelector("#number");
const password = document.querySelector("#password");
const cpassword = document.querySelector("#cpassword");
const dob = document.querySelector("#dob");
const errorMessage = document.querySelector("#error-message");
const submitButton = document.getElementById("submitButton");


submitButton.addEventListener("click", (e) =>{
    const usernameVal = username.value.trim();
    const emailVal = email.value.trim();
    const numberVal = number.value.trim();
    const passwordVal = password.value.trim();
    const cpasswordVal = cpassword.value.trim();
    const dobVal = dob.value.trim();

    localStorage.setItem('user name', usernameVal);
    localStorage.setItem('email', emailVal)
    localStorage.setItem('number', numberVal)
    localStorage.setItem('password', passwordVal)
    localStorage.setItem('date of birth', dobVal)
})








// Check Error 
function setError(element,message){
    const inputGroup = element.parentElement;
    const errorElement = inputGroup.querySelector(".error"); //It represents the parent element of the current input field. 
    errorElement.innerText = message; //It is a reference to an HTML element that is meant to display error messages associated with a specific input field. Typically, this element has a class of "error," and it's found within the parent container (inputGroup).
    inputGroup.classList.add('error'); //class list only read propertys of the element
    inputGroup.classList.remove('success');
}
function setSuccess(element){
    const inputGroup = element.parentElement;
    const errorElement = inputGroup.querySelector(".error"); //It represents the parent element of the current input field. 
    errorElement.innerText = ''; //It is a reference to an HTML element that is meant to display error messages associated with a specific input field. Typically, this element has a class of "error," and it's found within the parent container (inputGroup).
    inputGroup.classList.add('success');  //class list only read propertys of the element
    inputGroup.classList.remove('error');
}
// validate Email
const validateEmailFormat = (email) =>{
    return String(email).toLowerCase().match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/    );
}
//validate Number
const validateNumberFormat = (number) =>{
    return number.match(
        /^\+91[6-9]\d{9}/
    );
}
//validate  Date of birth
const validateDobFormat = (dob) =>{
    return dob.match(
        /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
    );
}

const validatePasswordStrength = (passwordVal) =>{
    const passwordIndi = document.querySelector(".strength");
    let strength = 0;
    if(passwordVal.length>8){
        strength += 1;
    }
    if(/[a-z]/.test(passwordVal)){
        strength += 1;
    }
    if(/[A-Z]/.test(passwordVal)){
        strength += 1;
    }
    if(/[0-9]/.test(passwordVal)){
        strength += 1;
    }
    if(/[!@#$%^&*()_+{}[\]|\/;:"'<>?,.]/.test(passwordVal)){
        strength += 1;
    }

    if(strength === 0){
        passwordIndi.textContent = '';
        passwordIndi.className = '';
    }else if(strength <= 2){
        // passwordIndi.textContent = 'Weak';
        passwordIndi.classList.remove('medium','strong')
        passwordIndi.classList.add('weak');
    }else if(strength <= 4){
        // passwordIndi.textContent = 'Medium';
        passwordIndi.classList.remove('weak','strong')
        passwordIndi.classList.add('medium');
    }else{
        // passwordIndi.textContent = 'Storng';
        passwordIndi.classList.remove('weak','medium')
        passwordIndi.classList.add('strong')
    }


}





form.addEventListener("submit", (e) => {
    const usernameVal = username.value.trim();
    const emailVal = email.value.trim();
    const numberVal = number.value.trim();
    const passwordVal = password.value.trim();
    const cpasswordVal = cpassword.value.trim();
    const dobVal = dob.value.trim();

    if (
        usernameVal === "" ||
        emailVal === "" ||
        numberVal === "" ||
        passwordVal === "" ||
        cpasswordVal === "" ||
        dobVal === ""
    ) {
        e.preventDefault(); 
        errorMessage.innerText = "Please fill in all fields.";
        errorMessage.style.color = "red";
        submitButton.style.backgroundColor = "red"       
        submitButton.disabled = true;
    } else {
        errorMessage.innerText = ""; 
        submitButton.disabled = false;
    }
});

// Call checkForm on input change for all fields
username.addEventListener('input', (e) => {
    e.preventDefault();
    validateUsername(e);
    checkForm();
    if(submitButton.disabled){
        submitButton.style.backgroundColor = "red"
    }
    else{
        submitButton.style.backgroundColor = "#792099"
    }
});
email.addEventListener('input', (e) => {
    e.preventDefault();
    validateEmail(e);
    checkForm();
    if(submitButton.disabled){
        submitButton.style.backgroundColor = "red"
    }
    else{
        submitButton.style.backgroundColor = "#792099"
    }
});
number.addEventListener('input', (e) => {
    e.preventDefault();
    validateNumber(e);
    checkForm();
    if(submitButton.disabled){
    submitButton.style.backgroundColor = "red"
    }
    else{
        submitButton.style.backgroundColor = "#792099"
    }
});
password.addEventListener('input', (e) => {
    e.preventDefault();
    validatePassword(e);
    checkForm();
    validatePasswordStrength(password.value.trim());
    if(submitButton.disabled){
    submitButton.style.backgroundColor = "red"
    }
    else{
        submitButton.style.backgroundColor = "#792099"
    }
});
cpassword.addEventListener('input', (e) => {
    e.preventDefault();
    validateCPassword(e);
    checkForm();
    if(submitButton.disabled){
    submitButton.style.backgroundColor = "red"
    }
    else{
        submitButton.style.backgroundColor = "#792099"
    }
});
dob.addEventListener('input', (e) => {
    e.preventDefault();
    validateDob(e);
    checkForm();
    if(submitButton.disabled){
    submitButton.style.backgroundColor = "red"
    }
    else{
        submitButton.style.backgroundColor = "#792099"
    }
});

// Check all fields for errors
function checkForm() {
    const allInputs = [username, email, number, password, cpassword, dob];
    const hasErrors = allInputs.some((input) => {
        const inputGroup = input.parentElement;
        return inputGroup.classList.contains('error');
    });

    if (hasErrors) {
        errorMessage.innerText = "Please correct the errors.";
        errorMessage.style.color = "red"
        submitButton.disabled = true;
    } else {
        errorMessage.innerText = "";
        submitButton.disabled = false;
        errorMessage.style.color = "purple"
    }
}


//username validatio
function validateUsername(){
    const nameRegex = /[a-z]/;
    const name2Regex = /[!@#$%^&*()_+{}[\]|\/;:<>?,.0-9]/;
    const usernameVal = username.value.trim();
    if(usernameVal ===''){
        setError(username,'Username is Required')
        submitButton.disabled = true;
    }
    else if(!nameRegex.test(usernameVal) || name2Regex.test(usernameVal)){
        setError(username, 'Enter a valid Name')
        submitButton.disabled = true;
    }
    else if(usernameVal.length <3){
        setError(username, 'Username must be minimum 3 characters')
        submitButton.disabled = true;
    }
    else{
        setSuccess(username);
        submitButton.disabled = false;
    }
}
//Email validation
function validateEmail(){
    const emailVal = email.value.trim();
    if(emailVal ===''){
        setError(email,'Email is Required')
        submitButton.disabled = true;
    }
    else if(!validateEmailFormat(emailVal)){
        setError(email,'Please enter a Valid Email')
        submitButton.disabled = true;
    }
    else{
        setSuccess(email);
        submitButton.disabled = false;
    }
}
// validate Number
function validateNumber(){
    const numberVal = number.value.trim();  
    if(numberVal ===''){
        setError(number, 'Phone Number Required')
        submitButton.disabled = true;
    }
    else if(!validateNumberFormat(numberVal)){
        setError(number, 'Enter a valid number')
        submitButton.disabled = true;
    }
    else{
        setSuccess(number)
        submitButton.disabled = false;
    }
}  

//password validation
function validatePassword() {
    const passwordVal = password.value.trim();
    const lowerCaseRegex = /[a-z]/;
    const upperCaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharactersRegex = /[!@#$%^&*()_+{}[\]|\/;:"'<>?,.]/;
    if (passwordVal === '') {
        setError(password, 'Password is Required');
        submitButton.disabled = true;
    } else if (passwordVal.length < 8 || passwordVal.length > 16 ) {
        setError(password, 'Must contain 8-16 Characters Special characters Number Upper case Lower case');
        submitButton.disabled = true;    
    }else if(!specialCharactersRegex.test(passwordVal)){
        setError(password,'Special characters');
    }
    else if(!numberRegex.test(passwordVal)){
        setError(password,'Number');
    }
    else if(!upperCaseRegex.test(passwordVal)){
        setError(password,'Upper case')
    }
    else if(!lowerCaseRegex.test(passwordVal)){
        setError(password,'Lower case')
    }
    else {
        setSuccess(password);
        submitButton.disabled = false;
    }
}
//confirm password
function validateCPassword(){
    const passwordVal = password.value.trim();
    const cpasswordVal = cpassword.value.trim();
    if(cpasswordVal ===''){
        setError(cpassword,'confirm password')
        submitButton.disabled = true;
    }
    else if(cpasswordVal !== passwordVal){
        setError(cpassword,'password doest match')
        submitButton.disabled = true;
    }
    else{
        setSuccess(cpassword)
        submitButton.disabled = false;
    }
}
//validate date of birth
function validateDob() {
    const dobVal = dob.value.trim();
    const toDate = new Date();
    const userDate = new Date(dobVal);
    console.log(toDate);
    console.log(userDate);
    if (dobVal === '') {
        setError(dob, 'Date of birth is required');
        submitButton.disabled = true;
    } else if (validateDobFormat(dobVal)) {
        setError(dob, 'Enter a valid date (DD/MM/YYYY or DD-MM-YYYY)');
        submitButton.disabled = true;
    } else if (toDate < userDate) {
        setError(dob, 'Are you coming from the future?');
        submitButton.disabled = true;
    } else {
        setSuccess(dob);
        submitButton.disabled = false;
    }
}


