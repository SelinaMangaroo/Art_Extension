async function FETCH_USERS() {
  try {
    const response = await fetch('https://picsum.photos/id/0/info');
    const data =  await response.json();

    document.getElementById('creator').innerHTML = data.author;
    //document.getElementById('picture').innerHTML = data.download_url;

    var image = new Image();
    image.src = data.download_url;
    document.getElementById('picture').appendChild(image).setAttribute('class', 'contain');

    document.getElementById('partner').innerHTML = data.width;
    document.getElementById('credits').innerHTML = data.height;

    //document.getElementById('download').innerHTML = data.download_url;

    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

FETCH_USERS();
