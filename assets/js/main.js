var request = new XMLHttpRequest();
var endpoint = 'https://grpmcollections.org/admin/service.php/simple/images?q=set:becuriousegypt&pretty=1';
request.open('GET', endpoint, true);

request.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(this.responseText);

    var result = [];
    for (var i in data) {
      result.push([i, data[i]]);
    }

    console.log(result);
    var index = 0;

    document.getElementById('object_name').innerHTML = result[index][1].object_name;
    document.getElementById('entity_name').innerHTML = result[index][1].entity_name;
    document.getElementById('date').innerHTML = result[index][1].date;
    var IMG_SRC = result[index][1].media_large_url;
    document.body.style.backgroundImage = 'url(' + IMG_SRC + ')';

    document.getElementById('refresh').addEventListener('click', newObject);

    function newObject() {
      index += 1;
      document.getElementById('object_name').innerHTML = result[index][1].object_name;
      document.getElementById('entity_name').innerHTML = result[index][1].entity_name;
      document.getElementById('date').innerHTML = result[index][1].date;
      var IMG_SRC = result[index][1].media_large_url;
      document.body.style.backgroundImage = 'url(' + IMG_SRC + ')';

      if (index === (result.length - 1)) {
        index = 0 - 1;
      }

    }

  }

};

request.send();
