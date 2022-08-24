class Aside {
  aside(): string {
    return `
            <img class="root__burger" src="assets/burger.svg" alt="menu">
            <aside class="aside">
              <ul>
                <li class="aside__el home">Главная</li>
                <li class="aside__el authorization">Авторизация</li>
                <li class="aside__el book">Учебник</li>
                <li class="aside__el game">Мини-игры</li>
                <li class="aside__el statistic">Статистика</li>
              </ul>
            </aside>
            `;
  }
}
export default Aside;
