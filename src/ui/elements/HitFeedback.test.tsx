import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import HitFeedback from './HitFeedback';

describe('HitFeedback component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render a container with the feedback text "Ouch !"', () => {
    render(<HitFeedback />);

    const feedbackElement = screen.getByText(/Ouch !/i);

    expect(feedbackElement).toBeInTheDocument();
  });

  it('should have the cursor hidden', () => {
    const { container } = render(<HitFeedback />);

    const feedbackContainer = container.firstChild as HTMLElement;

    expect(feedbackContainer).toBeDefined();
    expect(window.getComputedStyle(feedbackContainer).cursor).toBe('none');
  });
});
