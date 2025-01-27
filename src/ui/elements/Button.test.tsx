import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Button from './Button';

describe('Button component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should have a button in the dom', () => {
    const mockOnClick = vi.fn();

    render(<Button onClick={mockOnClick}>Click me</Button>);

    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toBeInTheDocument();
  });

  it('should should display a button with the provided text', () => {
    const mockOnClick = vi.fn();
    const expectedText = 'The button text';

    render(<Button onClick={mockOnClick}>{expectedText}</Button>);

    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toHaveTextContent(expectedText);
  });

  it('should call the provided callback when the button is clicked', () => {
    const mockOnClick = vi.fn();

    render(<Button onClick={mockOnClick}>Click me</Button>);

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
