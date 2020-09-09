# Slider

> Simple slider item component for react-native. This component supports visualization of the numeric data with animation and label text.<br/>

## Preview

<img width="400" alt="image" src="https://user-images.githubusercontent.com/216363/92616942-ca1e8e00-f2f9-11ea-9007-919a71b7c415.png">
<img width="400" alt="image" src="https://user-images.githubusercontent.com/216363/92617007-d9054080-f2f9-11ea-9863-4c4ab5af205e.png">

## Props

|                 | necessary | types                   | default |
| --------------- | --------- | ----------------------- | ------- |
| hideMark        |           | boolean                 | false   |
| hideLabel       |           | boolean                 | true    |
| autoLabel       |           | boolean                 | false   |
| step            |           | number                  | 1       |
| defaultValue    |           | number                  | 0       |
| minValue        |           | number                  | 0       |
| maxValue        |           | number                  | 100     |
| thumb           |           | React.ReactElement      |         |
| thumbSize       |           | number                  |         |
| mark            |           | React.ReactElement      |         |
| customMarkWidth |           | number                  |         |
| startMark       |           | boolean                 | true    |
| endMark         |           | boolean                 | true    |
| markStyle       |           | StyleProp<ViewStyle>    |         |
| railStyle       |           | StyleProp<ViewStyle>    |         |
| trackStyle      |           | StyleProp<ViewStyle>    |         |
| thumbStyle      |           | StyleProp<ViewStyle>    |         |
| labelSize       |           | number                  |         |
| labelStyle      |           | StyleProp<ViewStyle>    |         |
| labelTextStyle  |           | StyleProp<TextStyle>    |         |
| onChange        |           | (value: number) => void |         |

## Installation

```sh
yarn add dooboo-ui
```

## Usage

```javascript
import React, { ReactElement } from 'react';

import { Slider } from 'dooboo-ui';
import styled from 'styled-components/native';

function Page(): ReactElement {
  const handleChange = (value) => {
    // Do something!
  };

  return (
    <Container>
      <Slider step={10} defaultValue={20} minValue={0} maxValue={100} />

      <Slider
        minValue={0}
        maxValue={5}
        step={1}
        hideLabel={false}
        autoLabel
        onChange={handleChange}
      />

      <Slider
        minValue={0}
        maxValue={10}
        defaultValue={6}
        step={1}
        railStyle={{ backgroundColor: '#90A4F9' }}
        trackStyle={{ backgroundColor: '#0B21E8' }}
        thumbSize={8}
        thumbStyle={{ backgroundColor: '#0B21E8' }}
        markStyle={{ backgroundColor: '#4163F4' }}
        labelSize={15}
        labelStyle={{ backgroundColor: '#0B21E8' }}
        labelTextStyle={{ color: '#FFFFFF', fontSize: 12 }}
        onChange={handleChange}
      />
    </Container>
  );
}

export default Page;
```
