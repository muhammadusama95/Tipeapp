import React, { createContext } from "react";

export var AuthContext = createContext({
  user: { uid: null },
});

export var StripeConnectConfirmContext = createContext({
  is_verified: false,
});

export var StripeWaiterConnectConfirmContext = createContext({
  is_verified: false,
});

export var StripeReturnContext = createContext({
  returned: false,
});
