const mc = require('minecraft-protocol');

mc.createServer({
  'online-mode': false,
  host: '0.0.0.0',
  port: 25565,
  version: '1.8.8'
})
.on('listening', () => {
  console.log('🟢 Fake Minecraft-server kører på port 25565');
})
.on('packet', (client, meta, packet) => {
  if (meta.name === 'status_request') {
    client.write('status_response', {
      response: JSON.stringify({
        version: { name: "1.8.8", protocol: 47 },
        players: { max: 250, online: 1 },
        description: { text: "§6Tidsrejsen MC er online ✨" }
      })
    });
  }
  if (meta.name === 'ping_start') {
    client.write('ping', { time: packet.time });
  }
});
