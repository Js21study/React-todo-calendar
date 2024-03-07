import React from 'react';

interface CustomCheckboxProps {
  label: string;
  checked: boolean | undefined;
  onChange: () => void;
  color: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ label, checked, onChange, color }) => {
  return (
    <label style={{ display: 'flex', alignItems: 'center' }}>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ marginRight: '4px' }} />
      <span style={{ color, fontSize: 'small' }}>{label}</span>
    </label>
  );
};

export default CustomCheckbox;
