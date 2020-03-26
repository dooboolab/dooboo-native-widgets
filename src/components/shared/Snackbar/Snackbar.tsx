import * as React from 'react';

import {
  Animated, Dimensions, StyleSheet, TextStyle, ViewStyle,
} from 'react-native';

import styled from 'styled-components/native';

const { width } = Dimensions.get('screen');
const maxWidth = width - 32;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    minWidth: 150,
    maxWidth,
    textAlign: 'left',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    bottom: 10,
    backgroundColor: '#87b5ff',
    borderRadius: 10,
  },
});

const MessageText = styled.Text`
  color: white;
`;

const ActionText = styled.Text`
  color: green;
`;

const ActionContainer = styled.View`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: -5px;
  padding-left: 16px;
`;

const Touchable = styled.TouchableOpacity``;

const ActionButton = styled.View`
  padding: 4px 4px 2px 2px;
`;

export interface SnackbarProps {
  testID?: string;
  ref: React.MutableRefObject<SnackbarRef>;
}

export interface Content {
  text: string;
  actionText?: string;
  timer?: Timer;
  actionStyle?: TextStyle;
  containerStyle?: ViewStyle;
  messageStyle?: TextStyle;
  onPressAction?: () => void;
}

interface ShowingState {
  isVisible?: boolean;
  isShowing?: boolean;
  timeout?: NodeJS.Timeout;
}

export interface SnackbarRef {
  show(content: Content): void;
}

export enum Timer {
  SHORT = 1500,
  LONG = 3000,
}

const Snackbar = (props: SnackbarProps, ref: React.Ref<SnackbarRef>): React.ReactElement => {
  const { testID } = props;
  const [showingState, setShowingState] = React.useState<ShowingState>(
    { isVisible: false, isShowing: false },
  );
  const [content, setContent] = React.useState<Content>({ text: '', timer: Timer.SHORT });
  const {
    text, actionText, messageStyle, actionStyle, containerStyle, timer = Timer.SHORT, onPressAction,
  } = content;
  const { isShowing, isVisible, timeout } = showingState;
  const [fadeAnim] = React.useState(new Animated.Value(0));
  const show = (c: Content): void => {
    setContent(c);
    timeout && clearTimeout(timeout);
    setShowingState((prevState) => Object.assign(Object.assign({}, prevState), { isShowing: true }));
  };
  const hide = (duration = 200): void => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 0,
        duration,
      },
    ).start(() => setShowingState(
      (prevState) => Object.assign(Object.assign({}, prevState), { isVisible: false }),
    ));
  };
  React.useEffect(() => {
    if (isShowing) {
      if (isVisible) {
        hide(50);
      } else {
        const hideTimeout = setTimeout(() => {
          hide();
        }, timer + 200);
        setShowingState({ isShowing: false, isVisible: true, timeout: hideTimeout });
        Animated.timing(
          fadeAnim,
          {
            toValue: 1,
            duration: 200,
          },
        ).start();
      }
    }
  }, [showingState]);
  React.useImperativeHandle(ref, () => ({
    show,
  }));
  return (
    <>
      {showingState.isVisible && (
        <Animated.View
          testID={testID}
          style={[styles.container, containerStyle, { opacity: fadeAnim }]}
        >
          <MessageText style={messageStyle}>{text}</MessageText>
          {actionText && (
            <ActionContainer>
              <Touchable onPress={onPressAction}>
                <ActionButton>
                  <ActionText style={actionStyle}>{actionText}</ActionText>
                </ActionButton>
              </Touchable>
            </ActionContainer>
          )}
        </Animated.View>
      )}
    </>
  );
};

export default React.forwardRef<SnackbarRef, SnackbarProps>(Snackbar);
