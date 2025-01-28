import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MolesData } from '../../types/moleTypes';
import MolesGrid from './MolesGrid';

describe('MolesGrid component', () => {
  afterEach(() => {
    cleanup();
  });

  const mockMolesData: MolesData = [
    { id: '1', isUp: true },
    { id: '2', isUp: false },
    { id: '3', isUp: true },
    { id: '4', isUp: false },
  ];

  it('should render the grid with the correct number of moles', () => {
    render(<MolesGrid molesData={mockMolesData} onMoleHit={vi.fn()} />);

    const moleImages = screen.getAllByRole('img');
    expect(moleImages).toHaveLength(mockMolesData.length);
  });

  it('should display moles in the correct "up" or "down" state based on the data', () => {
    render(<MolesGrid molesData={mockMolesData} onMoleHit={vi.fn()} />);

    const moleUpImages = screen.getAllByAltText('Mole up in hole');
    expect(moleUpImages).toHaveLength(2); // There are 2 "isUp: true" in mock data

    const moleDownImages = screen.getAllByAltText('Mole down in hole');
    expect(moleDownImages).toHaveLength(2); // There are 2 "isUp: false" in mock data
  });

  it('should call the onMoleHit callback when a mole is clicked', () => {
    const mockOnMoleHit = vi.fn();
    render(<MolesGrid molesData={mockMolesData} onMoleHit={mockOnMoleHit} />);

    const moleUpImages = screen.getAllByAltText('Mole up in hole');

    const firstMoleUpImage = moleUpImages[0];
    if (firstMoleUpImage === undefined) throw Error('No Mole up image');
    fireEvent.click(firstMoleUpImage);

    expect(mockOnMoleHit).toHaveBeenCalledTimes(1);
  });

  it('should not call the onMoleHit callback when clicking a "Mole down"', () => {
    const mockOnMoleHit = vi.fn();
    render(<MolesGrid molesData={mockMolesData} onMoleHit={mockOnMoleHit} />);

    const moleDownImages = screen.getAllByAltText('Mole down in hole');

    const firstMoleDownImage = moleDownImages[0];
    if (firstMoleDownImage === undefined) throw Error('No Mole down image');
    fireEvent.click(firstMoleDownImage);

    expect(mockOnMoleHit).not.toHaveBeenCalled();
  });

  it('should render a grid with 3 rows and 4 columns on landscape orientation', () => {
    const { container } = render(
      <MolesGrid
        molesData={mockMolesData}
        onMoleHit={vi.fn()}
        isPortrait={false}
      />,
    );

    const gridDiv = container.firstChild;

    expect(gridDiv).toBeInTheDocument();
    expect(gridDiv).toHaveStyle('display: grid');
    expect(gridDiv).toHaveStyle('grid-template-columns: repeat(4, 1fr)');
    expect(gridDiv).toHaveStyle('grid-template-rows: repeat(3, 33.333333%)');
  });

  it('should render a grid with 4 rows and 3 columns on portrait orientation', () => {
    const { container } = render(
      <MolesGrid
        molesData={mockMolesData}
        onMoleHit={vi.fn()}
        isPortrait={true}
      />,
    );

    const gridDiv = container.firstChild;

    expect(gridDiv).toBeInTheDocument();
    expect(gridDiv).toHaveStyle('display: grid');
    expect(gridDiv).toHaveStyle('grid-template-columns: repeat(3, 1fr)');
    expect(gridDiv).toHaveStyle('grid-template-rows: repeat(4, 25%)');
  });
});
