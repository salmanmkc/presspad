import React from "react";
import Input from "./Input";
import Select from "./Select";
import DatePicker from "./DatePicker";
import File from "./File";
import YesNoRadio from "./YesNoRadio";
import Checkist from "./Checkist";
import DateRanges from "./DateRanges";

import { Label, RequiredSpan, GrayHint } from "../ProfileComponents.style";

export default function Field({
  type,
  label: _label,
  placeholder,
  value: _value,
  handleChange,
  handleError,
  error: _error,
  name,
  options,
  fullHeight,
  parent,
  hint,
  userId,
  isPrivate,
  requiredForIntern,
  requiredForHost,
  role,
  internLabel,
  hostLabel,
  // date Range
  disabledStartDate,
  disabledEndDate,
  onEndChange,
  onStartChange,
  handleAddMoreRanges,
  deleteDate,
  availableDates,
}) {
  let url;

  const value = parent ? _value && _value[name] : _value;
  const error = parent ? _error && _error[name] : _error;

  if (type === "file") {
    url = _value && _value.url;
  }

  let isRequiredForThisUser = false;
  if (
    (role === "intern" && requiredForIntern) ||
    (role === "host" && requiredForHost)
  ) {
    isRequiredForThisUser = true;
  }

  let label = _label;
  if (role === "intern") {
    label = internLabel || _label;
  }
  if (role === "host") {
    label = hostLabel || _label;
  }

  return (
    <>
      <Label
        htmlFor={
          parent ? `${parent}${name[0].toUpperCase()}${name.slice(1)}` : name
        }
      >
        {label}
        {isRequiredForThisUser && <RequiredSpan>(required)</RequiredSpan>}
      </Label>
      {hint && <GrayHint>{hint}</GrayHint>}

      {type === "text" && (
        <Input
          placeholder={placeholder}
          value={value}
          handleChange={handleChange}
          error={error}
          name={name}
          parent={parent}
          fullHeight={fullHeight}
        />
      )}

      {type === "textArea" && (
        <Input
          placeholder={placeholder}
          value={value}
          handleChange={handleChange}
          error={error}
          name={name}
          parent={parent}
          showAsTextArea
          fullHeight={fullHeight}
        />
      )}

      {type === "select" && (
        <Select
          placeholder={placeholder}
          value={value}
          handleChange={handleChange}
          error={error}
          name={name}
          parent={parent}
          options={options}
        />
      )}

      {type === "date" && (
        <DatePicker
          placeholder={placeholder}
          value={value}
          handleChange={handleChange}
          error={error}
          name={name}
          parent={parent}
        />
      )}

      {type === "file" && (
        <File
          placeholder={placeholder}
          value={value}
          handleChange={handleChange}
          error={error}
          name={name}
          parent={parent}
          handleError={handleError}
          userId={userId}
          isPrivate={isPrivate}
          url={url}
        />
      )}

      {type === "yesNo" && (
        <YesNoRadio
          value={value}
          handleChange={handleChange}
          error={error}
          name={name}
          parent={parent}
          handleError={handleError}
        />
      )}

      {type === "dateRanges" && (
        <DateRanges
          disabledStartDate={disabledStartDate}
          disabledEndDate={disabledEndDate}
          onEndChange={onEndChange}
          onStartChange={onStartChange}
          handleAddMoreRanges={handleAddMoreRanges}
          deleteDate={deleteDate}
          availableDates={availableDates}
          error={error}
        />
      )}

      {type === "checklist" && (
        <Checkist
          value={value}
          handleChange={handleChange}
          error={error}
          name={name}
          parent={parent}
          handleError={handleError}
          options={options}
        />
      )}
    </>
  );
}
