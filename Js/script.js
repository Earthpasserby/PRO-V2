var myText = document.getElementById("textArea");
var result = document.getElementById("result");
var limit = 500;

result.textContent = 0 + "/" + limit;

myText.addEventListener("input", function () {
  var textLength = myText.value.length;
  result.textContent = textLength + "/" + limit;

  if (textLength > limit) {
    myText.style.borderColor = "#ff2851";
    result.style.color = "#ff2851";
  } else {
    myText.style.borderColor = "#08121D";
    result.style.color = "#08121D";
  }
});
