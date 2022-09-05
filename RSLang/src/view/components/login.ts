import { BackendAPIController } from '../../controller/api/api';

export default class Login {
  createLogin(): string {
    return `
    <form class="login__popup__wrapper">
        <div class="login__close__btn">X</div>
        <div>
            <label class="login__popup__text" for="login-email">Email</label>
            <input class="login__popup__input" type="email" id="login-email" required>
        </div>
        <div>
            <label class="login__popup__text" for="login-password">Password</label>
            <input class="login__popup__input" type="password" id="login-password" minlength="8" required>
        </div>
        <div class="login__error__text"></div>
        <button class="login__btn login__popup__btn" type="submit">Login</button>
        <button class="to__registry__btn login__popup__btn">Register</button>
    </form>
    <form class="register__popup__wrapper">
        <div class="login__close__btn">X</div>
        <div>
            <label class="register__popup__text" for="register-email">Email</label>
            <input class="register__popup__input" type="email" id="register-email" required>
        </div>
        <div>
            <label class="register__popup__text" for="register-name">Name</label>
            <input class="register__popup__input" type="text" id="register-name">
        </div>
        <div>
            <label class="register__popup__text" for="register-password">Password</label>
            <input class="register__popup__input" type="password" id="register-password" minlength="8" required>
        </div>
        <div class="register__error__text"></div>
        <button class="registry__btn login__popup__btn" type="submit">Register</button>
    </form>
    <div class="login__background"></div>
    `;
  }

  createLoginPopup(): void {
    const body = document.querySelector('.body') as HTMLBodyElement;
    body.append(
      ...new DOMParser().parseFromString(this.createLogin(), 'text/html').body.childNodes,
    );
    const headerLoginBtn = document.querySelector('.header__register');
    const loginBg = document.querySelector('.login__background');
    const loginWrapper = document.querySelector('.login__popup__wrapper');
    const registerWrapper = document.querySelector('.register__popup__wrapper');
    const registerSwitchBtn = document.querySelector('.to__registry__btn');
    const registerBtn = document.querySelector('.registry__btn');
    const loginBtn = document.querySelector('.login__btn');
    const loginErrorText = document.querySelector('.login__error__text') as HTMLElement;
    const loginCloseBtn = document.querySelectorAll('.login__close__btn');
    const logoutBtn = document.querySelector('.header__logout');
    loginBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      const userEmail = document.getElementById('login-email') as HTMLInputElement;
      const userPassword = document.getElementById('login-password') as HTMLInputElement;
      BackendAPIController.signIn(userEmail.value, userPassword.value)
        .then(() => {
          registerWrapper?.classList.remove('register__popup__wrapper_active');
          loginWrapper?.classList.remove('login__popup__wrapper_active');
          loginBg?.classList.remove('login__background_active');
          headerLoginBtn?.classList.add('header_hidden');
          logoutBtn?.classList.remove('header_hidden');
        })
        .catch(() => {
          loginErrorText.textContent = 'Неправельный логин или пароль';
        });
    });
    headerLoginBtn?.addEventListener('click', () => {
      loginBg?.classList.add('login__background_active');
      loginWrapper?.classList.add('login__popup__wrapper_active');
    });
    registerSwitchBtn?.addEventListener('click', () => {
      loginWrapper?.classList.remove('login__popup__wrapper_active');
      registerWrapper?.classList.add('register__popup__wrapper_active');
    });
    registerBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      const userEmail = document.getElementById('register-email') as HTMLInputElement;
      const userName = document.getElementById('register-name') as HTMLInputElement;
      const userPassword = document.getElementById('register-password') as HTMLInputElement;
      const registerErrorText = document.querySelector('.register__error__text') as HTMLElement;
      const user = { name: userName.value, email: userEmail.value, password: userPassword.value };
      BackendAPIController.createUser(user)
        .then(() => {
          loginWrapper?.classList.add('login__popup__wrapper_active');
          registerWrapper?.classList.remove('register__popup__wrapper_active');
        })
        .catch(() => {
          registerErrorText.textContent = 'Ошибка';
        });
    });
    [...loginCloseBtn].forEach((e) => {
      e.addEventListener('click', () => {
        registerWrapper?.classList.remove('register__popup__wrapper_active');
        loginWrapper?.classList.remove('login__popup__wrapper_active');
        loginBg?.classList.remove('login__background_active');
      });
    });
  }
}
