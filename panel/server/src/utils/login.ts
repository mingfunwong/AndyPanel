const requireLogged = (request: any) => {
  if (!request.userId) throw Error("access denied");
};

export { requireLogged };