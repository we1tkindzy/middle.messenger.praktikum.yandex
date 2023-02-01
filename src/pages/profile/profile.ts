import Block from 'core/Block';
import withRouter from 'utils/withRouter';
import withStore from 'utils/withStore';
import withUser from 'utils/withUser';
import { logout } from 'service/auth';

type ProfilePageProps = {
  onLogout?: () => void;
  onNavigate?: () => void;
};
class ProfilePage extends Block {
  constructor(props: ProfilePageProps) {
    super(props);

    this.setProps({
      navigateToProfileChange: () => this.props.router.go('/change-profile'),
      navigateToPasswordChange: () => this.props.router.go('/change-password'),
      navigateToLogin: () => this.props.router.go('/login'),
      navigateToChats: () => this.props.router.go('/'),
      onLogout: () => this.props.store.dispatch(logout),
    });
  }

  render() {
    if (!this.props.user) {
      return `{{{ Loader }}}`;
    }

    return `<section class="profile">
      <div class="profile__wrapper">
        {{{ BackToPage
          onNavigate=navigateToChats
        }}}

        <div class="profile__profile-section">
          {{{ Avatar
            url="${this.props.user.avatar}"
          }}}

          <h3 class="profile__name">${this.props.user.firstName}</h3>

          <ul class="profile__info">
              <li class="profile-field">
                <span class="profile-field__label">Почта</span>
                <span class="profile-field__input">${this.props.user.email}</span>
              </li>

              <li class="profile-field">
                <span class="profile-field__label">Логин</span>
                <span class="profile-field__input">${this.props.user.login}</span>
              </li>

              <li class="profile-field">
                <span class="profile-field__label">Имя</span>
                <span class="profile-field__input">${this.props.user.firstName}</span>
              </li>

              <li class="profile-field">
                <span class="profile-field__label">Фамилия</span>
                <span class="profile-field__input">${this.props.user.secondName}</span>
              </li>

              <li class="profile-field">
                <span class="profile-field__label">Имя в чате</span>
                <span class="profile-field__input">${this.props.user.displayName === null ? `` : this.props.user.displayName}</span>
              </li>

              <li class="profile-field">
                <span class="profile-field__label">Телефон</span>
                <span class="profile-field__input">${this.props.user.phone}</span>
              </li>
          </ul>


          {{{ Link
            text="Изменить данные"
            className="profile__cahnge-profile"
            onNavigate=navigateToProfileChange
          }}}
          {{{ Link
            text="Изменить пароль"
            className="profile__cahnge-password"
            onNavigate=navigateToPasswordChange
          }}}
          {{{ Button
            text="Выйти"
            className="profile__logout"
            onClick=onLogout
            onNavigate=navigateToLogin
          }}}
        </div>
      </div>

      {{#if ${!!window.store.getState().isLoading} }}
        {{{ Loader }}}
      {{/if}}
    </section>`;
  }
}

export default withRouter(withStore(withUser(ProfilePage)));
