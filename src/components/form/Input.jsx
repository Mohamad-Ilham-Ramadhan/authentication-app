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
      minHeight: 48,
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
  ...props
}) {
  const styles = useStyles();
  const [value, setValue] = useState("");
  function handleChange(e) {
    setValue(e.target.value);
  }
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
        onChange={handleChange}
        inputComponent={component}
        startAdornment={
          icon ? <InputAdornment position="start">{icon}</InputAdornment> : null
        }
        {...props}
      />
    </FormControl>
  );
}
