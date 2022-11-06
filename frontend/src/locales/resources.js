const resources = {
  en: {
    translation: {
      loginPage: {
        loginHeader: 'Log in to your account',
        loginInput: 'Your login',
        passwordInput: 'Your password',
        loginPlaceholder: 'Enter login',
        passwordPlaceholder: 'Enter Password',
        logInButton: 'Log in',
        footer: 'Don\'t you have an account?',
        footerLink: 'Create it!',
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
        channelLength: 'The channel name should be from 3 to 20 characters',
        notUniqValue: 'The channel name must be a unique value',
        stopWords: 'Incorrect word',
      },
      signupPage: {
        header: 'Register your account',
        loginLabel: 'Come up with a name',
        passwordLabel: 'Come up with a password',
        ERR_BAD_REQUEST: 'The login is already used by another user',
        signupButton: 'Sign up',
        confirmPassword: 'Enter your password again',
        ERR_NETWORK: 'Something happened to the network :C',
        footer: 'Already have an account?',
        goToLoginPage: 'Login',
      },
      chatPage: {
        channelsHeader: 'Channels',
        channelsAddButton: 'Add',
        messagePlaceholder: 'enter a message',
        editChannelButton: 'Edit',
        removeChannelButton: 'Remove',
        messageAriaLabel: 'New message',
        messagesCount: 'messages',
        sendButton: 'send',
      },
      addChannelModal: {
        header: 'Add new channel, bro',
        saveButton: 'Save Changes',
        closeButton: 'Close',
        placeholder: 'Channel name',
      },
      renameChannelModal: {
        header: 'Rename channel',
        closeButton: 'Close',
        saveButton: 'Save Changes',
        placeholder: 'Channel name',
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
      },
      errorFeedback: {
        ERR_NETWORK: 'Something happened to the network :C',
        ERR_BAD_REQUEST: 'You have entered an incorrect username or password',
      },
      notificationBlock: {
        channelAdded: 'Channel added',
        channelRemoved: 'Channel deleted',
        channelRenamed: 'The channel has been renamed',
      },
      removeModalChannel: {
        header: 'Remove channel',
        body: 'Are you sure?',
        closeButton: 'Cansel',
        actionButton: 'Remove',
      },
    },
  },
  ru: {
    translation: {
      loginPage: {
        loginHeader: 'Войдите в аккаунт',
        loginInput: 'Ваш ник',
        passwordInput: 'Пароль',
        loginPlaceholder: 'Имя пользователя',
        passwordPlaceholder: 'Пароль',
        logInButton: 'Войти',
        footer: 'Еще нет аккаунта?',
        footerLink: 'Регистрация',
        ERR_BAD_REQUEST: 'Неверные имя пользователя или пароль',
      },
      validationFeedback: {
        loginMax: 'От 3 до 20 символов',
        loginMin: 'От 3 до 20 символов',
        passwordMax: 'Должен содержать 20 символов или меньше',
        passwordMin: 'Не менее 6 символов',
        loginRequired: 'Логин обязателен',
        passwordRequired: 'Пароль обязателен',
        passwordSpecialCharacters: 'Должен содержать однцу цифру и один символ в нижнем регистре',
        passwordConfirmationRequired: 'Вам нужно подтвердить пароль',
        passwordConfirmationMatch: 'Пароли должны совпадать',
        channelLength: 'Имя канала должно содержать от 3 до 20 символов',
        notUniqValue: 'Имя канала должно быть уникальным',
        stopWords: 'Материться нельзя',
      },
      signupPage: {
        header: 'Регистрация',
        loginLabel: 'Имя пользователя',
        passwordLabel: 'Пароль',
        ERR_BAD_REQUEST: 'Этот логин уже использует другой пользователь',
        ERR_NETWORK: 'Ошибка сети',
        signupButton: 'Зарегистрироваться',
        confirmPassword: 'Подтвердите пароль',
        footer: 'Уже есть аккаунт?',
        goToLoginPage: 'Войдите',
      },
      chatPage: {
        channelsHeader: 'Каналы',
        channelsAddButton: '+',
        messagePlaceholder: 'Введите сообщение',
        messageAriaLabel: 'Новое сообщение',
        editChannelButton: 'Переименовать',
        removeChannelButton: 'Удалить',
        messagesCount: 'сообщений',
        sendButton: 'отправить',
      },
      addChannelModal: {
        header: 'Добавь новый канал',
        saveButton: 'Отправить',
        closeButton: 'Закрыть',
        placeholder: 'Имя канала',
      },
      renameChannelModal: {
        header: 'Переименовать канал',
        placeholder: 'Имя канала',
        closeButton: 'Закрыть',
        saveButton: 'Отправить',
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
      },
      errorFeedback: {
        ERR_NETWORK: 'Ошибка соединения',
        ERR_BAD_REQUEST: 'Неверные имя пользователя или пароль',
      },
      notificationBlock: {
        channelAdded: 'Канал создан',
        channelRemoved: 'Канал удалён',
        channelRenamed: 'Канал переименован',
      },
      removeModalChannel: {
        header: 'Удалить канал',
        body: 'Уверены?',
        closeButton: 'Отменить',
        actionButton: 'Удалить',
      },
    },
  },
};

export default resources;
