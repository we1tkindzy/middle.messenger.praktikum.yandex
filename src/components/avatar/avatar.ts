import Block from 'core/Block';
import './avatar.scss';
import EmptyAvatarImg from 'assets/empty-avatar.png';

interface AvatarProps {
  url?: string,
  className?: string,
  onSubmit?: () => void;
}

class Avatar extends Block {
  static componentName = "Avatar";

  constructor({url, className, onSubmit,}: AvatarProps) {
    super({url, className, events: {submit: onSubmit}});

    this.setProps({
      url: this.checkURL(url),
    });
  }

  checkURL(url: any): string {
    if (url !== 'null') {
      url = `https://ya-praktikum.tech/api/v2/resources${url}`;
    } else {
      url = `${EmptyAvatarImg}`;
    }

    return url;
  }

  render() {
    return `<form class="avatar {{className}}" id="avatar_form">
      <label class="avatar__wrapper">
        <img class="avatar__img" src="{{url}}" alt="Аватар пользоватлея" width="40" height="40">

        {{#if className }}
          <input class="avatar__input" type="file" name="avatar" accept="image/*">
          <span class="avatar__text">Поменять аватар</span>
        {{/if}}
      </label>

      {{#if className }}
        {{{ Button
          text="Изменить аватар"
          className="avatar__button"
        }}}
      {{/if}}
    </form>`;
  }
}

export default Avatar;
