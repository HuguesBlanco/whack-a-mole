import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import Title from './Title';

describe('Title component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render the title text passed as children', () => {
    const titleText = 'Game Title';

    render(<Title isPortrait={false}>{titleText}</Title>);

    const titleElement = screen.getByText(titleText);
    expect(titleElement).toBeInTheDocument();
  });

  it('should render the title as an h1 element', () => {
    const titleText = 'Another Title';

    render(<Title isPortrait={false}>{titleText}</Title>);

    const titleElement = screen.getByRole('heading', { level: 1 });
    expect(titleElement).toBeInTheDocument();
  });

  it('should render each word as a separate block when isPortrait is true', () => {
    const titleText = 'Game Title';
    render(<Title isPortrait={true}>{titleText}</Title>);

    const titleElement = screen.getByRole('heading', { level: 1 });
    expect(titleElement).toBeInTheDocument();

    const words = titleText.split(' ');
    words.forEach((word) => {
      const wordElement = screen.getByText(word);
      expect(wordElement).toBeInTheDocument();
      expect(wordElement).toHaveStyle({ display: 'block' });
    });

    expect(titleElement).not.toHaveTextContent(titleText);
  });

  it('should render each word as a separate block when isPortrait is true, also splitting on dashes', () => {
    const titleText = 'Game-Title';
    render(<Title isPortrait={true}>{titleText}</Title>);

    const titleElement = screen.getByRole('heading', { level: 1 });
    expect(titleElement).toBeInTheDocument();

    const words = titleText.split('-');
    words.forEach((word) => {
      const wordElement = screen.getByText(word);
      expect(wordElement).toBeInTheDocument();
      expect(wordElement).toHaveStyle({ display: 'block' });
    });

    expect(titleElement).not.toHaveTextContent(titleText);
  });
});
