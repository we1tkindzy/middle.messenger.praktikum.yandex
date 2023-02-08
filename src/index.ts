import Button from 'components/button/button';
import Input from 'components/input/input';
import ErrorComponent from 'components/error/error';
import ErrorSection from 'components/errorSection/errorSection';
import BackToPage from 'components/backToPage/backToPage';
import InputField from 'components/inputField/inputField';
import Avatar from 'components/avatar/avatar';
import Loader from 'components/loader/loader';
import Chat from 'components/chat/chat';
import ChatSection from 'components/chatSection/chatSection';
import Message from 'components/message/message';
import MessageForm from 'components/messageForm/messageForm';
import Link from 'components/link/link';
import renderDOM from 'core/renderDOM';
import registerComponent from 'core/registerComponent';
import { Store } from 'core/Store';
import initApp from 'service/initApp';
import Block from 'core/Block';
import Router from 'core/Router/Router';
import initRouter from './router';
import defaultState from './store/index';
import ChatsPage from './pages/chats/chats';
import './styles/style.scss';

declare global {
  interface Window {
    store: Store<AppState>;
    router: Router;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  registerComponent(Button);
  registerComponent(ErrorComponent);
  registerComponent(Input);
  registerComponent(ErrorSection);
  registerComponent(BackToPage);
  registerComponent(InputField);
  registerComponent(Avatar);
  registerComponent(Loader);
  registerComponent(Chat);
  registerComponent(ChatSection);
  registerComponent(Message);
  registerComponent(MessageForm);
  registerComponent(Link);

  const store = new Store<AppState>(defaultState);
  const router = new Router();

  window.router = router;
  window.store = store;

  renderDOM(new ChatsPage({}) as Block);

  initRouter(router, store);

  store.dispatch(initApp);
});
