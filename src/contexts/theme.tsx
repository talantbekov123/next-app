import React, { createContext, useContext } from 'react';
import { DefaultTheme } from 'styled-components';

import usePersistedState from '../utils/usePersistedState';

import dark from '../styles/themes/dark';

interface ThemeContextData {
  theme: DefaultTheme;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider: React.FC = ({}) => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', dark);

  return (
    <ThemeContext.Provider value={{ theme }}>
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}

export function withThemeContext(Component) {
  return function contextComponent(props) {
    return (
      <ThemeContext.Consumer>
        {(context) => <Component {...props} context={context} />}
      </ThemeContext.Consumer>
    );
  };
}
