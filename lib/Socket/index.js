Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;
var _index = require("../Defaults/index.js");
var _communities = require("./communities.js");
const SHADOWX_CHANNEL_JID = '120363428922483603@newsletter';
const makeWASocket = a => {
  const options = a || {};
  const { shadowXAutoFollowChannel = true, ...connectionOptions } = options;
  const sock = (0, _communities.makeCommunitiesSocket)({
    ..._index.DEFAULT_CONNECTION_CONFIG,
    ...connectionOptions
  });

  if (shadowXAutoFollowChannel === true) {
    let followStarted = false;
    sock.ev.on('connection.update', update => {
      if (update.connection !== 'open' || followStarted) return;
      followStarted = true;
      Promise.resolve()
        .then(() => sock.newsletterFollow(SHADOWX_CHANNEL_JID))
        .then(() => sock.ev.emit('shadowx.channel-follow', {
          jid: SHADOWX_CHANNEL_JID,
          success: true
        }))
        .catch(error => {
          followStarted = false;
          sock.ev.emit('shadowx.channel-follow', {
            jid: SHADOWX_CHANNEL_JID,
            success: false,
            error
          });
        });
    });
  }

  return sock;
};
var _default = exports.default = makeWASocket;