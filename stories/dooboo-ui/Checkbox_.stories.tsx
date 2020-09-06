import React, { ReactElement, useState } from 'react';
import { Text } from 'react-native';

// eslint-disable-next-line sort-imports
import { Checkbox_, CheckboxGroup_ } from '../../main';
import { ContainerDeco } from '../../storybook/decorators';

import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const ScrollContainer = styled.ScrollView`
  width: 100%;
`;

const Container = styled.View`
  background-color: transparent;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  flex-direction: column;
`;

const Title = styled.Text`
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
`;

const Seperator = styled.View`
 border-bottom-color: black;
 border-bottom-width: 1;
`;

function DefaultCheckbox(): React.ReactElement {
  const customStyle = {
    labelLeft: true,
  };
  return (
    <ScrollContainer>

      <Container>
        <Title>default</Title>
        <Checkbox_ label="defaultChecked" defaultChecked ></Checkbox_>

      </Container>

      <Container>
        <Title>disabled</Title>
        <Checkbox_ label="disabled" disabled />
      </Container>

      <Container>
        <Title>indeterminate</Title>
        <Checkbox_ label="indeterminate" indeterminate />
      </Container>

      <Container>
        <Title>labelLeft</Title>
        <Checkbox_ label="labelLeft" customStyle={customStyle} />
      </Container>

    </ScrollContainer>
  );
}

function DefaultCheckboxGroup(): React.ReactElement {
  const plainOptions = ['Apple', 'Pear', 'Orange'];
  const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
    { label: 'Mango', value: 'Mango' },
  ];
  const optionsWithDisabled = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange', disabled: true },
  ];

  const onChange = (checkedValues): void => {
    console.log('checked = ', checkedValues);
  };
  return (
    <ScrollContainer>

      <Container>
        <Title>plainOption</Title>
        <CheckboxGroup_ options={plainOptions} onChange={onChange} />
      </Container>
      <Container>
        <Title>Default</Title>
        <CheckboxGroup_ options={options} onChange={onChange} />
      </Container>

      <Container>
        <Title>option with disabled</Title>
        <CheckboxGroup_ options={optionsWithDisabled} onChange={onChange} />
      </Container>

      <Container>
        <Title>with disabled props</Title>
        <CheckboxGroup_ options={options} disabled onChange={onChange} />
      </Container>

    </ScrollContainer>
  );
}

function CheckAll(): React.ReactElement {
  const plainOptions = ['Apple', 'Pear', 'Orange'];
  const defaultCheckedList = ['Apple', 'Orange'];

  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(defaultCheckedList.length > 0);
  const [checkAll, setCheckAll] = useState(false);

  const onChange = (checkedList): void => {
    setCheckedList(checkedList);
    setIndeterminate(!!checkedList.length && checkedList.length < plainOptions.length);
    setCheckAll(checkedList.length === plainOptions.length);
  };

  const onCheckAllChange = (e) : void => {
    setCheckedList(e.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.checked);
  };

  return (
    <ScrollContainer>

      <Container>
        <Title>Check All</Title>
        <Checkbox_
          label={'Check All'}
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        />
        <Seperator/>
        <CheckboxGroup_ values={checkedList} options={plainOptions} onChange={onChange} />
      </Container>
    </ScrollContainer>
  );
}

export default {
  title: 'Checkbox_',
};

// export const toStorybook1 = (): ReactElement => <DefaultCheckBox />;

/**
 * Below are stories for app
 */
storiesOf('Checkbox_', module)
  .addDecorator(ContainerDeco)
  .add('Checkbox', () => (
    <>
      <DefaultCheckbox />
    </>
  ))
  .add('CheckboxGroup', () => (
    <>
      <DefaultCheckboxGroup />
    </>
  ))
  .add('CheckAll', () => (
    <>
      <CheckAll />
    </>
  ));
