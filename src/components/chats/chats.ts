import Block from 'core/Block';

const data = [
  {
    img: "../empty-avatar.png",
    name: "Андрей",
    date: "10:49",
    text: "Изображение",
    your_message: false,
    new: true,
    count_message: 2
  },
  {
    img: "../empty-avatar.png",
    name: "Киноклуб",
    date: "12:00",
    text: "стикер",
    your_message: true,
    new: false,
    count_message: 0
  },
  {
    img: "../empty-avatar.png",
    name: "Илья",
    date: "15:12",
    text: "Друзья, у меня для вас особенный выпуск новостей!...",
    your_message: false,
    new: true,
    count_message: 4
  },
  {
    img: "../empty-avatar.png",
    name: "Вадим",
    date: "Пт",
    text: "Круто!",
    your_message: true,
    new: false,
    count_message: 0
  },
  {
    img: "../empty-avatar.png",
    name: "тет-а-теты",
    date: "Ср",
    text: "И Human Interface Guidelines и Material Design рекомендуют...",
    your_message: false,
    new: false,
    count_message: 0
  },
  {
    img: "../empty-avatar.png",
    name: "Day.",
    date: "1 Мая 2020",
    text: "Так увлёкся работой по курсу, что совсем забыл его анонсир...",
    your_message: false,
    new: false,
    count_message: 0
  },
  {
    img: "../empty-avatar.png",
    name: "Стас Рогозин",
    date: "12 Апр 2020",
    text: "Можно или сегодня или завтра вечером.",
    your_message: false,
    new: false,
    count_message: 0
  },
];

export class Chats extends Block {
  static componentName = "Chats";

  render() {
    return `<div class="chats-page__content">
      <a class="chats-page__profile" href="./profile.hbs">
        Профиль
        <svg class="chats-page__profile-icon" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 9L5 5L1 1" stroke="#999999"/>
        </svg>
      </a>
      <label class="visually-hidden" for="search">Поиск</label>
      <input class="chats-page__search" type="text" id="search" name="search" placeholder="Поиск">

      <ul class="chats">
        ${data.map((card) =>
          `<li class="chats__item">
            <div class="chats__img">
              <img src="${card.img}" alt="Аватар" width="47" height="47">
            </div>
            <div class="chats__info">
              <div class="chats__mesh">
                <p class="chats__name">${card.name}</p>
                <span class="chats__time">${card.date}</span>
              </div>

              <p class="chats__text">${card.your_message ? `<span>Вы: </span> ${card.text}` : `${card.text}`}</p>
              ${card.new ? `<span class="chats__alert">${card.count_message}</span>` : ``}
            </div>
          </li>`
        ).join(' ')}
      </ul>
    </div>`
  }
}
