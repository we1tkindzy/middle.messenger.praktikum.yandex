import Block from '../Block';

describe('core/Block', () => {
  it('should set props', () => {
    const block = new Block({ prop: 'prop' });

    const props = { prop: 'newProp' };

    block.setProps(props);

    expect(block.getProps()).toEqual({ prop: 'newProp' });
  });

  it('should render Block with props', () => {
    class NewBlock extends Block {
      render() {
        return '<span>{{ text }}</span>';
      }
    }

    const props = { text: 'qwerty' };
    const component = new NewBlock(props);

    const text = component.getContent().textContent;

    expect(text).toEqual('qwerty');
  });
});
