import * as React from 'react';

import Rating from '../Rating';
// Note: test renderer must be required after react-native.
import { TouchableOpacity } from 'react-native';
import renderer from 'react-test-renderer';

let props: any;

// let testingLib: RenderResult;

const component = (props?): React.ReactElement => {
  return <Rating {...props} />;
};

const createTestProps = (obj: object): object => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...obj,
});

describe('[Rating] render', () => {
  beforeEach(() => {
    props = createTestProps({});
  });

  it('renders without crashing', () => {
    const rendered: renderer.ReactTestRendererJSON | null = renderer
      .create(component())
      .toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  describe('[Rating] Interaction', (): void => {
    it('should simulate onPress', (): void => {
      const handlePress = jest.fn();
      const rendered = renderer.create(
        component({
          testID: 'RATING_ID',
          onChange: handlePress,
        }),
        {
          createNodeMock: (element) => {
            return {
              handlePressIn: handlePress,
              handlePressOut: handlePress,
            };
          },
        },
      );
      const ratingClick = rendered.root.findByType(TouchableOpacity);
      renderer.act(() => {
        ratingClick.props.onPress();
      });
      expect(handlePress).toHaveBeenCalled();
    });
    // it('should simulate props', (): void => {
    //   const rendered = renderer.create(
    //     component({
    //       testID: 'RADIOBUTTON_ID',
    //     }),
    //   );

    //   rendered.update(component({ labelPlacement: 'top' }));
    //   expect(rendered).toMatchSnapshot();
    //   expect(rendered).toBeTruthy();

    //   rendered.update(component({ disabled: true }));
    //   expect(rendered).toMatchSnapshot();
    //   expect(rendered).toBeTruthy();

    //   rendered.update(
    //     component({ disabled: false, value: 0, selectedValue: 1 }),
    //   );
    //   expect(rendered).toMatchSnapshot();
    //   expect(rendered).toBeTruthy();
    // });
  });
});
