import styled from 'styled-components';

interface ButtonProps {
  color: 'lightgray' | 'darkgray' | 'red' | 'yellowgreen' | 'blue';
  padding: 'big' | 'small';
}

export const Button = styled.button<ButtonProps>`
  /* Base styles */

  padding: 8px;
  border-radius: 4px;
  color: #353535;
  font-weight: bold;
  transition: background-color 0.3s ease;
  cursor: pointer;

  /* Variants */

  ${(props) => props.padding === 'big' && 'padding: 8px;'}
  ${(props) => props.padding === 'small' && 'padding: 2px;'}

  ${(props) => props.color === 'lightgray' && 'background-color: #e4e3e3;'}

  ${(props) => props.color === 'red' && 'background-color: #ffb3b3;'}

  ${(props) => props.color === 'yellowgreen' && 'background-color: #9acd32;'}

  ${(props) => props.color === 'blue' && 'background-color: #cbcbf7;'}

  ${(props) => props.color === 'darkgray' && 'background-color: #cacaca;'}

  /* Hover effect */
  &:hover {
    opacity: 0.5; /* Замените на желаемый цвет при наведении */
  }
`;
