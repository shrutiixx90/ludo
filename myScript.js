var myMusic = document.getElementById('music');
// -----------------------------Setting up the game------------------------------
var playerNum;
var plName = [];
var plrClr = [];
var plrNum = 0;
var p2Set;
getData();

function getData() {
    if (typeof(Storage) !== "undefined") {
        playerNum = localStorage.getItem("playerNum");
        console.log('No. of players :', playerNum);
        if (playerNum) {
            if (playerNum == 4) {
                plrClr = ['red', 'green', 'yellow', 'blue'];
                for (var i = 1; i <= 4; i++) {
                    var pl = 'Player' + i;
                    plName[i - 1] = localStorage.getItem(pl);
                }
            } else if (playerNum == 3) {
                for (var i = 1; i <= 4; i++) {
                    plrClr[i - 1] = localStorage.getItem('3pSClr' + i);
                }
                for (var i = 1; i <= 3; i++) {
                    plName[i - 1] = localStorage.getItem('3player' + i);
                }
            } else if (playerNum == 2) {
                p2Set = localStorage.getItem('2pset');
                // console.log(p2Set);
                if (p2Set == "rNy") {
                    plrClr = ['red', "false", 'yellow', "false"];
                } else if (p2Set == "gNb") {
                    plrClr = ["false", 'green', "false", 'blue'];
                    plrNum = 1;
                }
                for (var i = 1; i <= 2; i++) {
                    plName[i - 1] = localStorage.getItem('2plr' + i);
                }
            } else if (playerNum == null) {
                alert('man');
            }
            console.log(plrClr);
            console.log(plName);
        } else {
            alert('page');
        }
    } else {
        alert('Error : localStorage connection Error. You will Not be able to use the data from this page in the Main Ludo Game');
    }
}
// ----------------------------------------------------------------------------
var uniqueDice;

function activePlayer() {
    for (var i = 3; i >= 0; i--) {
        if (plrClr[i] == 'false') {
            if (i == plrNum) {
                plrNum++;
            }
        } else {
            document.getElementById(plrClr[i] + 'box').classList.remove('activePlayer');
        }
        if (plrNum > 3) {
            plrNum = 0;
        }
    }
    document.getElementById(plrClr[plrNum] + 'box').classList.add('activePlayer');
    for (var i = 1; i <= 4; i++) {
        var pieceFunc = document.getElementById(plrClr[plrNum] + 'G' + i);
        if (pieceFunc) {
            pieceFunc.value = plrClr[plrNum];
        }
    }
    document.getElementById('ROLL').disabled = false;
    document.getElementById('container').classList.value = "";
    document.getElementById('container').classList.value = "row m-0 cl-" + plrClr[plrNum];
    uniqueDice = 0;
}

function once() {
    for (var j = 1; j <= 4; j++) {
        if (plrClr[j - 1] == "false") {
            j++;
        }
        for (var i = 1; i <= 4; i++) {
            var pieceFunc = document.getElementById(plrClr[j - 1] + 'G' + i);
            if (pieceFunc) {
                pieceFunc.total = Number(pieceFunc.getAttribute('totalMoved'));
            }
        }
    }
    var j = 0;
    for (var i = 0; i < plName.length; i++) {
        if (plrClr[j] == "false") {
            j++;
        }
        var nameTag = document.createElement("p");
        nameTag.innerHTML = plName[i];
        nameTag.classList.add(plrClr[j] + "-plr-name", "plr-name");
        var row = document.createElement("div");
        row.classList.add("row");
        row.appendChild(nameTag);
        // console.log(nameTag,row,document.getElementById("plr"))
        document.getElementById("plr").appendChild(row);
        // console.log(plName[i])
        j++;
    }


    // for mobile view

    
    var j = 0;
    for (var i = 0; i < plName.length; i++) {
        if (plrClr[j] == "false") {
            j++;
        }
        var nameTag = document.createElement("p");
        nameTag.innerHTML = plName[i];
        nameTag.classList.add(plrClr[j] + "-plr-name", "plr-name");
        var row = document.createElement("div");
        row.classList.add("row");
        row.appendChild(nameTag);
        // console.log(nameTag,row,document.getElementById("plr"))
        document.getElementById("plr1").appendChild(row);
        // console.log(plName[i])
        j++;
    }
    activePlayer();
}
// --------------------Rolling a DICE and its probability here-------------------
var diceNum = 0;

