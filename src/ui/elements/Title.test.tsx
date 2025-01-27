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

    render(<Title>{titleText}</Title>);

    const titleElement = screen.getByText(titleText);
    expect(titleElement).toBeInTheDocument();
  });

  it('should render the title as an h1 element', () => {
    const titleText = 'Another Title';

    render(<Title>{titleText}</Title>);

    const titleElement = screen.getByRole('heading', { level: 1 });
    expect(titleElement).toBeInTheDocument();
  });
});
