import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { COLOR_YELLOW } from '../../styles/colors';
import { hexToRgba } from '../../utils/colorsUtils';
import HomeTemplate from './HomeTemplate';

describe('HomeTemplate component', () => {
  afterEach(() => {
    cleanup();
  });

  const mockOnClickStart = vi.fn();

  it('should render the Title component with the correct text', () => {
    render(<HomeTemplate onClickStart={mockOnClickStart} />);

    const titleElement = screen.getByText('Whack-A-Mole');
    expect(titleElement).toBeInTheDocument();
  });

  it('should call the onClickStart callback when the button is clicked', () => {
    render(<HomeTemplate onClickStart={mockOnClickStart} />);

    const buttonElement = screen.getByRole('button', { name: 'Start Game' });

    fireEvent.click(buttonElement);

    expect(mockOnClickStart).toHaveBeenCalledTimes(1);
  });

  it('should render a yellow overlay on top of the game background', () => {
    const { container } = render(
      <HomeTemplate onClickStart={mockOnClickStart} />,
    );

    const overlayDiv = container.firstChild?.firstChild;

    expect(overlayDiv).toHaveStyle({
      backgroundColor: hexToRgba(COLOR_YELLOW, 0.8),
    });
  });
});
