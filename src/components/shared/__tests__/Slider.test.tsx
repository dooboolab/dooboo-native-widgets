import * as React from 'react';

import { Animated, View } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';
import {
  getNearestPercentByValue,
  getPercentByPositionX,
  getPercentByValue,
  getStepValueByPercent,
  getValueByPercent,
  roundNearest,
} from '../Slider/utils';

import Label from '../Slider/Label';
import Marks from '../Slider/Marks';
import Rail from '../Slider/Rail';
import Slider from '../Slider';
import Thumb from '../Slider/Thumb';
import Track from '../Slider/Track';

const TEST_ID = {
  RAIL: 'rail-test-id',
  TRACK: 'track-test-id',
  MARKS: 'marks-test-id',
  THUMB: 'thumb-test-id',
  LABEL: 'label-test-id',
  THUMBPOSITIONER: 'thumb-positioner-test-id',
};

describe('[Slider] render', () => {
  it('renders without crashing', () => {
    const rendered = render(
      <Slider
        hideMark={false}
        defaultValue={10}
        minValue={0}
        maxValue={100}
        step={10}
        onChange={(): void => {}}
      />,
    ).asJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  describe('required components', () => {
    it('should have a [Rail].', () => {
      const { queryByTestId } = render(
        <Slider />,
      );
      const rail = queryByTestId(TEST_ID.RAIL);

      expect(rail).not.toBeNull();
    });

    it('should have a [Track].', () => {
      const { queryByTestId } = render(
        <Slider />,
      );
      const track = queryByTestId(TEST_ID.TRACK);

      expect(track).not.toBeNull();
    });

    it('should have a [Marks].', () => {
      const { queryByTestId } = render(
        <Slider />,
      );
      const marks = queryByTestId(TEST_ID.MARKS);

      expect(marks).not.toBeNull();
    });

    it('should have a [Thumb].', () => {
      const { queryByTestId } = render(
        <Slider />,
      );
      const thumb = queryByTestId(TEST_ID.THUMB);

      expect(thumb).not.toBeNull();
    });

    it('should hide [Label].', () => {
      const { queryByTestId } = render(
        <Slider />,
      );
      const label = queryByTestId(TEST_ID.LABEL);

      expect(label).toBeNull();
    });

    it('should have a [Label].', () => {
      const { queryByTestId } = render(
        <Slider
          hideLabel={false}
        />,
      );
      const label = queryByTestId(TEST_ID.LABEL);

      expect(label).not.toBeNull();
    });
  });

  it('should hide [Marks] when hideMark is true.', () => {
    const { queryByTestId } = render(
      <Slider
        hideMark={true}
      />,
    );
    const marks = queryByTestId(TEST_ID.MARKS);

    expect(marks).toBeNull();
  });

  it('should hide [Marks] when step is less than 0.', () => {
    const { queryByTestId } = render(
      <Slider
        step={-1}
      />,
    );
    const marks = queryByTestId(TEST_ID.MARKS);

    expect(marks).toBeNull();
  });

  it('should hide [Marks] when step is equal to 0.', () => {
    const { queryByTestId } = render(
      <Slider
        step={0}
      />,
    );
    const marks = queryByTestId(TEST_ID.MARKS);

    expect(marks).toBeNull();
  });
});

describe('[Marks]', () => {
  const Mark: React.FC<{ testID: string }> = ({ testID }) => {
    return <View testID={testID} />;
  };

  it('renders without crashing', () => {
    const rendered = render(
      <Marks
        sliderWidth={100}
        mark={<Mark testID={TEST_ID.MARKS} />}
        customMarkWidth={1}
        step={10}
        minValue={0}
        maxValue={100}
      />,
    ).asJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  it('calls onMarkPress with expected arguments', () => {
    const handleMarkPress = jest.fn();
    const STEP = 10;
    const MARK_COUNT = 10;

    const { getAllByTestId } = render(
      <Marks
        sliderWidth={100}
        mark={<Mark testID={TEST_ID.MARKS} />}
        customMarkWidth={10}
        step={STEP}
        minValue={0}
        maxValue={100}
        onMarkPress={handleMarkPress}
      />,
    );
    const marks = getAllByTestId(TEST_ID.MARKS);
    for (let i = 0; i < MARK_COUNT; i += 1) {
      fireEvent.press(marks[i]);
    }
    for (let i = 0; i < MARK_COUNT; i += 1) {
      const [value, position, index] = handleMarkPress.mock.calls[i];
      expect(value).toBe(i * STEP);
      expect(index).toBe(i);
    }
  });

  it('calls onInit with expected arguments', () => {
    const onInit = jest.fn();
    const STEP = 8;
    const MIN_VALUE = 0;
    const MAX_VALUE = 96;
    const MARK_COUNT = Math.floor((MAX_VALUE - MIN_VALUE) / STEP);

    render(
      <Marks
        sliderWidth={100}
        mark={<Mark testID={TEST_ID.MARKS} />}
        customMarkWidth={12}
        style={{ width: 240 }}
        step={STEP}
        minValue={MIN_VALUE}
        maxValue={MAX_VALUE}
        onInit={onInit}
      />,
    );
    expect(onInit).toHaveBeenCalledTimes(1);
    const expectedArgumentForOnInit = Array.from({
      length: MARK_COUNT + 1,
    }).map((_, idx) => STEP * idx);
    const actualArgumentForOnInit = onInit.mock.calls[0][0];

    expect(actualArgumentForOnInit).toStrictEqual(expectedArgumentForOnInit);
  });
});

describe('[Rail]', () => {
  it('renders without crashing', () => {
    const rendered = render(
      <Rail testID="RailTestID" style={{ backgroundColor: 'red' }} />,
    ).asJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

describe('[Label]', () => {
  it('renders without crashing', () => {
    const rendered = render(
      <Label
        percentValue={new Animated.Value(0)}
        testID="LabelTestID"
        value={0}
      />,
    ).asJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

describe('[Track]', () => {
  it('renders without crashing', () => {
    const rendered = render(
      <Track
        testID="TrackTestID"
        style={{ backgroundColor: 'red' }}
        percent={50}
      />,
    ).asJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  it('should be n% width of Slider.', () => {
    const TEST_ID_TRACK = 'TrackTestID';
    const percent = 50;
    const { getByTestId } = render(
      <Track
        testID="TrackTestID"
        style={{ backgroundColor: 'red' }}
        percent={50}
      />,
    );
    const track = getByTestId(TEST_ID_TRACK);

    expect(track.getProp('width')).toBe(percent);
  });

  describe('[Track]', () => {
    it('renders without crashing', () => {
      const rendered = render(
        <Track
          testID="TrackTestID"
          style={{ backgroundColor: 'red' }}
          percent={50}
        />,
      ).asJSON();
      expect(rendered).toMatchSnapshot();
      expect(rendered).toBeTruthy();
    });

    it('should be n% width of Slider.', () => {
      const TEST_ID_TRACK = 'TrackTestID';
      const percent = 50;
      const { getByTestId } = render(
        <Track
          testID={TEST_ID_TRACK}
          style={{ backgroundColor: 'red' }}
          percent={50}
        />,
      );
      const track = getByTestId(TEST_ID_TRACK);

      expect(track.getProp('width')).toBe(percent);
    });
  });

  describe('[Thumb]', () => {
    it('renders without crashing', () => {
      const rendered = render(
        <Thumb
          testID="ThumbTestID"
          opacityValue={new Animated.Value(0.12)}
          scaleValue={new Animated.Value(0.01)}
          percent={50}
          size={10}
        />,
      ).asJSON();
      expect(rendered).toMatchSnapshot();
      expect(rendered).toBeTruthy();
    });

    it('should pose [Thumb] to given percent.', () => {
      const PERCENT = 30;
      const { container } = render(
        <Thumb
          percent={PERCENT}
        />,
      );
      const thumb = container.props.children;

      expect(thumb.props.percent).toBe(PERCENT);
    });
  });

  describe('utils', () => {
    describe('roundNearest', () => {
      it('should return floored when the number is smaller than half of the digit.', () => {
        const result = roundNearest(12, 5);

        expect(result).toBe(10);
      });
      it('should return ceiled when the number is smaller than half of the digit.', () => {
        const result = roundNearest(13, 5);

        expect(result).toBe(15);
      });
    });

    describe('getPercentByValue', () => {
      it('should return the rate of value between minValue and maxValue.', () => {
        const result = getPercentByValue(5, 60, 10);

        expect(result).toBe(10);
      });
    });

    describe('getValueByPercent', () => {
      it('should return the value of rate between minValue and maxValue.', () => {
        const result = getValueByPercent(10, 60, 10);

        expect(result).toBe(5);
      });
    });

    describe('getPercentByPositionX', () => {
      it('should return 0 when the rate of positionX is equal or smaller than 0.', () => {
        const result = getPercentByPositionX({
          positionX: -1,
          sliderWidth: 100,
          stepPercent: 5,
        });

        expect(result).toBe(0);
      });

      it('should return 100 when the rate of positionX is equal or smaller than 100.', () => {
        const result = getPercentByPositionX({
          positionX: 110,
          sliderWidth: 100,
          stepPercent: 5,
        });

        expect(result).toBe(100);
      });

      it('should return the floored rate of positionX according to step.', () => {
        const result = getPercentByPositionX({
          positionX: 12,
          sliderWidth: 100,
          stepPercent: 5,
        });

        expect(result).toBe(10);
      });

      it('should return the ceiled rate of positionX according to step.', () => {
        const result = getPercentByPositionX({
          positionX: 13,
          sliderWidth: 100,
          stepPercent: 5,
        });

        expect(result).toBe(15);
      });
    });

    describe('getNearestPercentByValue', () => {
      it('should return 0 when the rate of value is equal or smaller than 0.', () => {
        const result = getNearestPercentByValue({
          value: 1,
          minValue: 10,
          maxValue: 60,
          step: 5,
        });

        expect(result).toBe(0);
      });

      it('should return 100 when the rate of value is equal or smaller than 100.', () => {
        const result = getNearestPercentByValue({
          value: 70,
          minValue: 10,
          maxValue: 60,
          step: 5,
        });

        expect(result).toBe(100);
      });

      it('should return the floored rate according to value between minValue and maxValue.', () => {
        const result = getNearestPercentByValue({
          value: 12,
          minValue: 10,
          maxValue: 60,
          step: 5,
        });

        expect(result).toBe(20);
      });

      it('should return the ceiled rate according to value between minValue and maxValue.', () => {
        const result = getNearestPercentByValue({
          value: 13,
          minValue: 10,
          maxValue: 60,
          step: 5,
        });

        expect(result).toBe(30);
      });
    });

    describe('getStepValueByPercent', () => {
      it('should return value of step according to percent.', () => {
        const result = getStepValueByPercent({
          percent: 10,
          stepPercent: 40,
          step: 5,
        });

        expect(result).toBe(1.25);
      });
    });
  });
});
