import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import PlayingField from './PlayingField';

describe('PlayingField component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render the PlayingField component', () => {
    const { container } = render(
      <PlayingField>
        <div>Game Content</div>
      </PlayingField>,
    );

    const playingField = container.firstChild as HTMLElement;
    expect(playingField).toBeInTheDocument();
    expect(playingField).toHaveStyle({
      backgroundImage: expect.stringContaining('field-background.jpg'),
    });
  });

  it('should render the children passed to the component', () => {
    render(
      <PlayingField>
        <div>Child Content</div>
      </PlayingField>,
    );

    const childElement = screen.getByText('Child Content');
    expect(childElement).toBeInTheDocument();
  });

  it('should apply the correct background styles', () => {
    const { container } = render(
      <PlayingField>
        <div>Game Content</div>
      </PlayingField>,
    );

    const playingField = container.firstChild;

    expect(playingField).toHaveStyle({
      backgroundImage: expect.stringContaining('field-background.jpg'),
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
    });
  });
});
