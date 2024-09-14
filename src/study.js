import "./study.css"

const box = document.createElement("div")
box.classList.add("full")
document.body.append(box)

for(let i = 1; i <= 4; i++) {
    for(let j = 1; j <= 4; j++) {
        const Num = document.createElement("div")
        Num.classList.add("number")
        Num.id = `li${i}col${j}`
        box.append(Num)
    }
}

const scores = document.createElement("div")
scores.classList.add("scores")
document.body.append(scores)

const bestScores = document.createElement("div")
bestScores.classList.add("bestScores")
document.body.append(bestScores)

const newgame = document.createElement("div")
newgame.classList.add("newgame")
newgame.textContent = "新游戏"
document.body.append(newgame)


console.log(11)


var grade = [	[0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0]	];

var gradeant = [	[0,0,0,0],
					[0,0,0,0],
					[0,0,0,0],
					[0,0,0,0]	];
let mod = 0
let pos = 0
let nextnumber = 0 
let sum = 0
let presum = 0
let maxSum = -1
let posicao = 0
//随机摇数（2/4）
function sorteianum(){
	nextnumber = Math.floor(Math.random()*3) + 2;//随机获得 2，3，4
	if(nextnumber==3) {
		return sorteianum();
		} else {
		return
		}
	}
//随机摇位置（行列皆为0-3）
function sorteiapos(){
	posicao = Math.floor(Math.random()*16);//0-15
	mod = Math.floor(posicao/4);//0-3
	pos = posicao % 4;//0-3
	if(grade[mod][pos]!=0){
		return sorteiapos();
		} else {
            return
        }
}
//将值写入矩阵中
function insertion(){
	sorteiapos();
	sorteianum();
	grade[mod][pos]=nextnumber
	gradeant[mod][pos]=nextnumber;
}
//创建新元素
function exibegrade(){
	for(let i = 0; i < 4; i++){
		for(let j = 0; j < 4; j++){
			 //创建新元素
             let aimElement=`li${i + 1}col${j + 1}`;
             const Element = document.getElementById(aimElement)
             Element.innerHTML = grade[i][j];
             //新元素上色
             let color = null
             switch(grade[i][j]) {
                 case 2:
                     color = '#EEE4DA'
                     break;
                 case 4:
                     color = '#EDE0C8'
                     break;
                 case 8:
                     color = '#F2B179'
                     break;
                 case 16:
                     color = '#F59563'
                     break;
                 case 32:
                     color = '#F67C5F'
                     break;
                 case 64:
                     color = '#F65E3B'
                     break;
                 case 128:
                     color = '#EDCF72'
                     break;
                 case 256:
                     color = '#EDCC61'
                     break;
                 case 512:
                     color = '#EDC850'
                     break;
                 case 1024:
                     color = '#EDC53F'
                     break;
                 case 2048:
                     color = '#EBC12D'
                     break;    
             }
             Element.style.backgroundColor = color

             //新元素动画
             if(i == mod && j == pos) {
                Element.style.transform = 'scale(0, 0)'
                setTimeout(() => {
                    Element.style.transition = '.1s'
                    Element.style.transform = 'scale(1, 1)'
                },100)
                setTimeout(() => {
                    Element.style.transition = '0s'
                },200)
             }
             
         
		}
	}
}
//跳跃动画
function jump(i, j) {

    let aimElement = `li${i + 1}col${j + 1}`;
    const Element = document.getElementById(aimElement)
    Element.style.transform = 'scale(1.2, 1.2)'
    Element.style.transition = '.1s'
    setTimeout(() => {
        Element.style.transform = 'scale(1, 1)'
    },100)
    setTimeout(() => {
        Element.style.transition = '0s'
    },200)
}
//分数统计
function Scores(sum) {
    if(presum == sum)return
    presum = sum
    const scoresElement = document.querySelector(".scores")
    scoresElement.innerHTML = `${sum}`

    scoresElement.style.fontSize = '60px'
    setTimeout(() => {
        scoresElement.style.fontSize = '50px'
    },100)

    if(sum > maxSum) {
        maxSum = sum
        const scoresElement = document.querySelector(".bestScores")
        scoresElement.innerHTML = `${maxSum}`

        scoresElement.style.fontSize = '60px'
        setTimeout(() => {
            scoresElement.style.fontSize = '50px'
        },100)
    }

}
// 方向按键
function buttonselect(e){
	let Key = e.keyCode;
    switch(Key){
		case 65:
			left()
			break;
        case 37:
            left()
            break;

		case 87:
			up()
			break;
        case 38:
            up()
            break;

		case 68:
			right()
			break;
        case 39:
            right()
            break;

		case 83:
			down()
			break;
        case 40:
            down()
            break;
	}
}
function left(){
	for(let i = 0; i < 4; i++) {
        //将方向边界为空的行移依将方块次动至边界
		for(let j = 0; j < 3; j++) {
            for(let k = 0; k < 3; k++) {
                if(grade[i][k] == 0) {
                    for(let o = k; o < 3; o++)grade[i][o] = grade[i][o + 1]
                    grade[i][3] = 0
                }
            }
		}
        //合并
        for(let j = 0; j < 3; j++) {
            if(grade[i][j] == grade[i][j + 1] && grade[i][j] !== 0) {
                grade[i][j] *= 2
                jump(i,j)
                sum += grade[i][j]
                for(let k = j + 1; k < 3; k++)grade[i][k] = grade[i][k + 1]
                grade[i][3] = 0
                if(j == 0 && grade[i][1] == grade[i][2] && grade[i][1] !== 0) {
                    grade[i][1] *= 2
                    jump(i,1)
                    sum += grade[i][j]
                    grade[i][2] = 0
                }
            }
        }
	}
	next()
}

