class Home {
  startPage(): void {
    const workPages = document.querySelector('.work') as HTMLElement;
    workPages.innerHTML = this.sectionStart();
  }

  sectionStart(): string {
    return `<div class="work-pages">
        <div class="work-pages__container">
          <div class="start-page">
            <h1 class="start-page__title">Сonversation games in english</h1>
            <p class="start-page__text">
              Это сервис с тренировками, которые помогут расширить словарный
              запас английского языка, а также развить навыки чтения, письма и
              аудирования
            </p>
          </div>
          <div class="team">
            <h2 class="team__title">Наша команда</h2>
            <ul class="team__list">
              <li>
                <img src="assets/Julia.jpeg" alt="Julia">
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
                      fill="black"
                    />
                  </svg>
                  <span class="team__text"> Julia Filippova</span></a>
                <p>Сделала стартовую страницу</p>
              </li>
              <li>
                <img src="assets/Stepan.jpg" alt="Stepan">
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
                      fill="black"
                    />
                  </svg>
                  <span class="team__text"> Stepan Volkov</span></a>
                  <p>Реализация авторизации и регистрации пользователя</p>
              </li>
              <li>
                <img src="assets/Oleksander.jpeg" alt="Oleksander">
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
                      fill="black"
                    />
                  </svg>
                  <span class="team__text"> Oleksandr Kotlubieiev</span></a>
                  <p>Организация работы с бэкендом, игры</p>
              </li>
            </ul>
          </div>
        </div>
        <img class="work-pages__img" src="assets/back.png" alt="back">
        </div>`;
  }
}
export default Home;
