<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title>Triangle Information</title>
  <meta name="description" content="The HTML5 Herald">

  <link rel="stylesheet" href="css/styles.css?v=1.0">

</head>

<body>
  <h3>Purpose:</h3> Provides information about a triangle given the lengths of three sides
  <h3>Inputs:</h3>
  <div class="inputContainer">
    <label for="sideA">Side a length:</label>
    <input id="sideA" type="number"/>
  </div>
  <div class="inputContainer">
    <label for="sideB">Side b length:</label>
    <input id="sideB" type="number" />
  </div>
  <div class="inputContainer">
    <label for="sideC">Side c length:</label>
    <input id="sideC" type="number"/>
  </div>
  <div>
    <p id="output"></p>
    <div id="angles">
    </div>
    <canvas id="triangle" width="500" height="500">
    </canvas>
  </div>
  <script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
  <script src="js/scripts.js"></script>

</body>
</html>