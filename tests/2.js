const items = JSON.parse('["0x31", "0x30", "0x30", "0x30", "0x30", "0x2e", "0x30", "0x30"]');

var output = []
for (var x in items){
    output[x] = items[x];
}
console.log(output)
