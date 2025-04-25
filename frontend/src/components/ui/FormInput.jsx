import ErrorMessage from "./ErrorMessage";
import clsx from "clsx"; 

const FormInput = ({ label, error, id, isValid, ...props }) => {
  const inputClass = clsx("inputBase", {
    inputError: !!error,
    inputValid: isValid && !error,
  });

  return (
    <div className="formGroup">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        {...props}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClass}
      />
      {error && (
        <ErrorMessage id={`${id}-error`}>
          {error}
        </ErrorMessage>
      )}
    </div>
  );
};

export default FormInput;
