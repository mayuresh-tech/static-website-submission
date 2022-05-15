var nameInputField = document.querySelector("#name-input");
var emailInputField = document.querySelector("#email-input");
var submitBtn = document.querySelector("#login-btn");

var nameError = document.querySelector(".name-validation-errors");
var emailError = document.querySelector(".email-validation-errors");

var modalBox = document.querySelector(".modal-container");
var modalAgainBtn = document.querySelector("#modal-again-btn");
var modalCloseBtn = document.querySelector("#modal-close-btn");

var modalBoxError = document.querySelector(".modal-container-error");
var modalAgainErrorBtn = document.querySelector("#modal-again-btn-error");
var modalCloseErrorBtn = document.querySelector("#modal-close-btn-error");

nameError.style.display = "none";
emailError.style.display = "none";
modalBoxError.style.display = "none";
modalBoxError.style.visibility = "hidden";
let nameForm = "";
let emailForm = "";
var emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

modalCloseBtn.addEventListener("click", () => {
    modalBox.style = "visibility: hidden";
    modalBox.style.display = "none";
    document.body.style.overflow = "auto";
});

modalAgainBtn.addEventListener("click", () => {
    modalBox.style = "visibility: hidden";
    modalBox.style.display = "none";
    document.body.style.overflow = "auto";
    nameInputField.value = "";
    emailInputField.value = "";
});

modalCloseErrorBtn.addEventListener("click", () => {
    modalBoxError.style = "visibility: hidden";
    modalBoxError.style.display = "none";
    document.body.style.overflow = "auto";
});

modalAgainErrorBtn.addEventListener("click", () => {
    modalBoxError.style = "visibility: hidden";
    modalBoxError.style.display = "none";
    document.body.style.overflow = "auto";
    nameInputField.value = "";
    emailInputField.value = "";
});

const showModal = () => {
    modalBox.style = "visibility: visible; background: rgba(240, 248, 255, 0.58); display: flex; justify-content: center; align-items: center; align-content: center;";
    document.body.style.overflow = "hidden";
}

const showErrorModal = () => {
    modalBoxError.style = "visibility: visible; background: rgba(240, 248, 255, 0.58); display: flex; justify-content: center; align-items: center; align-content: center;";
    document.body.style.overflow = "hidden";
}

nameInputField.addEventListener("focus", () => {
    nameError.style.display = "none";
    emailError.style.display = "none";
});

emailInputField.addEventListener("focus", () => {
    nameError.style.display = "none";
    emailError.style.display = "none";
});

const postCall = (name, email) => {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('post', "http://3.108.14.216:8080/ccfraud/testUser/api/create");
        req.setRequestHeader('Content-Type', 'application/json');
        req.onload = function () {
            if (req.status == 200) {
                resolve(req.response);
            } else {
                reject(Error(req.statusText));
            }
        };
        req.onerror = () => {
            reject(Error("Network Error"));
        };
        req.send(JSON.stringify(
            {
                "name": name,
                "email": email
            }
        ));
    });
};

submitBtn.addEventListener("click", async () => {
    nameForm = nameInputField.value;
    emailForm = emailInputField.value;

    if (nameForm.trim === null || nameForm.trim().length === 0 && !emailPattern.test(emailForm)) {
        nameError.style.display = "block";
        emailError.style.display = "block";
    }
    else if (nameForm.trim === null || nameForm.trim().length === 0) {
        nameError.style.display = "block";
    }
    else if (!emailPattern.test(emailForm)) {
        emailError.style.display = "block";
    }
    else {
        await postCall(nameForm, emailForm).then(data => {
            data = JSON.parse(data);
            data.email === emailForm ? showModal() : showErrorModal();
        }).catch(() => {
            showErrorModal();
        });
    }
});

