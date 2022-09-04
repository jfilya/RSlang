import { BackendAPIController } from '../../controller/api/api';
import { IStatisticsResp } from '../../controller/api/interfaces';

class Statistic {
  sectionStatistic(): string {
    setTimeout(() => {
      this.getUserStatsFromGames();
    }, 0);

    return `
        <h3>Статистика</h3>
        <p>Доступно только для зарегестрированный пользователей</p>
        <div class="statistics__learned-words">Выученных слов в играх: <span class="learned_words"></span></div>
        <div class="statistics__games">
        <div>
        `;
  }

  async getUserStatsFromGames() {
    const { learnedWords, optional } = await BackendAPIController.getUserStatistics() as IStatisticsResp;
    (document.querySelector('.learned_words') as HTMLElement).textContent = String(learnedWords);
    const stats = [
      ['Статистика', 'Аудиовызов', 'Спринт'],
      ['Максимальная серия угаданных слов', (optional as { 'audiocallGame': { 'Max Streak': number } }).audiocallGame['Max Streak'], (optional as { 'sprintGame': { 'Max Streak': number } }).sprintGame['Max Streak']],
      ['Процент угаданных слов', (optional as { 'audiocallGame': { 'Percentage of right': number } }).audiocallGame['Percentage of right'], (optional as { 'sprintGame': { 'Percentage of right': number } }).sprintGame['Percentage of right']],
    ];
    this.charts(stats);
  }

  charts(stats: (string | number)[][]) {
    google.charts.load('current', { packages: ['corechart', 'bar'] });
    google.charts.setOnLoadCallback(drawMultSeries);

    function drawMultSeries() {
      const data = google.visualization.arrayToDataTable(stats);

      const options = {
        title: 'Игровая статистика',
        chartArea: { width: '50%' },
        hAxis: {
          title: 'Слов подряд / Процент',
          minValue: 0,
        },
      };

      const chart = new google.visualization.BarChart((document.querySelector('.statistics__games')) as HTMLElement);
      chart.draw(data, options);
    }
  }
}

export default Statistic;
