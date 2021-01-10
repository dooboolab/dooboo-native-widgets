import * as React from 'react';

import { Button } from '../../main';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';

const component = (props?: any): React.ReactElement => {
  return <Button {...props} />;
};

describe('[Button]', () => {
  let rendered: renderer.ReactTestRenderer;
  let root: renderer.ReactTestInstance;

  it('should render without crashing', () => {
    rendered = renderer.create(component());
    // expect(rendered.toJSON()).toMatchSnapshot();
    expect(rendered.toJSON()).toBeTruthy();
  });

  it('should render loading status', () => {
    rendered = renderer.create(component({ loading: true }));
    root = rendered.root;

    const texts = root.findAllByType(Text);

    expect(texts).toHaveLength(0);
  });

  it('should render disabled status', () => {
    rendered = renderer.create(component({ disabled: true }));
    root = rendered.root;

    const texts = root.findAllByType(Text);

    expect(texts).toHaveLength(1);
  });

  it('should render left and right elements', () => {
    rendered = renderer.create(
      component({ leftElement: <Text />, rightElement: <Text /> }),
    );

    root = rendered.root;

    const texts = root.findAllByType(Text);

    expect(texts).toHaveLength(3);
  });

  describe('[Button] Interaction', () => {
    let cnt = 1;

    it('simulate onPress', () => {
      rendered = renderer.create(
        component({
          onClick: () => cnt++,
        }),
      );

      root = rendered.root;

      root.findByType(Button).props.onClick();
      expect(cnt).toBe(2);
    });
  });
});
