document.querySelector(".control-buttons").onclick = function() {

    let yourName = prompt("whats your name?");

    if (yourName === "" || yourName === null ) {
        document.querySelector(".name span").innerHTML = 'Unknown'
    } else {
        document.querySelector(".name span").innerHTML = yourName
    }

    document.querySelector(".control-buttons").remove();

    document.getElementById("Start").play();

    [...document.querySelectorAll(".memory-game-blocks .face")].forEach(e => {
        e.style.backfaceVisibility = "visible" ;
        setTimeout(function(){
            e.style.backfaceVisibility = "hidden" ;
        },duration + 1000)
    })
    countdown (300)
}

let duration = 1000;
let successTries = 0;

let blockContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blockContainer.children)

// let orderRang = [...Array(blocks.length).keys()];
let orderRang = Array.from(Array(blocks.length).keys());

shuffle(orderRang)


// add order css property 
blocks.forEach((block, index) => {

    // add css order property 
    block.style.order = orderRang[index];

    // add click event 
    block.addEventListener('click', function () {

        // trigger the flip block function 
        flipBlock(block);
    });
});

// flip block function 
function flipBlock(selectedBlock) {
    selectedBlock.classList.add("is-flipped");

    // collect all flipped block
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    // if there is Two selected blocks 
    if (allFlippedBlocks.length === 2) {

        // console.log('2 block selcted');

        // stop clicking funtion
        stopClicking();

        // check matched block function
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]) 
    };


};

    // stop clicking funtion
function stopClicking() {

    // add class no clicking on main Continer
    blockContainer.classList.add("no-clicking");

    setTimeout(() => {

        // remove class no clicking after the duration 
    blockContainer.classList.remove("no-clicking");

        
    }, duration);
}

    // check matched block function
function checkMatchedBlocks(firstBlock, secendBlock) {

    let triesElement = document.querySelector(".tries span");

    if (firstBlock.dataset.imgs === secendBlock.dataset.imgs) {

        firstBlock.classList.remove("is-flipped");
        secendBlock.classList.remove("is-flipped");

        firstBlock.classList.add("has-match");
        secendBlock.classList.add("has-match");

        document.getElementById("success").play()

        successTries++
        console.log(successTries);
        if (successTries === 10){
            whenWon("Bravo Ya zmily!",);
        }
    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) +1 ;

        setTimeout(() => {

            // remove class no clicking after the duration 
            firstBlock.classList.remove("is-flipped");
            secendBlock.classList.remove("is-flipped");
            
        }, duration);
        document.getElementById("fail").play()

    };
};
// shuffle function
function shuffle(array){

    // setting vars
    let current = array.length, // 20
    temp,
    random;

    while (current > 0) { // 
        // get random Number 
        random = Math.floor(Math.random() * current);

        //decrease length by One
        current--;

        //[1] save current element in stash
        temp = array[current];

        //[2] current element = random element

        array[current] = array[random]

        //[3] random element = get element from stash
        array[random] = temp;
    };
};

// timers

    let countDownElement = document.querySelector(".timer");
    function countdown (duration) {

            let minutes, seconds;
            countDownInterval = setInterval(function () {
                minutes = parseInt(duration / 60);
                seconds = parseInt(duration % 60);
    
                minutes = minutes < 10 ? `0${minutes}`: minutes;
                seconds = seconds < 10 ? `0${seconds}`: seconds;
                countDownElement.innerHTML = `${minutes}:${seconds}`;
    
                if (--duration < 0) {
                    clearInterval(countDownInterval);
                    whenWon("Time Out")
                }
            },1000);
    };
    


function whenWon(msg){
    let popup = document.createElement("div");
    popup.appendChild(document.createTextNode(msg));
    popup.style.cssText ="font-size: 45px;font-weight: bold;line-height: 8;color: white;text-align: center;"
    let timeout = document.createElement("button");
    timeout.appendChild(document.createTextNode("Play Again"));
    popup.classList.add("control-buttons")
    timeout.className = "time-out";

    popup.appendChild(timeout);
    document.body.appendChild(popup);
    timeout.addEventListener('click', function () {
        window.location.reload();
    })
}



// current Array [1,2,3,4,5,7,8,9,0]
// new Array [1,2,3,4,5,7,8,9,0]

/**
 * [1] save current element in stash
 * [2] current element = random element
 * [3] random element = get element from stash
 */