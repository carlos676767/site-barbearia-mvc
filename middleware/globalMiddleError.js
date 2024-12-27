"use strict";

export default function middlare(error, req, res, next) {
  return res.status(500).send({ errorMulter: error });
}
