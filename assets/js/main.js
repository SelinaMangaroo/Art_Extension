async function FETCH_DATA() {
  try {

    const response = await fetch('https://grpmcollections.org/admin/service.php/simple/images?q=set:becuriousegypt&pretty=1');
    const data = await response.json();

    document.getElementById('object_name').innerHTML = data[168877].object_name;

    document.getElementById('entity_name').innerHTML = data[168877].entity_name;

    document.getElementById('date').innerHTML = data[168877].date;

    var image = new Image();
    image.src = data[168877].media_large_url;
    document.getElementById('main').appendChild(image).setAttribute('class', 'contain');

    // i is each json object
    for (var i in data) {
      console.log(i + '---' + data[i].object_name + '---' + data[i].entity_name + '---' + data[i].date);
    }

    /*
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        document.getElementById("demo").innerHTML = myObj.name;
      }
    };
    xmlhttp.open("GET", "json_demo.txt", true);
    xmlhttp.send();
    */

    console.log(data);

  } catch (err) {
    console.error(err);
  }
}

FETCH_DATA();
