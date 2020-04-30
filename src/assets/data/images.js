var fs = require('fs');
 
var obj;
fs.readFile('alimentos.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);

  obj.forEach(element => {
    createFile(element.name);
  });
});
// writeFile function with filename, content and callback function

function createFile(name)
{
  fs.writeFile("../img/" + name + '.png', ' ', function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
  }); 
}
