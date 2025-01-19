import React from 'react';

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

/** Display a numeric value to the user (score, time, etc) */
function MetricPanel({
  label,
  value,
  labelColor = '#000000',
  valueColor = '#000000',
}: MerticPanelProps): React.JSX.Element {
  const textBorderStyles = {
    textShadow: `
    -1px -1px 0 #FFFFFF,
     1px -1px 0 #FFFFFF,
    -1px  1px 0 #FFFFFF,
     1px  1px 0 #FFFFFF`,
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
