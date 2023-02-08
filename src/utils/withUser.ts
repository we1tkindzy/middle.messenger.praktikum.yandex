import { BlockClass } from 'core/Block';

type WithUserProps = { user: User | null };

function withUser<P extends WithUserProps>(WrappedBlock: BlockClass) {
  return class extends WrappedBlock {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, user: window.store.getState().user });
    }

    __onChangeUserCallback = (prevState: AppState, nextState: AppState) => {
      if (JSON.stringify(prevState.user) !== JSON.stringify(nextState.user)) {
        this.setProps({ ...this.props, user: nextState.user });
      }
    };

    componentDidMount(props: P) {
      super.componentDidMount(props);
      window.store.on('changed', this.__onChangeUserCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off('changed', this.__onChangeUserCallback);
    }
  } as BlockClass;
}

export default withUser;
