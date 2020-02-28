var request = new XMLHttpRequest(); //initialize the request
var endpoint = 'https://grpmcollections.org/admin/service.php/simple/images?q=set:becuriousegypt&pretty=1&noCache=1'; //source of the data being used
request.open('GET', endpoint, true);

request.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(this.responseText); //store the JSON in a variable called data

    //console.log(request);

    var result = []; //at this point this is an empty array
    for (var x in data) { //for every JSON object
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

    shuffleArray(result); //calling the randomizer on our result array, so the object will be random on new tab open.

    for (var i = 0; i < result.length; i++) { //removing {'ok': true} object from the array so it will not be rendered
      if (result[i][0] === 'ok') {
        result.splice(i, 1); //remove element
        i--; //decrement the index variable so it does not skip the next item in the array, will take care of all instances
      }
    }

    for (var i = 0; i < result.length; i++) { //removes any objects that have undefined fields from being rendered in array
      if ((result[i][1].object_name === undefined) || (result[i][1].entity_name === undefined) || (result[i][1].media_large_url === undefined) || (result[i][1].date === undefined)) {
        result.splice(i, 1); //remove element
        i--; //decrement the index variable so it does not skip the next item in the array, will take care of all instances
      }
    }

    console.log(result); //track array at final stage before being rendered

    var index = 0; //0 is the first element in the array, since the array is randomized, different objects are going to be rendered

    //the following 7 lines ensure an object is loaded when a new tab is opened
    document.getElementById('object_name').innerHTML = result[index][1].object_name;
    document.getElementById('object_name').setAttribute('href', 'https://grpmcollections.org/Detail/objects/' + result[index][1].object_id); //link takes you to the object detail page
    document.getElementById('entity_name').innerHTML = result[index][1].entity_name;
    document.getElementById('entity_name').setAttribute('href', 'https://grpmcollections.org/Detail/entities/' + result[index][1].entity_id); //link takes you to the entity detail page
    document.getElementById('date').innerHTML = result[index][1].date;
    var IMG_SRC = result[index][1].media_large_url;
    document.body.style.backgroundImage = 'url(' + IMG_SRC + ')';

    //click event for the refresh button which loads the function newObject()
    document.getElementById('refresh').addEventListener('click', newObject);

    //this function increments through the array on each click of the refresh button
    function newObject() {
      index += 1; //index is initially set to 0, so on each click of refresh button, new object will be rendered
      document.getElementById('object_name').innerHTML = result[index][1].object_name;
      document.getElementById('object_name').setAttribute('href', 'https://grpmcollections.org/Detail/objects/' + result[index][1].object_id); //link takes you to the object detail page
      document.getElementById('entity_name').setAttribute('href', 'https://grpmcollections.org/Detail/entities/' + result[index][1].entity_id); //link takes you to the entity detail page
      document.getElementById('entity_name').innerHTML = result[index][1].entity_name;
      document.getElementById('date').innerHTML = result[index][1].date;
      var IMG_SRC = result[index][1].media_large_url;
      document.body.style.backgroundImage = 'url(' + IMG_SRC + ')';

      //this if statement ensures that you can keep incrementing through the array endlessly, so it will keep pulling new objects when refresh button clicked
      if (index === (result.length - 1)) {
        index = 0 - 1;
      }

    }

  }

};

request.send();
