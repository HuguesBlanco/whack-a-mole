import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Mole from './Mole';

describe('Mole component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should display the mole image as "up" when isUp is true', () => {
    render(<Mole isUp={true} onMoleHit={vi.fn()} />);

    const moleImage = screen.getByAltText('Mole up in hole');
    expect(moleImage).toBeInTheDocument();
    expect(moleImage).toHaveAttribute(
      'src',
      expect.stringContaining('hole-mole-up.png'),
    );
  });

  it('should display the mole image as "down" when isUp is false', () => {
    render(<Mole isUp={false} onMoleHit={vi.fn()} />);

    const moleImage = screen.getByAltText('Mole down in hole');
    expect(moleImage).toBeInTheDocument();
    expect(moleImage).toHaveAttribute(
      'src',
      expect.stringContaining('hole-mole-down.png'),
    );
  });

  it('should call onMoleHit when the mole is visible (isUp) and clicked', () => {
    const mockOnMoleHit = vi.fn();
    render(<Mole isUp={true} onMoleHit={mockOnMoleHit} />);

    const moleImage = screen.getByAltText('Mole up in hole');
    fireEvent.click(moleImage);

    expect(mockOnMoleHit).toHaveBeenCalledTimes(1);
  });

  it('should not call onMoleHit when the mole is not visible (isUp is false) and clicked', () => {
    const mockOnMoleHit = vi.fn();
    render(<Mole isUp={false} onMoleHit={mockOnMoleHit} />);

    const moleImage = screen.getByAltText('Mole down in hole');
    fireEvent.click(moleImage);

    expect(mockOnMoleHit).not.toHaveBeenCalled();
  });

  it('should change its image is isUp value changes', () => {
    const mockOnMoleHit = vi.fn();
    const { rerender } = render(<Mole isUp={true} onMoleHit={mockOnMoleHit} />);

    const moleImage = screen.getByAltText('Mole up in hole');
    expect(moleImage).toBeInTheDocument();
    fireEvent.click(moleImage);

    rerender(<Mole isUp={true} onMoleHit={mockOnMoleHit} />);
    const updatedMoleImage = screen.getByAltText('Mole down in hole');
    expect(updatedMoleImage).toBeInTheDocument();
  });
});
