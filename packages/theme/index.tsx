import {
  DefaultTheme,
  ThemeProvider as OriginalThemeProvider,
} from 'styled-components/native';
import {
  Theme as DoobooTheme,
  ThemeParam,
  ThemeType,
  createDoobooTheme,
  dark as darkTheme,
  light as lightTheme,
} from './theme';
import React, { useState } from 'react';

import createCtx from './createCtx';

interface Context {
  themeType: ThemeType;
  theme: DefaultTheme;
  doobooTheme: DoobooTheme;
  changeThemeType: () => void;
}
const [useCtx, Provider] = createCtx<Context>();

export const defaultThemeType: ThemeType = ThemeType.LIGHT;

interface Props {
  children?: React.ReactElement;
  // using initial ThemeType is essential while testing apps with consistent ThemeType
  initialThemeType?: ThemeType;
  customTheme?: ThemeParam;
  doobooTheme?: DoobooTheme;
}

function ThemeProvider({
  children,
  initialThemeType = defaultThemeType,
  customTheme,
  doobooTheme,
}: Props): React.ReactElement {
  const [themeType, setThemeType] = useState(initialThemeType);

  const changeThemeType = (): void => {
    const newThemeType =
      themeType === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT;
    setThemeType(newThemeType);
  };

  let theme: DefaultTheme;
  if (customTheme) {
    theme = createDoobooTheme(
      {
        light: {
          ...lightTheme,
          ...customTheme.light,
        },
        dark: {
          ...darkTheme,
          ...customTheme.dark,
        },
      },
      themeType,
    ) as DefaultTheme;
  } else {
    theme = createDoobooTheme(
      { light: {}, dark: {} },
      themeType,
    ) as DefaultTheme;
  }

  return (
    <Provider
      value={{
        themeType,
        changeThemeType,
        theme: theme,
        doobooTheme: doobooTheme,
      }}>
      <OriginalThemeProvider theme={theme}>{children}</OriginalThemeProvider>
    </Provider>
  );
}

export { useCtx as useThemeContext, ThemeProvider, ThemeType, DoobooTheme };
