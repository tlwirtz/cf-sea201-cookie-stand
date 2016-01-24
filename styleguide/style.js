var styles = ['primary', 'secondary-1', 'secondary-2', 'complement'];
var mainSectionEl = document.getElementById('colorBlocks');

function buildColorBlocks(styleArr) {

  for (var style in styleArr) {
    var colorBlockEl = document.createElement('section');
    for (var i = 0; i < 5; i++) {
      var colorEl = document.createElement('section');
      var className = 'rgba-' + styleArr[style] + '-' + i;
      colorEl.className = className;
      colorEl.textContent = className;
      colorBlockEl.appendChild(colorEl);
    }

    mainSectionEl.appendChild(colorBlockEl);
  }
}

buildColorBlocks(styles);
