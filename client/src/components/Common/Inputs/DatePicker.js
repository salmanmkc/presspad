import React from 'react';
import { DatePicker as AntdDatePicker } from 'antd';
import Icon from '../Icon';
import * as S from './style';
import * as T from '../Typography';
import InfoSection from './InfoSection';

const format = 'DD/MM/YYYY';
const placeholder = 'DD/MM/YYYY';
const renderIcon = (
  <Icon icon="calendar" width="16px" height="16px" color="blue" />
);

const DatePicker = ({
  children,
  ml,
  mr,
  mt,
  mb,
  customFormat,
  customPlaceholder,
  style,
  width,
  error,
  onChange,
  type,
  multi,
  index,
  value,
  handleDelete,
  handleAdd,
  arrayLength,
  extraInfo,
  label,
  ...props
}) => {
  if (type === 'dateRange') {
    return (
      <>
        <S.DateRangeWrapper mt={mt} mb={mb} ml={ml} mr={mr} error={!!error}>
          <>
            <AntdDatePicker
              format={customFormat || format}
              placeholder={customPlaceholder || placeholder}
              type="date"
              suffixIcon={renderIcon}
              onChange={e => onChange(e, 'startDate', index)}
              value={value && value.startDate}
              {...props}
            />
          </>
          <T.H7C color="pink" mr={4} ml={4}>
            until
          </T.H7C>
          <>
            <AntdDatePicker
              format={customFormat || format}
              placeholder={customPlaceholder || placeholder}
              type="date"
              suffixIcon={renderIcon}
              onChange={e => onChange(e, 'endDate', index)}
              value={value && value.endDate}
              {...props}
            >
              {children}
            </AntdDatePicker>
          </>
          {multi && (
            <S.CrossBtn
              show
              onClick={() => arrayLength > 1 && handleDelete(index)}
            >
              <Icon icon="cross" width="20px" height="20px" color="darkGray" />
              <S.CrossLabel>Remove</S.CrossLabel>
            </S.CrossBtn>
          )}
        </S.DateRangeWrapper>
        {multi && (
          <S.AddBtn
            color="pink"
            onClick={handleAdd}
            show={arrayLength && index === arrayLength - 1}
          >
            + Add more
          </S.AddBtn>
        )}
        {error && <S.Error>{error}</S.Error>}
        {extraInfo && <InfoSection text={extraInfo} />}
      </>
    );
  }

  return (
    <S.DatePickerWrapper mt={mt} mb={mb} ml={ml} mr={mr} error={!!error}>
      {label && (
        <T.PBold as="label" color="primary" ml={2}>
          {label}
        </T.PBold>
      )}
      <AntdDatePicker
        format={customFormat || format}
        placeholder={customPlaceholder || placeholder}
        type="date"
        suffixIcon={renderIcon}
        onChange={onChange}
        value={value}
        {...props}
      >
        {children}
      </AntdDatePicker>
      {error && <S.Error>{error}</S.Error>}
      {extraInfo && <InfoSection text={extraInfo} />}
    </S.DatePickerWrapper>
  );
};

export default DatePicker;
