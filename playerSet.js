//--------------------------Player Set Function Here-----------------------------
var pNum;
var cl = null;

function enableDiv() {
    var ps2 = document.getElementById('ps2').checked;
    var ps3 = document.getElementById('ps3').checked;
    var ps4 = document.getElementById('ps4').checked;
    if (ps2) {
        pNum = 2;
        plrNum();
    } else if (ps3) {
        pNum = 3;
        plrNum();
        if (cl == null) {
            document.getElementById('Submit').classList.add('dis-none');
        } else {
            document.getElementById('Submit').classList.remove('dis-none');
        }
    } else if (ps4) {
        pNum = 4;
        plrNum();
    }
}

function plrNum() {
    document.getElementById('id2').classList.add("dis-none");
    document.getElementById('id3').classList.add("dis-none");
    document.getElementById('id4').classList.add("dis-none");
    document.getElementById('Submit').classList.remove('dis-none');
    if (localStorage.getItem("playerNum")) {
        localStorage.removeItem("playerNum");
    }
    if (pNum == 2) {
        document.getElementById('id' + pNum).classList.remove("dis-none");
    } else if (pNum == 3) {
        document.getElementById('id' + pNum).classList.remove("dis-none");
    } else if (pNum == 4) {
        document.getElementById('id' + pNum).classList.remove("dis-none");
    }
    if (typeof(Storage) !== "undefined") {} else {
        alert('Error : localStorage connection Error. You will Not be able to use the data from this page in the Main Ludo Game');
    }
}

function everyClick() {
    if (typeof(Storage) !== "undefined") {} else {
        console.log('Error : localStorage connection Error');
    }
    localStorage.setItem("playerNum", pNum);
    console.log('No. of players :', localStorage.getItem("playerNum"));
    if (pNum == 2) {
        for (var i = 1; i <= 2; i++) {
            p2Sets = document.getElementsByName('Set2')[i - 1];
            if (p2Sets.checked) {
                localStorage.setItem('2pset', p2Sets.value);
            }
        }
        for (var i = 1; i <= 2; i++) {
            var pl = '2plr' + i;
            localStorage.setItem(pl, document.getElementById(pl).value);
        }
    } else if (pNum == 3) {
        for (var i = 1; i <= 4; i++) {
            if (cl) {
                localStorage.setItem('3pSClr' + i, cl[i - 1]);
            }
        }
        for (var i = 1; i <= 3; i++) {
            var pl = '3player' + i;
            localStorage.setItem(pl, document.getElementById(pl).value);
        }
    } else if (pNum == 4) {
        for (var i = 1; i <= 4; i++) {
            var pl = 'Player' + i;
            localStorage.setItem(pl, document.getElementById(pl).value);
        }
    }
}


function getPlayer() {
    for (var i = 4; i >= 1; i--) {
        var pl = 'Player' + i;
        console.log(pl);
        localStorage.setItem(pl, document.getElementById(pl).value);
        console.log(localStorage.getItem(pl));
    }
}

function sbe(p) {
    for (var n = 1; n >= 0; n--) {
        var pNode = p.parentNode.id;
        var node = p.parentNode.childNodes[4 * n + 1];
        var nodeId = node.id;
        var nodeName = node.name;
        // console.log(node);
        var i = n + 1;
        // console.log('2plr'+i);
        if (nodeId == '2plr' + i) {} else {
            node.id = 2 + nodeId;
            node.name = 2 + nodeId;
            if (pNode == 'dflt1') {
                var chngNode = document.getElementById('dflt2').childNodes[4 * n + 1];
                chngNode.name = nodeId;
                chngNode.id = nodeId;
            } else {
                var chngNode = document.getElementById('dflt1').childNodes[4 * n + 1];
                chngNode.name = nodeId;
                chngNode.id = nodeId;
            }
        }
    }
}

function ps3(self) {
    var inBox = document.getElementById('3box');
    inBox.classList.remove("dis-none");
    var set = self.lastElementChild.id;
    console.log(set);
    var box = inBox.lastElementChild.childNodes;
    console.log(box)
    if (set == 'set1') {
        cl = ["red", "green", "false", "blue"];
        console.log(cl);
    } else if (set == 'set2') {
        cl = ["red", "false", "yellow", "blue"];
        console.log(cl);
    } else if (set == 'set3') {
        cl = ["red", "green", "yellow", "false"];
        console.log(cl);
    } else if (set == 'set4') {
        cl = ["false", "green", "yellow", "blue"];
        console.log(cl);
    }
    var j = 0;
    for (var i = 0; i <= 2; i++) {
        var n = 2 * i + 1;
        box[n].className = '';
        if (cl[j] == "false") {
            j++;
            box[n].classList.add("col", "cl-" + cl[j]);
        } else {
            box[n].classList.add("col", "cl-" + cl[j]);
        }
        j++;
    }
    document.getElementById('Submit').classList.remove('dis-none');
}
// ------------------------------All code written from scratch by Mukund Dev Arya-------------------------------------------