function rollBtn() {
    if (document.getElementById('new').childNodes.length > 2) {
        diceNum = Math.floor(Math.random() * 6) + 1;
    } else {
        var dice = Math.floor(Math.random() * 300) + 1;
        if (dice > 200) {
            diceNum = 6;
            uniqueDice++;
        } else if (dice > 160) {
            diceNum = 5;
        } else if (dice > 120) {
            diceNum = 4;
        } else if (dice > 80) {
            diceNum = 3;
        } else if (dice > 40) {
            diceNum = 2;
        } else {
            diceNum = 1;
        }
    }
    var diceSrc = 'assets/img/d-' + diceNum + '.png';
    document.getElementById('dice').src = diceSrc;
    if (uniqueDice == 0) {
        var qwert = canNotMove();
    }
    if (qwert == true) {
        if (document.getElementById('new').childNodes.length == 1) {
            for (var i = 1; i <= 4; i++) {
                var pieceFunc = document.getElementById(plrClr[plrNum] + 'G' + i);
                pieceFunc.value = false;
            }
            plrNum++;
            activePlayer();
        }
    } else {
        if (diceNum == 6) {
            makeBtn();
        } else {
            document.getElementById('ROLL').disabled = 'true';
            makeBtn();
        }
    }
}

function gameEnd() {
    document.getElementById('container').classList.value = "";
    document.getElementById('container').classList.value = "dis-none";
    document.getElementById('result').classList.value = 'container';
    for (var i = 0; i < playerRank.length; i++) {
        var tag = document.createElement('p');
        tag.innerHTML = 'Winner No. ' + Number(i + 1) + ' is ' + playerRank[i];
        tag.classList.value = "col";
        tag.style = "text-align:center"
        man = document.createElement('div');
        man.classList.value = "row " + playerRank[i];
        man.appendChild(tag);
        document.getElementById('result').appendChild(man);
        // console.log(i,tag,man);
    }
}

function canNotMove() {
    var j = 1;
    for (var i = 1; i <= 4; i++) {
        if (document.getElementById(plrClr[plrNum] + 'G' + i)) {
            var pieceFunc = document.getElementById(plrClr[plrNum] + 'G' + i).parentElement.id;
            if (pieceFunc == plrClr[plrNum] + '-' + i) {
                j++;
            }
        }
    }
    if (j == 5) {
        return true;
    } else {
        return false;
    }
}
var allBtnId = 0;
var diceAllNum = [];

function makeBtn() {
    diceAllNum.push(diceNum);
    var allBtn = document.createElement('label');
    allBtn.innerHTML = diceNum;
    allBtn.classList.value = 'btn-info btn-outline-light btn newBtn';
    allBtn.for = 'allBtn' + ++allBtnId;
    var tag = document.createElement("input");
    tag.type = 'radio';
    tag.value = diceNum;
    tag.name = 'allBtn';
    tag.checked = "true";
    tag.id = 'allBtn' + allBtnId;
    tag.classList.value = 'dis-none';
    var att = document.createAttribute('onclick');
    att.value = 'getDiceNum(this)';
    tag.setAttributeNode(att);
    var element = document.getElementById("new");
    allBtn.appendChild(tag);
    element.appendChild(allBtn);
    getDiceNum(tag);
}
// -------------------------------------------------------------
var curDiceBtn;
var currentDiceNum = 0;

function getDiceNum(as) {
    parents = as.parentElement.parentElement.childNodes;
    for (var i = parents.length - 1; i >= 1; i--) {
        parents[i].classList.remove('visited');
    }
    if (as.checked) {
        as.parentElement.classList.add('visited');
    }
    currentDiceNum = Number(as.value);
    curDiceBtn = as.parentElement;
}
var playerRank = [];
var timeTaken = 350;

function move(a, parId) {
    var moveTo = Number(parId);
    console.log(moveTo);
    if (typeof moveTo == "number") {
        console.log('here for move', a.total + currentDiceNum);
        moveToId = a.total + currentDiceNum;
        if (moveToId > 57) {
            alert("you can't move " + currentDiceNum + " numbers forward");
        } else {
            for (var i = currentDiceNum; i >= 1; i--) {
                var j = i;
                setTimeout(function(y) {
                    a.total++;
                    if (a.total > 56) {
                        document.getElementById(plrClr[plrNum] + 'Home').appendChild(a);
                        a.classList.value = 'h-img';
                        if (document.getElementById(plrClr[plrNum] + 'Home').childNodes.length == 4) {
                            playerRank.push(plrClr[plrNum]);
                            for (var i = 1; i < document.getElementById("new").childNodes.length; i++) {
                                document.getElementById("new").childNodes[i].remove();
                            }
                            plrClr[plrNum] = false;
                            nextPlayer();
                        } else {
                            document.getElementById('ROLL').disabled = false;
                            currentDiceNum = false;
                            return true;
                        }
                    } else if (a.total > 51) {
                        is = a.total - 51;
                        document.getElementById(plrClr[plrNum] + is).appendChild(a);
                    } else {
                        moveTo++;
                        if (moveTo == 53) {
                            moveTo = 1;
                        }
                        document.getElementById(moveTo).appendChild(a);
                        // myMusic.play();
                    }
                }, j *= 200, j);
            }
            curDiceBtn.remove();
        }
    }
    if (j) {
        timeTaken = j * currentDiceNum;
        timeTaken += j;
    } else {
        timeTaken = 200;
    }
}
var myMusic = document.getElementById('music');

