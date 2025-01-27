import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { COLOR_BLACK, COLOR_GREEN, COLOR_PURPLE } from '../../styles/colors';
import MetricPanel from './MetricPanel';

describe('MetricPanel component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render the MetricPanel component', () => {
    render(<MetricPanel label="Score" value={100} />);

    const labelElement = screen.getByText(/Score/i);
    const valueElement = screen.getByText('100');

    expect(labelElement).toBeInTheDocument();
    expect(valueElement).toBeInTheDocument();
  });

  it('should display the correct label and value', () => {
    const testLabel = 'Time Remaining';
    const testValue = 30;

    render(<MetricPanel label={testLabel} value={testValue} />);

    const labelElement = screen.getByText(testLabel);
    const valueElement = screen.getByText(testValue.toString());

    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveTextContent(testLabel);

    expect(valueElement).toBeInTheDocument();
    expect(valueElement).toHaveTextContent(testValue.toString());
  });

  it('should apply default label and value colors when no color props are provided', () => {
    const defaultColor = COLOR_BLACK;

    render(<MetricPanel label="Default Colors" value={42} />);

    const labelElement = screen.getByText(/Default Colors/i);
    const valueElement = screen.getByText('42');

    expect(labelElement).toHaveStyle(`color: ${defaultColor}`);
    expect(valueElement).toHaveStyle(`color: ${defaultColor}`);
  });

  it('should apply custom label and value colors when provided', () => {
    const customLabelColor = COLOR_PURPLE;
    const customValueColor = COLOR_GREEN;

    render(
      <MetricPanel
        label="Custom Colors"
        value={100}
        labelColor={customLabelColor}
        valueColor={customValueColor}
      />,
    );

    const labelElement = screen.getByText(/Custom Colors/i);
    const valueElement = screen.getByText('100');

    expect(labelElement).toHaveStyle(`color: ${customLabelColor}`);
    expect(valueElement).toHaveStyle(`color: ${customValueColor}`);
  });
});
