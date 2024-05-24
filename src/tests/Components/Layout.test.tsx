import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Layout from '../../components/Layout';
import { Provider } from 'react-redux';
import store from '../../redux/store';

// Render Layout component once before running tests
beforeEach(() => {
  render(
    <Provider store={store}>
      <Layout />
    </Provider>
  );
});

describe('Layout component', () => {
  
  it('adds correct character to input value when key is clicked', () => {
    const inputButton = screen.getByText('う');
    fireEvent.click(inputButton);
    expect(store.getState().appState.inputValue).toBe('う');
  });

  it('updates typing mode when switching between hiragana and katakana', () => {
    const katakanaButton = screen.getByText('Katakana');
    fireEvent.click(katakanaButton);
    expect(store.getState().appState.typingMode).toBe('katakana');
  });

  it('toggles romaji visibility when romaji button is clicked', () => {
    const romajiButton = screen.getByTestId('toggle-romaji-button');
    fireEvent.click(romajiButton);
    const romajiSpan = screen.queryByText('key-romaji');
    expect(romajiSpan).toBeNull();
  });

  it('toggles layout visibility when layout button is clicked', () => {
    const layoutButton = screen.getByTestId('toggle-layout-button');
    fireEvent.click(layoutButton);
    expect(store.getState().appState.showLayout).toBe(false);
  });
});
