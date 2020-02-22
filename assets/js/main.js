var request = new XMLHttpRequest();
var endpoint = 'https://grpmcollections.org/admin/service.php/simple/images?q=set:becuriousegypt&pretty=1'; //source of the data being used
request.open('GET', endpoint, true);

request.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(this.responseText); //store the JSON in a variable called data

    var result = [];
    for (var x in data) {
      result.push([x, data[x]]); //take each JSON object and push it into to an array, so each object is now within an array element
    }

    function shuffleArray(array) { //function to randomize array elements so new objects are rendered on each tab open
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }

    shuffleArray(result); //calling the randomizer on our result array

    for (var i = 0; i < result.length; i++) { //removing {'ok': true} object from the array
      if (result[i][0] === 'ok') {
        result.splice(i, 1);
        i--; //decrement the index variable so it does not skip the next item in the array, will take care of all instances
      }
    }

    for (var i = 0; i < result.length; i++) {
      if ((result[i][1].object_name === undefined) || (result[i][1].entity_name === undefined) || (result[i][1].media_large_url === undefined) || (result[i][1].date === undefined)) {
        result.splice(i, 1);
        i--; //decrement the index variable so it does not skip the next item in the array, will take care of all instances
      }
    }

    console.log(result); //track array at final stage before being rendered

    var index = 0; //0 is the first element in the array, since the array is random, different objects are 0

    //the following 6 lines ensure an object is loaded when a new tab is opened
    document.getElementById('object_name').innerHTML = result[index][1].object_name;
    document.getElementById('object_name').setAttribute('href', 'https://grpmcollections.org/Detail/objects/' + result[index][1].object_id);
    document.getElementById('entity_name').innerHTML = result[index][1].entity_name;
    document.getElementById('date').innerHTML = result[index][1].date;
    var IMG_SRC = result[index][1].media_large_url;
    document.body.style.backgroundImage = 'url(' + IMG_SRC + ')';

    //click event for the refresh button which loads the function newObject()
    document.getElementById('refresh').addEventListener('click', newObject);

    //this function increments through the array on each click of the refresh button
    function newObject() {
      index += 1;
      document.getElementById('object_name').innerHTML = result[index][1].object_name;
      document.getElementById('object_name').setAttribute('href', 'https://grpmcollections.org/Detail/objects/' + result[index][1].object_id);
      document.getElementById('entity_name').innerHTML = result[index][1].entity_name;
      document.getElementById('date').innerHTML = result[index][1].date;
      var IMG_SRC = result[index][1].media_large_url;
      document.body.style.backgroundImage = 'url(' + IMG_SRC + ')';

      //this if statement ensures that you can keep incrementing through the array endlessly
      if (index === (result.length - 1)) {
        index = 0 - 1;
      }

    }

  }

};

request.send();
