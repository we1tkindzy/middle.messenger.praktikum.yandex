import Block from 'core/Block';

export class OnboardingPage extends Block {
  constructor() {
    super()

    this.setProps({
      onButtonClick: () => this.onButtonClick()
    })
  }

  onButtonClick() {
    console.log('button is clicked')
  }

  render() {
    return `
    <div class="screen screen_theme_full">
      <div class="screen__content">
        {{{Button text="Login" onClick=onButtonClick}}}
        <div>
          {{{Link text="Login" to="/login"}}}
          {{{Link text="Sign Up" to="/signup"}}}
        </div>
      </div>
    </div>
    `;
  }
}
