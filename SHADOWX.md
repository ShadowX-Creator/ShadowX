# ShadowX RC13

This distribution is a rebranded package built from the supplied LotusBail RC13 patched JavaScript distribution. The original MIT license is retained.

## Runtime

- Node.js 22, 23, and 24 are declared as supported runtime majors (`>=22 <25`).
- This archive contains compiled JavaScript and declaration files, not the original TypeScript source tree. Rebuilding the upstream TypeScript project is therefore not available from this archive alone.

## WhatsApp Channel auto-follow

The supplied channel is configured as:

- Link: https://whatsapp.com/channel/0029VbDLhQZ9sBI0CQasgl2c
- Newsletter JID: `120363428922483603@newsletter`

Auto-follow is **opt-in** so installing a library does not silently subscribe an account. Enable it when creating the socket:

```js
const sock = makeWASocket({
  auth: state,
  shadowXAutoFollowChannel: true
});

sock.ev.on('shadowx.channel-follow', result => {
  if (result.success) console.log('ShadowX channel followed');
  else console.error('ShadowX channel follow failed:', result.error);
});
```

The library attempts the follow once per successful socket instance after the connection opens. If it fails, the event reports the error; reconnecting may create a new attempt. No promise of guaranteed follow, pairing success, or prevention of WhatsApp logout is made.

## Pairing

The existing `requestPairingCode(phoneNumber, customPairingCode?)` API is retained. Pairing success depends on valid account state, network conditions, WhatsApp-side limits, and protocol compatibility.

## Telegram

This package is a WhatsApp Web library. It does not implement Telegram Bot API functionality. Telegram support requires a separate adapter or Telegram library in the consuming bot project.

## Notes

- Existing compiled library modules and upstream API exports are retained.
- This archive has not been validated against live WhatsApp accounts.
- Use the package in compliance with WhatsApp terms and obtain account-owner consent before linking or subscribing.
