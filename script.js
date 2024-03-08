window.addEventListener('load', () => {
    let userFullName = document.getElementById('fullNameInput');
    userFullName.onkeydown = (event) => {
        let name = parseInt(event.key);
        if (!isNaN(name)) {
            return false;
        }
    }

    let userUsername = document.getElementById('usernameInput');
    userUsername.onkeydown = (event) => {
        if (event.key.includes(',') || event.key.includes('.')) {
            return false;
        }
    }

    let checkboxForTerms = document.getElementById('rules-checkbox');
    checkboxForTerms.addEventListener('change', (event) => {
        if (event.target.checked) {
            console.log('Согласен');
        } else {
            console.log('Не согласен');
        }
    })

    let signUpButton = document.getElementById('sign-up-btn');
    let signUpFormData = document.getElementsByClassName('signUpData');
    let popUp = document.getElementById('popup');
    let popupButton = document.getElementById('popupButton');
    let formTitle = document.getElementsByClassName('free-account-form__about-form_title')[0];
    let userEmail = document.getElementsByClassName('form-for-free-account__email')[0];
    let userRepeatPassword = document.getElementsByClassName('form-for-free-account__repeat-password')[0];
    let checkboxForTermsBlock = document.getElementById('rules-checkbox-block');
    let alreadyHaveAccountBtn = document.getElementById('sign-in-btn');

    signUpButton.onclick = (event) => {
        try {
            for (let i = 0; i < signUpFormData.length; i++) {
                let currentElement = signUpFormData[i].innerText;
                let currentElementValue = signUpFormData[i].children[1].value;
                if (!currentElementValue) {
                    alert('Заполните поле ' + currentElement);
                    return;
                }
                if (currentElement === 'Password') {
                    if (currentElementValue.length < 8) {
                        throw new Error('Пароль должен содержать не менее 8 символов');

                    }
                    if (currentElementValue !== signUpFormData[i + 1].children[1].value) {
                        throw new Error('Пароли не совпадают');
                    }
                }
            }
            if (!checkboxForTerms.checked) {
                throw new Error('Вы не поставили галочку!');
            }
            popUp.style.display = 'flex';
        } catch (e) {
            alert(e.message);
        }
    };
    popupButton.addEventListener('click', (event) => {
        userDataBlocksDisplayNone([popUp]);
        toSignInPage();
    });
    alreadyHaveAccountBtn.addEventListener('click', () => {
        toSignInPage();
    });

    function userDataClear(userInputArray) {
        for (let i = 0; i < userInputArray.length; i++) {
            userInputArray[i].value = '';
        }
    }

    function userDataBlocksDisplayNone(blocksArray) {
        for (let i = 0; i < blocksArray.length; i++) {
            blocksArray[i].style.display = 'none';
        }
    }

    function toSignInPage() {
        let userPassword = document.getElementsByClassName('form-for-free-account__password')[0];
        userDataBlocksDisplayNone([userFullName.parentElement, userEmail,
            userRepeatPassword, checkboxForTermsBlock, alreadyHaveAccountBtn]);
        userDataClear([userUsername, userPassword.children[1]]);
        formTitle.innerText = 'Log in to the system';
        signUpButton.innerText = 'Sign In';
        signUpButton.onclick = (event) => {
            if (!userPassword.children[1].value || !userUsername.value) {
                alert('Заполните поле ' + (userUsername.value ? userPassword.innerText : userUsername.previousElementSibling.innerText))
            } else {
                alert(`Добро пожаловать, ${userUsername.value}`);
                userDataClear([userUsername, userPassword.children[1]]);
            }
        }
    }


})