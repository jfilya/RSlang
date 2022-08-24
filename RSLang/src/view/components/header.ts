class Header {
  header(): string {
    return `
        <header class="header">
        <nav class="header__menu">
          <h2 class="header__title">RSlang</h2>
          <img
            class="header__register"
            src="assets/register.svg"
            alt="register"
          />
        </nav>
      </header>
        `;
  }
}
export default Header;
