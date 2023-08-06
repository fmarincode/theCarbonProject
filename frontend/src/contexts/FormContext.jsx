import React, { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const FormContext = createContext(null);

export function FormProvider({ children }) {
  const [formUserValues, setFormUserValues] = useState(null);
  const contextValue = useMemo(
    () => ({ formUserValues, setFormUserValues }),
    [formUserValues, setFormUserValues]
  );

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
}

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormContext;
