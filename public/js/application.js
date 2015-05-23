function Breathe() {
    this.isInhale = true;
    this.startTime = Date.now();
    this.endTime = null;
}

Breathe.prototype.length = function () {
    var diff = this.endTime - this.startTime;
    return diff / 1000;
};

var Meditation = function (limit) {
    this.allBreathe = [];
    this.breathLimit = limit;

};

// Meditation.prototype.setBreathes = function (limit) {
//     this.breathLimit = limit;
// };

Meditation.prototype.average = function () {
    var sum = 0;
    for (i = 0; i < this.allBreathe.length; i++) {
        sum += this.allBreathe[i].length();
    }
    return (sum / this.allBreathe.length).toFixed(2);
};

Meditation.prototype.sort = function (index) {
    return _.sortBy(this.allBreathe, function (element) {
        return element.length();
    })[index].length().toFixed(2);
};

// Meditation.prototype.longest_breath = function() {
//   return _.sortBy(this.allBreathe, function(element) {
//     return element.length();
//   })[this.allBreathe.length-1].length();




Meditation.prototype.loop = function (intervalId) {
    if (this.allBreathe.length >= 1) {
        document.getElementById("score").innerHTML = "Last Breath: " + String(this.allBreathe[this.allBreathe.length - 1].length().toFixed(2));
        document.getElementById("avg").innerHTML = "Average Breath: " + this.average();
        document.getElementById("max").innerHTML = "Longest Breath: " + this.sort(this.allBreathe.length - 1);
        document.getElementById("min").innerHTML = "Shortest Breath: " + this.sort(0);
        // }else if (this.allBreathe.length === 0){
        //   // document.getElementById("score").innerHTML = "Press the space bar when you are ready to inhale";
        // }else{
        //   document.getElementById("score").innerHTML = "Press the space bar when you are ready to exhale";
    }

    if (this.allBreathe.length === this.breathLimit) {
        clearInterval(intervalId);
        document.getElementById("score").innerHTML = String(this.breathLimit) + " breathes. That is all the breathing for today, grasshopper.";
    }


};


function displayScore(breath) {
    if (allBreathe.length > 1) {

        return String(breath.length());
    }
}


$(document).ready(function () {
  $('body').toggleClass('login');
  $('#get_breathe').on('submit', function(event) {

    event.preventDefault();
    $("#myForm input").blur();
    strLimit = $("#myForm input[name=numLimit]").val();
    // $('#display').css('display', 'block');
    $('body').toggleClass('login');
    $('#display').fadeIn(3000);
    $('#get_breathe').fadeOut(2000);
    meditation = new Meditation(parseInt(strLimit));


    var myVar = setInterval(function () {
        meditation.loop(myVar);
    }, 100);
    var newBreath = null;
    Mousetrap.bind('space', function () {
        if (newBreath) {
            oldBreath = newBreath;
            oldBreath.endTime = Date.now();
            if (meditation.allBreathe.length % 2 === 0) {
                oldBreath.isInhale = false;
            }
            meditation.allBreathe.push(oldBreath);
        } else {
            document.getElementById("score").innerHTML = "Press the space bar when you are ready to inhale";
        }

        newBreath = new Breathe();
        $('#display').toggleClass('hover');


    });

  });
});
