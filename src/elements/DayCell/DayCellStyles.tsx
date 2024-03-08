import styled from 'styled-components';

export const DayCellStyles = styled.div<{ isCurrentMonth: boolean; isDate: boolean }>`
  position: relative;
  padding: ${({ isDate }) => (isDate ? '16px 16px 96px 16px;' : '16px')};
  height: ${({ isDate }) => (isDate ? '120px' : '0')};
  background-color: ${({ isCurrentMonth }) => (isCurrentMonth ? 'lightgray' : '#e4e3e3')};
  color: ${({ isCurrentMonth }) => (isCurrentMonth ? '#000' : 'gray')};
  cursor: ${({ isDate }) => (isDate ? 'pointer' : 'auto')};
  min-height: max-content;
  & > p {
    position: absolute;
    top: 0px;
    left: 8px;
  }
`;
