import Block from 'core/Block';

export default class FilePopupPage extends Block {
  render() {
    return `<section class="file-popup">
      <div class="file-popup__wrapper">
        <h3 class="file-popup__title">Загрузите файл</h3>
        <button class="file-popup__close">
          <svg class="file-popup__close-icon" width="25" height="25" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="4.11077" y1="4.11103" x2="11.8889" y2="11.8892" stroke="#3369F3" stroke-width="1.5"/>
            <line x1="4.11078" y1="11.8891" x2="11.889" y2="4.11093" stroke="#3369F3" stroke-width="1.5"/>
          </svg>
          <span class="visually-hidden">Закрыть</span>
        </button>

        <form class="file-popup__form" action="">
          <div class="file-popup__field">
            <label class="file-popup__label" for="avatar">Выбрать файл на компьютере</label>
            <input class="file-popup__input" type="file" name="avatar" id="avatar" multiple>
          </div>


          <button class="file-popup__submit" type="submit">Поменять</button>
        </form>
      </div>
    </section>`;
  }
}
