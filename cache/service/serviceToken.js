function serviceToken(tokenInEmail) {
  if (!tokenInEmail) {
    throw new Error(
      "The expiration time to change the password has passed, redo the request."
    );
  }
}

export default serviceToken