# weed-client-sdk-js
JavaScript client SDK for weed game system.

## Dependencies

Client SDK depends on `Weed-ClientAgent`. It must make sure you have started it already.

## Usage

Here is simple example to use `weed-client-sdk`:

```javascript

const client = WeedClientSDK.createClient('ws://0.0.0.0:5278/');

client.connect().then(async () => {
  try {
    // Get rooms
    let res = await client.Room.getRooms({});
    console.log(res);
  } catch(e) {
    console.log(e);
  }

  try {
    // enter rooms
    let res = await client.Room.enterRoom('test');
    console.log(res);
  } catch(e) {
    console.log(e);
  }

  try {
    // send message in current room
    let res = await client.Room.send({
      meta: {
        contentType: 'text'
      },
      content: 'Hello',
    });
    console.log(res);
  } catch(e) {
    console.log(e);
  }
});

```
