// ──────────────────────────────────────────────
// ✨ Fake Minecraft Ping Server by Tidsrejsen ✨
// ──────────────────────────────────────────────

const net = require("net");

const SERVER_PORT = 25565;
const MOTD = "§6Tidsrejsen MC er online ✨"; 
const VERSION_NAME = "1.8.8";
const PROTOCOL_VERSION = 47;
const PLAYERS_ONLINE = 1;
const MAX_PLAYERS = 250;

const createPingResponse = () => {
  const response = JSON.stringify({
    version: { name: VERSION_NAME, protocol: PROTOCOL_VERSION },
    players: { max: MAX_PLAYERS, online: PLAYERS_ONLINE },
    description: { text: MOTD },
  });

  const responseData = Buffer.from(response);
  const length = responseData.length;

  const packet = Buffer.concat([
    Buffer.from([0x00]),
    Buffer.from([length]),
    responseData,
  ]);

  const fullPacket = Buffer.concat([
    Buffer.from([packet.length + 2]),
    Buffer.from([0x00]),
    packet,
  ]);

  return fullPacket;
};

const server = net.createServer((socket) => {
  socket.on("data", () => {
    socket.write(createPingResponse());
    socket.end();
  });
});

server.listen(SERVER_PORT, () => {
  console.log(`🟢 Fake Minecraft-server kører på port ${SERVER_PORT}`);
});
