class Footer {
  footer(): string {
    setTimeout(() => {
      const footer = document.querySelector('.footer');
      const pathName = window.location;
      document.querySelector('.work')?.addEventListener('DOMSubtreeModified', () => {
        if (pathName.href.includes('game')) {
          footer?.setAttribute('hidden', 'hidden');
        } else {
          footer?.removeAttribute('hidden');
        }
      });
    }, 0);

    return `
            <footer class="footer">
            <div class="footer__container">
              <div class="footer__orange">
                <a href="https://rs.school/js/" target="_blank"
                  ><img src="assets/logo-school.svg" alt="logo-schoo"
                /></a>
                <p>2022</p>
              </div>
              <div class="footer__black">
                <ul class="footer__list">
                  <li>
                    <a href="https://github.com/jfilya" target="_blank">
                      <svg
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 0C7.875 0 0 7.875 0 18C0 29.8125 10.6875 34.875 12.375 34.875C13.5 34.875 13.5 34.3125 13.5 33.75V30.9375C9.5625 32.0625 7.875 29.8125 7.3125 28.125C7.3125 28.125 7.3125 27.5625 6.1875 26.4375C5.625 25.875 3.375 24.75 5.625 24.75C7.3125 24.75 8.4375 27 8.4375 27C10.125 29.25 12.375 28.6875 13.5 28.125C13.5 27 14.625 25.875 14.625 25.875C10.125 25.3125 6.75 23.625 6.75 17.4375C6.75 15.1875 7.3125 13.5 8.4375 12.375C8.4375 12.375 7.3125 10.125 8.4375 7.3125C8.4375 7.3125 11.25 7.3125 13.5 9.5625C15.1875 8.4375 20.8125 8.4375 22.5 9.5625C24.75 7.3125 27.5625 7.3125 27.5625 7.3125C28.6875 11.25 27.5625 12.375 27.5625 12.375C28.6875 13.5 29.25 15.1875 29.25 17.4375C29.25 23.625 25.3125 25.3125 21.375 25.875C21.9375 26.4375 22.5 27.5625 22.5 29.25V33.75C22.5 34.3125 22.5 34.875 23.625 34.875C25.3125 34.875 36 29.8125 36 18C36 7.875 28.125 0 18 0Z"
                          fill="white"
                        />
                      </svg>
                      <span class="footer__text"> Julia Filippova</span></a
                    >
                  </li>
                  <li>
                    <a href="https://github.com/OreskaG/" target="_blank">
                      <svg
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 0C7.875 0 0 7.875 0 18C0 29.8125 10.6875 34.875 12.375 34.875C13.5 34.875 13.5 34.3125 13.5 33.75V30.9375C9.5625 32.0625 7.875 29.8125 7.3125 28.125C7.3125 28.125 7.3125 27.5625 6.1875 26.4375C5.625 25.875 3.375 24.75 5.625 24.75C7.3125 24.75 8.4375 27 8.4375 27C10.125 29.25 12.375 28.6875 13.5 28.125C13.5 27 14.625 25.875 14.625 25.875C10.125 25.3125 6.75 23.625 6.75 17.4375C6.75 15.1875 7.3125 13.5 8.4375 12.375C8.4375 12.375 7.3125 10.125 8.4375 7.3125C8.4375 7.3125 11.25 7.3125 13.5 9.5625C15.1875 8.4375 20.8125 8.4375 22.5 9.5625C24.75 7.3125 27.5625 7.3125 27.5625 7.3125C28.6875 11.25 27.5625 12.375 27.5625 12.375C28.6875 13.5 29.25 15.1875 29.25 17.4375C29.25 23.625 25.3125 25.3125 21.375 25.875C21.9375 26.4375 22.5 27.5625 22.5 29.25V33.75C22.5 34.3125 22.5 34.875 23.625 34.875C25.3125 34.875 36 29.8125 36 18C36 7.875 28.125 0 18 0Z"
                          fill="white"
                        />
                      </svg>
                      <span class="footer__text"> Stepan Volkov</span></a
                    >
                  </li>
                  <li>
                    <a href="https://github.com/sasharpg" target="_blank"
                      ><svg
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 0C7.875 0 0 7.875 0 18C0 29.8125 10.6875 34.875 12.375 34.875C13.5 34.875 13.5 34.3125 13.5 33.75V30.9375C9.5625 32.0625 7.875 29.8125 7.3125 28.125C7.3125 28.125 7.3125 27.5625 6.1875 26.4375C5.625 25.875 3.375 24.75 5.625 24.75C7.3125 24.75 8.4375 27 8.4375 27C10.125 29.25 12.375 28.6875 13.5 28.125C13.5 27 14.625 25.875 14.625 25.875C10.125 25.3125 6.75 23.625 6.75 17.4375C6.75 15.1875 7.3125 13.5 8.4375 12.375C8.4375 12.375 7.3125 10.125 8.4375 7.3125C8.4375 7.3125 11.25 7.3125 13.5 9.5625C15.1875 8.4375 20.8125 8.4375 22.5 9.5625C24.75 7.3125 27.5625 7.3125 27.5625 7.3125C28.6875 11.25 27.5625 12.375 27.5625 12.375C28.6875 13.5 29.25 15.1875 29.25 17.4375C29.25 23.625 25.3125 25.3125 21.375 25.875C21.9375 26.4375 22.5 27.5625 22.5 29.25V33.75C22.5 34.3125 22.5 34.875 23.625 34.875C25.3125 34.875 36 29.8125 36 18C36 7.875 28.125 0 18 0Z"
                          fill="white"
                        />
                      </svg>
                      <span class="footer__text"> Oleksandr Kotlubieiev</span></a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </footer>
            `;
  }

  displayFooter(): void {
    if (document.querySelector('.games') as HTMLElement
    || document.querySelector('.sprintgame__container') as HTMLElement
    || document.querySelector('.audiocall__game') as HTMLElement) {
      (document.querySelector('.footer') as HTMLElement).style.visibility = 'hidden';
    } else (document.querySelector('.footer') as HTMLElement).style.visibility = 'visibile';
  }
}
export default Footer;
