import Block from 'core/Block';
import './backToPage.scss';

interface BackToPageProps {
  onNavigate?: () => void;
}

class BackToPage extends Block {
  static componentName = 'BackToPage';

  constructor({ onNavigate }: BackToPageProps) {
    super({ events: { click: onNavigate } });
  }

  render(): string {
    return `<div class="back-to-page">
      <button type="button" class="back-to-page__button">
        <svg class="back-to-page__icon" width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect y="5.19995" width="11" height="1.6" fill="white"/>
          <path d="M7 1L11 6L7 11" stroke="white" stroke-width="1.6"/>
        </svg>
        <span class="visually-hidden">Назад к чатам</span>
      </button>
    </div>`;
  }
}

export default BackToPage;
