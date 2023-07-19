import React, { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const contextValue = useMemo(
    () => ({ userId, setUserId, firstname, setFirstname }),
    [userId, setUserId, firstname, setFirstname]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContext;
