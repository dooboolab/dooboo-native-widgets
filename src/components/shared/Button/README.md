# Button
> Simple [Button] component that can be used inside product. Has basic features like `loading` state, `disabled` state and also has ability to put `img` to left-hand which is used very often.

![image](https://user-images.githubusercontent.com/27461460/62291727-9be84100-b49f-11e9-8ce5-ceaa1dc3153e.png)

## Props
|                      | necessary | types                  | default                      |
|----------------------|-----------|------------------------|------------------------------|
| testID               |           | string                 |                              |
| isLoading            |           | boolean                |                              |
| isDisabled           |           | boolean                |                              |
| onClick              |           | func                   |                              |
| style                |           | `StyleProp<ViewStyle>` |                              |
| disabledStyle        |           | `StyleProp<ViewStyle>` |                              |
| textStyle            |           | `StyleProp<TextStyle>` |                              |
| imgLeftSrc           |           | ImageSourcePropType    |                              |
| imgLeftStyle         |           | ImageSourcePropType    |                              |
| indicatorColor       |           | string                 |                              |
| activeOpacity        |           | number                 |                              |
| text                 |           | string                 |                              |

## Getting started

* Import
  ```javascript
  import { Button } from '@dooboo-ui/native';
  ```

* Usage
  ```javascript
  function Page(props: Props) {
    return (
      <Container>
        <Button
          testID='btn'
          isLoading={false}
          text='😀 😎 👍 💯'
          onClick={() => {}}
        />
        <Button
          style={{
            marginVertical: 40,
          }}
          isDisabled={true}
          text='This is disabled!!'
          onClick={() => {}}
        />
        <Button
          testID='btnGoogle'
          imgLeftSrc={IC_GOOGLE}
          isLoading={googleLoading}
          indicatorColor='#023059'
          onClick={() => {
            setGoogleLoading(true);
            const timeout = setTimeout(() => {
              setGoogleLoading(false);
              clearTimeout(timeout);
            }, 2000);
          }}
          text='GOOGLE SIGN IN'
        />
        <Button
          testID='btnFacebook'
          imgLeftSrc={IC_FACEBOOK}
          indicatorColor='#023059'
          isLoading={facebookLoading}
          imgLeftStyle={{
            height: 28,
            width: 16,
          }}
          style={{
            marginTop: 40,
            backgroundColor: '#ccc',
            borderWidth: 0.5,
            borderRadius: 0,
          }}
          onClick={() => {
            setFacebookLoading(true);
            const timeout = setTimeout(() => {
              setFacebookLoading(false);
              clearTimeout(timeout);
            }, 2000);
          }}
          text='FACEBOOK SIGN IN'
        />
      </Container>
    );
  }
```
