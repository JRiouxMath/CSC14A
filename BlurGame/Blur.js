window.onload = init;

function showAnswer(eventObj)
{
    var image= eventObj.target;
    image.src = image.id + ".jpg";
}

function init()
{
    var images = document.getElementsByTagName("img");
    for (var i = 0; i < images.length; i++)
    {
        images[i].onclick = showAnswer;
    }
}
