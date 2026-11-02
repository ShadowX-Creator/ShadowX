"use strict";

const fs = require("node:fs");
const path = require("node:path");

const bridgePath = module.paths
  .map(base => path.join(base, "whatsapp-rust-bridge", "dist", "index.js"))
  .find(fs.existsSync);

if (!bridgePath) {
  throw new Error("ShadowX: whatsapp-rust-bridge tidak ditemukan");
}

module.exports = require(bridgePath);
