import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiInputBase-root": {
      borderRadius: 8,
    },
    "& .Mui-focused": {
      "& fieldset": {
        borderColor: `${theme.palette.primary.main} !important`,
      },
    },
    "& fieldset": {
      borderColor: theme.palette.neutral.gray,
    },
    "& svg": {
      color: theme.palette.neutral.gray,
    },
  },
}));

export default function Input({
  type,
  placeholder,
  icon,
  id,
  label,
  component,
  className,
  value,
  onChange,
  ...props
}) {
  const styles = useStyles();
  return (
    <FormControl
      fullWidth
      className={clsx(styles.root, className)}
      variant="outlined"
    >
      {label && <label htmlFor={id}>{label}</label>}
      <OutlinedInput
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        inputComponent={component}
        startAdornment={
          icon ? <InputAdornment position="start">{icon}</InputAdornment> : null
        }
        {...props}
      />
    </FormControl>
  );
}
