import userLogout from './registerBtn';

class Header {
  header() {
    return `
        <header class="header">
        <nav class="header__menu">
          <h2 class="header__title">RSlang</h2>
          <img
            class="header__register header_hidden"
            src="assets/register.svg"
            alt="register"
          />
          <button class="header__logout header_hidden">LogOut</button>
        </nav>
      </header>
        `;
  }

  logout(): void {
    userLogout();
  }
}
export default Header;