function up(){
	for(let j = 0; j < 4; j++){
        //将方向边界为空的行移依将方块次动至边界
		for(let i = 0; i < 3; i++) {
            for(let k = 0; k < 3; k++) {
                if(grade[k][j] == 0) {
                    for(let o = k; o < 3; o++)grade[o][j] = grade[o + 1][j]
                    grade[3][j] = 0
                }
            }
		}
        //合并
        for(let i = 0; i < 3; i++) {
            if(grade[i][j] == grade[i + 1][j] && grade[i][j] !== 0) {
                grade[i][j] *= 2
                jump(i,j)
                sum += grade[i][j]
                for(let k = i + 1; k < 3; k++)grade[k][j] = grade[k + 1][j]
                grade[3][j] = 0
                if(i == 0 && grade[1][j] == grade[2][j] && grade[1][j] !== 0) {
                    grade[1][j] *= 2
                    jump(1,j)
                    sum += grade[i][j]
                    grade[2][j] = 0
                }
            }
        }
    }
	next();
}

function right(){
	for(let i = 0; i < 4; i++){
        //将方向边界为空的行移依将方块次动至边界
		for(let j = 0; j < 3; j++) {
            for(let k = 3; k >= 0; k--) {
                if(grade[i][k] == 0) {
                    for(let o = k; o > 0; o--)grade[i][o] = grade[i][o - 1]
                    grade[i][0] = 0
                }
            }
		}
         //合并
         for(let j = 3; j > 0; j--) {
            if(grade[i][j] == grade[i][j - 1] && grade[i][j] !== 0) {
                grade[i][j] *= 2
                jump(i,j)
                sum += grade[i][j]
                for(let k = j - 1; k > 0; k--)grade[i][k] = grade[i][k - 1]
                grade[i][0] = 0
                if(j == 3 && grade[i][2] == grade[i][1] && grade[i][2] !== 0) {
                    grade[i][2] *= 2
                    jump(i,2)
                    sum += grade[i][j]
                    grade[i][1] = 0
                }
            }
        }

	}
	next()
}

function down(){
	for(let j = 0; j < 4; j++){
        //将方向边界为空的行移依将方块次动至边界
		for(let i = 0; i < 3; i++) {
            for(let k = 3; k >= 0; k--) {
                if(grade[k][j] == 0) {
                    for(let o = k; o > 0; o--)grade[o][j] = grade[o - 1][j]
                    grade[0][j] = 0
                }
            }
		}

        //合并
        for(let i = 3; i > 0; i--) {
            if(grade[i][j] == grade[i - 1][j] && grade[i][j] !== 0) {
                grade[i][j] *= 2
                jump(i,j)
                sum += grade[i][j]
                for(let k = i - 1; k > 0; k--)grade[k][j] = grade[k - 1][j]
                grade[0][j] = 0
                if(i == 3 && grade[2][j] == grade[1][j] && grade[2][j] !== 0) {
                    grade[2][j] *= 2
                    jump(2,j)
                    sum += grade[i][j]
                    grade[1][j] = 0
                }
            }
        }
	}
	next()
}
//向网格空出添加新的方块
function play(){
	insertion()
	exibegrade()
    Scores(sum)
}
function next(){
	let flag = 0
    let over1 = 1
    let over2 = 1
	for (let i = 0; i < 4; i++) {
		for(let j = 0; j < 4; j++){
            //与上一次方块做比较
			if(grade[i][j]!=gradeant[i][j]){
				gradeant[i][j]=grade[i][j];
				flag = 1;
			}
            //是否还存在空方块&&都与相邻不同
            if(grade[i][j] == 0)over2 = 0
            if(j < 3 && grade[i][j] == grade[i][j + 1])over1 = 0
            if(i < 3 && grade[i][j] == grade[i + 1][j])over1 = 0
		}
	}
	if(flag == 0){
        if(over1 == 1 && over2 == 1)alert("结束")
        return
	} else{
        play()
	}
}
//重新开始
const newGame = document.querySelector(".newgame")
newGame.onclick = function() {
   grade.forEach((arr) => arr.fill(0))
   gradeant.forEach((arr) => arr.fill(0))
   sum = 0
   play()
}


play();
document.onkeydown = buttonselect;