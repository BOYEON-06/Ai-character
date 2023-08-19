// More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // the link to your model provided by Teachable Machine export panel
    const URL = "https://teachablemachine.withgoogle.com/models/rGmGeAHn7/";

    let model, webcam, labelContainer, maxPredictions, div, name_class, bar_class;

    // Load the image model and setup the webcam
    async function init() {
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";

      // load the model and metadata
      // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
      // or files from your local hard drive
      // Note: the pose library adds "tmImage" object to your window (window.tmImage)
      model = await tmImage.load(modelURL, metadataURL);
      maxPredictions = model.getTotalClasses();

      labelContainer = document.getElementById("label-container");
      for (let i = 0; i < 4; i++) { // and class labels
        labelContainer.appendChild(document.createElement('div'));
      }
    }

    // run the webcam image through the image model
    async function predict() {
      // predict can take in an image, video or canvas html element
      var image = document.getElementById("file-image")
      const prediction = await model.predict(image, false);
      prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));

      for (let i = 0; i < 4; i++) {
        barWidth = Math.round(prediction[i].probability.toFixed(2) * 100) + '%';
        // const classPrediction =
        //     prediction[i].className + ": " + prediction[i].probability.toFixed(2) * 100 + "%";
        // labelContainer.childNodes[i].innerHTML = classPrediction;
        var labelTitle
        switch (prediction[i].className) {
          case "kuromi":
            labelTitle = "쿠로미"
            break;

          case " judy":
            labelTitle = "주디"
            break;

          case " ari":
            labelTitle = "아리"
            break;

          case " moomin":
            labelTitle = "무민"
            break;

          case " sawako":
            labelTitle = "사와코"
            break;

          case "mymelody":
            labelTitle = "마이멜로디"
            break;

          case "squirtle":
            labelTitle = "꼬부기"
            break;

          case "maruko":
            labelTitle = "마루코"
            break;

          case "jessi":
            labelTitle = "제시"
            break;

          case " missbarney":
            labelTitle = "미스바니"
            break;

          default:
            labelTitle = "알수없음"
        }
        // $('.result-message').html();
        var predicitonname = prediction[i].className.trim()
        var label =
          "<div class='animal-label d-flex align-items-center'>" +
          labelTitle +
          '</div>';
        var bar =
          "<div class='bar-container position-relative container'><div class='" +
          predicitonname +
          "-box'></div><div class='d-flex justify-content-center align-items-center " +
          predicitonname +
          "-bar' style='width: " +
          barWidth +
          "'><span class='d-block percent-text'>" +
          Math.round(prediction[i].probability.toFixed(2) * 100) +
          '%</span></div></div>';
        labelContainer.childNodes[i].innerHTML = label + bar;
      }
    }