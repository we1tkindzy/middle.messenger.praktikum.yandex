import Block from 'core/Block';

import './errorSection.scss';

interface ErrorSectionProps {
  number?: string;
  description?: string;
}

class ErrorSection extends Block {
  static componentName = "ErrorSection";

  constructor({...props}: ErrorSectionProps) {
    super({...props});
  }

  protected render(): string {
    return `<section class="error-section">
      <div class="error-section__wrapper">
        <h1 class="error-section__title">{{number}}</h1>
        <p class="error-section__description">{{description}}</p>
        <a class="error-section__link" href="./select-chat">Назад к чатам</a>
      </div>
    </section>`;
  }
}

export default ErrorSection;
