import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MolesData } from '../../types/moleTypes';
import GameTemplate from './GameTemplate';

describe('GameTemplate component', () => {
  afterEach(() => {
    cleanup();
  });

  const mockMolesData: MolesData = [
    { id: '1', isUp: true },
    { id: '2', isUp: false },
  ];
  const mockOnHitMole = vi.fn();

  it('should render the HitFeedback component when isMoleHit is true', () => {
    render(
      <GameTemplate
        molesData={mockMolesData}
        isMoleHit={true}
        onHitMole={mockOnHitMole}
        scoreValue={100}
        timeLeftInSeconds={60}
      />,
    );

    const hitFeedback = screen.getByText('Ouch !');
    expect(hitFeedback).toBeInTheDocument();
  });

  it('should not render the HitFeedback component when isMoleHit is false', () => {
    render(
      <GameTemplate
        molesData={mockMolesData}
        isMoleHit={false}
        onHitMole={mockOnHitMole}
        scoreValue={100}
        timeLeftInSeconds={60}
      />,
    );

    const hitFeedback = screen.queryByText('Ouch !');
    expect(hitFeedback).not.toBeInTheDocument();
  });

  it('should pass the correct props to MetricPanel components', () => {
    render(
      <GameTemplate
        molesData={mockMolesData}
        isMoleHit={false}
        onHitMole={mockOnHitMole}
        scoreValue={150}
        timeLeftInSeconds={30}
      />,
    );

    const scorePanel = screen.getByText('Score');
    const scoreValue = screen.getByText('150');
    expect(scorePanel).toBeInTheDocument();
    expect(scoreValue).toBeInTheDocument();

    const timePanel = screen.getByText('Time left');
    const timeValue = screen.getByText('30');
    expect(timePanel).toBeInTheDocument();
    expect(timeValue).toBeInTheDocument();
  });

  it('should pass the correct props to the MolesGrid component', () => {
    render(
      <GameTemplate
        molesData={mockMolesData}
        isMoleHit={false}
        onHitMole={mockOnHitMole}
        scoreValue={100}
        timeLeftInSeconds={60}
      />,
    );

    // Ensure correct data are passed by checking the number of mole holes is the same as in the data.
    const moleImages = screen.getAllByRole('img');
    expect(moleImages).toHaveLength(mockMolesData.length);
  });

  it('should apply the hammer cursor style to the game container', () => {
    const { container } = render(
      <GameTemplate
        molesData={mockMolesData}
        isMoleHit={false}
        onHitMole={mockOnHitMole}
        scoreValue={100}
        timeLeftInSeconds={60}
      />,
    );

    const gameContainer = container.firstChild;

    expect(gameContainer?.firstChild).toHaveStyle(
      `cursor: url(/src/assets/hammer-cursor-128x100.png) 35 65, pointer`,
    );
  });
});
