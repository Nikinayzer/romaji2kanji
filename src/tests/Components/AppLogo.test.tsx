import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react';
import AppLogo from '../../components/AppLogo';

describe('AppLogo component', () => {

  it('renders without crashing', () => {
    render(<AppLogo />);
    expect(screen.getByTestId('logo-wrapper')).toBeInTheDocument();
  });

  it('displays dialog when logo is clicked', () => {
    render(<AppLogo />);
    
    const logoWrapper = screen.getByTestId('logo-wrapper');
    fireEvent.click(logoWrapper);
    
    const dialogBubble = screen.getByTestId('dialog-bubble');
    expect(dialogBubble).toBeInTheDocument();
  });

  it('hides dialog after a certain period', async () => {
    jest.useFakeTimers();
    render(<AppLogo />);
    
    const logoWrapper = screen.getByTestId('logo-wrapper');
    fireEvent.click(logoWrapper);
    
    const dialogBubble = screen.getByTestId('dialog-bubble');
    expect(dialogBubble).toBeInTheDocument();
    
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('dialog-bubble')).not.toBeInTheDocument();
    });
  });

});
