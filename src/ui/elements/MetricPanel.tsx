import React from 'react';
import { COLOR_BLACK, COLOR_WHITE } from '../../styles/colors';

type MerticPanelProps = {
  /** The label defining the value */
  label: string;

  /** The value to display */
  value: number;

  /** The CSS color of the label*/
  labelColor?: string;

  /** The CSS color of the numeric value */
  valueColor?: string;
};

/**
 * Display a numeric value to the user (score, time, etc)
 */
function MetricPanel({
  label,
  value,
  labelColor = COLOR_BLACK,
  valueColor = COLOR_BLACK,
}: MerticPanelProps): React.JSX.Element {
  const textBorderStyles = {
    textShadow: `
    -1px -1px 0 ${COLOR_WHITE},
     1px -1px 0 ${COLOR_WHITE},
    -1px  1px 0 ${COLOR_WHITE},
     1px  1px 0 ${COLOR_WHITE}`,
  };

  return (
    <div
      style={{
        fontFamily: 'DynaPuff, serif',
        fontWeight: 600,
        fontSize: '3rem',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          color: labelColor,
          ...textBorderStyles,
        }}
      >
        {label}
      </div>
      <div
        style={{
          color: valueColor,
          ...textBorderStyles,
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default MetricPanel;
