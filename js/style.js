var styles = ['primary', 'secondary-1', 'secondary-2'];
var mainSectionEl = document.getElementById('colorBlocks');

function buildColorBlocks(styleArr) {

  for (var style in styleArr) {
    var colorBlockEl = document.createElement('section');
    for (var i = 0; i < 5; i++) {
      var colorEl = document.createElement('section');
      var className = 'rgba-' + styleArr[style] + '-' + i;
      colorEl.className = className;
      colorEl.className += ' color-block';
      colorEl.style.color = 'rgba(255, 255, 255, 1)';
      colorBlockEl.appendChild(colorEl);
    }

    mainSectionEl.appendChild(colorBlockEl);
  }
}

//I'm trying to pull the value of the background color and then insert
//into the 'textContent' property. But it is not working.

function updateTextContent() {
  var blocksToUpdate = document.getElementsByClassName('color-block');

  for (var block in blocksToUpdate) {
    var currentEl = blocksToUpdate[block];
    currentEl.textContent = currentEl.classList[0];
  }
}

buildColorBlocks(styles);
updateTextContent();