function Move(a) {
    var parId = a.parentElement.id;
    var returned;
    var dir;
    console.log(typeof parId, 'function started');
    if (a.value) {
        console.log('checked value');
        for (var i = 1; i < a.parentElement.childNodes.length; i++) {
            a.parentElement.childNodes[i].state = false;
        }
        if (currentDiceNum == 6) {
            console.log('checked currentDiceNum');
            if (parId == plrClr[plrNum] + '-1' || parId == plrClr[plrNum] + '-2' || parId == plrClr[plrNum] + '-3' || parId == plrClr[plrNum] + '-4') {
                console.log(parId, 'jvb');
                document.getElementById(parId).lastElementChild.classList.remove("gitti");
                document.getElementById(parId).lastElementChild.classList.add("d-img");
                document.getElementById(1 + (13 * plrNum)).appendChild(a);
                curDiceBtn.remove();
                if (document.getElementById('ROLL').disabled == false) {
                    dir = true;
                }
            } else {
                returned = move(a, parId);
                if (document.getElementById('ROLL').disabled == false) {
                    dir = true;
                }
            }
        } else if (currentDiceNum == false) {
            alert('Click the Roll Button First');
            return;
        } else {
            if (parId == plrClr[plrNum] + '-1' || parId == plrClr[plrNum] + '-2' || parId == plrClr[plrNum] + '-3' || parId == plrClr[plrNum] + '-4') {
                console.log("you can't move the your piece to the starting track with the dice number", currentDiceNum);
                return;
            } else {
                returned = move(a, parId);
            }
        }
        for (var i = 1; i < document.getElementById('new').childNodes.length; i++) {
            // console.log(document.getElementById('new').childNodes[i]);
            document.getElementById('new').childNodes[i].classList.add("disabled");
            document.getElementById('new').childNodes[i].lastElementChild.disabled = true;
        }
        document.getElementById('ROLL').disabled = true;
        setTimeout(function(y) {
            currentDiceNum = false;
            var num = 1;
            if (a.parentElement.childNodes.length > 2) {
                if (a.parentElement.childNodes[1].value) {
                    for (var i = 1; i < a.parentElement.childNodes.length; i++) {
                        a.parentElement.childNodes[i].state = "solid";
                    }
                } else {
                    var curId = a.parentElement.id;
                    var one = 1;
                    for (var i = 0; i < 3; i++) {
                        if (curId == 1 + i * 13 || curId == 9 + i * 13) {
                            console.log('you are safe');
                            one = false;
                        }
                    }
                    if (one) {
                        a.parentElement.childNodes[1].classList.add("gitti");
                        a.parentElement.childNodes[1].classList.remove("d-img");
                        var firstChild = a.parentElement.childNodes[1];
                        document.getElementById(firstChild.getAttribute('color') + '-' + firstChild.getAttribute('Unique')).appendChild(firstChild);
                        document.getElementById('ROLL').disabled = false;
                        for (var i = 1; i < document.getElementById('new').childNodes.length; i++) {
                            document.getElementById('new').childNodes[i].classList.remove("disabled");
                            document.getElementById('new').childNodes[i].lastElementChild.disabled = false;
                        }
                        return;
                    }
                }
            }
            if (dir) {
                document.getElementById('ROLL').disabled = false;
            }
            if (returned) {
                return;
            }
            if (diceNum == 6) {} else {
                if (document.getElementById('new').childNodes.length == 1) {
                    nextPlayer();
                }
            }
            for (var i = 1; i < document.getElementById('new').childNodes.length; i++) {
                document.getElementById('new').childNodes[i].classList.remove("disabled");
                document.getElementById('new').childNodes[i].lastElementChild.disabled = false;
            }
        }, timeTaken);
        // events(returned,a);
    } else {
        alert('its not your turn');
    }
}

function events(returned, a) {}

function nextPlayer() {
    var win = 0;
    for (var i = 1; i <= 4; i++) {
        var pieceFunc = document.getElementById(plrClr[plrNum] + 'G' + i);
        if (pieceFunc) {
            pieceFunc.value = false;
        } else {
            win++;
            console.log(win)
            if (win == 3) {
                gameEnd();
            }
        }
    }
    plrNum++;
    activePlayer();
}


// ----------------------------------------- All code written from scratch by Mukund Dev Arya-------------------------------