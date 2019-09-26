const ItemMap = {
    draw: (item) => { 
        let image = new Image(item.height, item.width);
        image.src = item.image;
        ctx.drawImage(image, item.x-(item.width/2), item.y-(item.width/2));
     },
    // pickup: (item, user) => { 
    //     if (item.type == 'key') {
    //         user.keys[item.id] = item;
    //     } else if (item.type == 'hat') {
    //         if (!user.hat) {
    //             user.hat = item;
    //         } else {
    //             user.inventory[item.id] = item;
    //         }
    //     }
    //     delete room.contents[item.id];
    //     moving = false;
    //     socket.emit('itempickup', {room: room, character: user, item: item});
    //  },
    drop: (item, user) => { },
    bounce: (item) => { 
        for (key in room.contents) {
            if (room.contents[key] != item) {
                let current = room.contents[key];
                if (current.x > item.x) {
                    item.x -= 5;
                }
                if (current.x < item.x) {
                    item.x += 5;
                }
                if (current.y > item.y) {
                    item.y -= 5;
                }
                if (current.y < item.y) {
                    item.y += 5;
                }
                socket.emit('itemaction', { room: room });
            }
        }
     },
     getCheck: (item) => {
        for (player in players) {
            let current = players[player];
            if ((Math.abs(item.x - current.x) < 70) && (Math.abs(item.y - current.y) < 70)) {
                ItemMap.pickup(item, user);
            }
        }
     },
}

function itemCheck() {
    if (room.contents) {
        for (item in room.contents) {
            current = room.contents[item];
            // ItemMap.getCheck(current);
            // ItemMap.bounce(current);
            ItemMap.draw(current);
        }
    }
    // updatePackage.room.data = room;
    // updatePackage.room.sent = false;
    // updatePackage.sent = false;
}