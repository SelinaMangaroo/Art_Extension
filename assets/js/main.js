var request = new XMLHttpRequest(); //initialize the request
var endpoint =
  'https://grpmcollections.org/admin/service.php/simple/images?q=ca_object_representations.mimetype:image/jpeg&pretty=1&limit=1&sort=_random_';
request.open('GET', endpoint, true);

request.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(this.responseText); //store the JSON in a variable called data

    /**
     * @type {Array<JSON>}
     * @description this is an empty array
     */
    var result = [];

    /**
     * @description take JSON object and push it into to an array,
     *  so object is now within an array element
     */
    for (var x in data) {
      result.push([x, data[x]]);
    }

    var index = 0; //0 is the first element in the array

    /**
     * @description removes "undefined" fields from being rendered in array
     */
    if (result[index][1].object_name === undefined) {
      document.getElementById('object_name').innerHTML = ' ';
    }else {
      document.getElementById('object_name').innerHTML = result[index][1].object_name;
      document.getElementById('object_name').setAttribute('href', 'https://grpmcollections.org/Detail/objects/' + result[index][1].object_id); //link takes you to the object detail page
    }

    if (result[index][1].entity_name === undefined) {
      document.getElementById('entity_name').innerHTML = ' ';
    }else {
      document.getElementById('entity_name').innerHTML = result[index][1].entity_name;
      document.getElementById('entity_name').setAttribute('href', 'https://grpmcollections.org/Detail/entities/' + result[index][1].entity_id); //link takes you to the entity detail page
    }

    if (result[index][1].date === undefined) {
      document.getElementById('date').innerHTML = ' ';
    }else {
      document.getElementById('date').innerHTML = result[index][1].date;
    }

    if (result[index][1].media_large_url === undefined) {
      windows.location.reload();
    }else {
      var IMG_SRC = result[index][1].media_large_url;
      document.body.style.backgroundImage = 'url(' + IMG_SRC + ')';
    }

    //console.log(result); //display object in console

    /**
     * @event
     * click event for the refresh button
     */
    document.getElementById('refresh').addEventListener('click', refresh = () => {
      window.location.reload();
    });

  }
};

request.send();
