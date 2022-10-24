import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const activeLanguage = localStorage.getItem('lang');

console.log(activeLanguage)

const resources = {
    en: {
        translation: {
            loginPage: {
                loginHeader: "Log in to your account",
                loginInput: 'Your login',
                passwordInput: "Your password",
                loginPlaceholder: "Enter login",
                passwordPlaceholder: "Enter Password",
                logInButton: 'Log in',
                footer: 'Don\'t you have an account?',
                footerLink: 'Create it!',
                alertMessage: 'You have entered an incorrect username or password',
            },
            validationFeedback: {
                loginMax: 'Must be 20 characters or less',
                loginMin: 'Must be 3 characters or more',
                passwordMax: 'Must be 20 characters or less',
                passwordMin: 'Must be 6 characters or more',
                loginRequired: 'Login is required',
                passwordRequired: 'Password is required',
                passwordSpecialCharacters: 'Must contain one number and one lowercase',
                passwordConfirmationRequired: 'You need to confirm the password',
                passwordConfirmationMatch: 'Passwords must match\'',
            },
            signupPage: {
                header: 'Register your account',
                loginLabel: 'Come up with a name',
                passwordLabel: 'Come up with a password',
                alertMessage: 'The login is already used by another user',
                signupButton: 'Sign up',
                confirmPassword: 'Enter your password again',
            },
            chatPage: {
                channelsHeader: 'Channels',
                channelsAddButton: 'Add',
                messagePlaceholder: 'enter a message',
                editChannelButton: 'Edit',
                removeChannelButton: 'Remove',
            },
            addChannelModal: {
                header: 'Add new channel, bro',
                saveButton: 'Save Changes',
                closeButton: 'Close',
            },
            renameChannelModal: {
              header: 'Rename channel',
              closeButton: 'Close',
              saveButton: 'Save Changes',
            },
            layout: {
                logoutButton: 'Log out',
                selectLeng: 'Change language',
                engLeng: 'English',
                rusLeng: 'Русский',
            },
            notFoundPage: {
                header: '404: Page not found',
                description: 'Most likely you have the wrong address, we suggest you return to the',
                link: 'main page',
            }
        }
    },
    ru: {
        translation: {
            loginPage: {
                loginHeader: "Войдите в аккаунт",
                loginInput: 'Ваш логин',
                passwordInput: "Ваш пароль",
                loginPlaceholder: "Введите ваш логин",
                passwordPlaceholder: "Введите ваш пароль",
                logInButton: 'Войти',
                footer: 'Еще нет аккаунта?',
                footerLink: 'Создайте его!',
                alertMessage: 'Вы ввели неверный логин или пароль',
            },
            validationFeedback: {
                loginMax: 'Должен содержать 20 символов или меньше',
                loginMin: 'Должен содержать 3 символа или больше',
                passwordMax: 'Должен содержать 20 символов или меньше',
                passwordMin: 'Должен содержать 6 символов или больше',
                loginRequired: 'Логин обязателен',
                passwordRequired: 'Пароль обязателен',
                passwordSpecialCharacters: 'Должен содержать однцу цифру и один символ в нижнем регистре',
                passwordConfirmationRequired: 'Вам нужно подтвердить пароль',
                passwordConfirmationMatch: 'Пароли должны совпадать',
            },
            signupPage: {
                header: 'Зарегистрируй аккаунт',
                loginLabel: 'Придумай логин',
                passwordLabel: 'Придумай пароль',
                alertMessage: 'Этот логин уже использует другой пользователь',
                signupButton: 'Зарегистрироваться',
                confirmPassword: 'Введите ваш пароль еще раз',
            },
            chatPage: {
                channelsHeader: 'Каналы',
                channelsAddButton: 'Добавить',
                messagePlaceholder: 'Введите сообщение',
                editChannelButton: 'Переименовать',
                removeChannelButton: 'Удалить',
            },
            addChannelModal: {
                header: 'Добавь новый канал',
                saveButton: 'Сохранить',
                closeButton: 'Закрыть',
            },
            renameChannelModal: {
                header: 'Переименовать канал',
                closeButton: 'Закрыть',
                saveButton: 'Сохранить',
            },
            layout: {
                logoutButton: 'Выйти',
                selectLeng: 'Change language',
                engLeng: 'English',
                rusLeng: 'Русский',
            },
            notFoundPage: {
                header: '404: страница не найдена',
                description: 'Скорее всего вы ошиблись адресом, предлагаем вам вернусть на',
                link: 'главную страницу',
            }
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: JSON.parse(activeLanguage) || 'ru',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;