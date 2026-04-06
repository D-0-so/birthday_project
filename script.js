// DOM элементүүд
const panels = {
    flower: document.getElementById('flowerPanel'),
    choice: document.getElementById('choicePanel'),
    message: document.getElementById('messagePanel'),
    thanks: document.getElementById('thanksPanel'),
    cake: document.getElementById('cakePanel'),
    star: document.getElementById('starPanel'),
    final: document.getElementById('finalPanel')
};

const flowerCanvas = document.getElementById('flowerCanvas');
const ctx = flowerCanvas.getContext('2d');
const flowerNextBtn = document.getElementById('flowerNextBtn');
const btnMsg1 = document.getElementById('btnMsg1');
const btnMsg2 = document.getElementById('btnMsg2');
const messageContentDiv = document.getElementById('messageContent');
const msgNextBtn = document.getElementById('msgNextBtn');
const thanksCard = document.getElementById('thanksCard');
const thanksNextBtn = document.getElementById('thanksNextBtn');
const cakeNextBtn = document.getElementById('cakeNextBtn');
const cakeTimerInfo = document.getElementById('cakeTimerInfo');
const starNextBtn = document.getElementById('starNextBtn');

// Дууны объект
const bgAudio = document.getElementById('bgMusic');
let musicStarted = false;
function startMusic() {
    if (!musicStarted && bgAudio) {
        bgAudio.play().catch(e => console.log("Дуу тоглуулахын тулд хэрэглэгч эхлээд дарна уу"));
        musicStarted = true;
    }
}
document.body.addEventListener('click', function once() {
    startMusic();
    document.body.removeEventListener('click', once);
}, { once: true });

// ---------- Захианы агуулга (backtick ашигласан) ----------
const firstMsg = `喔我…..
偷偷地爱上你
却不敢告诉你
因为我知道
我给不到你要的东西
喔我只能偷偷地爱上你
只能偷偷看着你
总是没勇气，总说不出
我真的曾经喜欢过你，真的很抱歉`;

const secondMsg = `처음 누나를 봤을 때, 선생님인 줄 알았어요.
그만큼 누나는 저에게 멀고도 대단한 사람이었어요.
그런데 알고 보니 선생님이 아니라, 제가 가까이에서 바라볼 수 있는 선배 누나였어요. 공부를 싫어하던 저에게 시간을 내어 하나하나 가르쳐 주시고, 자신의 지식을 아낌없이 나눠 주는 모습이 정말 따뜻하고 빛나 보였어요. 그때부터였을까요… 저는 어느 순간부터 누나에게 점점 익숙해졌고, 그 익숙함이 저도 모르게 큰 마음으로 변해 버렸어요. 어느새 공부가 좋아졌고, 학교에 가는 이유가 누나가 되어 버렸어요. 오늘은 혹시 누나를 볼 수 있을까, 그런 기대를 안고 하루를 보내기도 했어요. 하지만 저는 제 마음에만 빠져서, 누나의 마음은 제대로 보지 못했어요. 알면서도 해서는 안 될 말을 하고, 누나에게 상처를 주는 행동을 했어요. 정말… 많이 후회하고 있어요. 직접 찾아가서 사과하고 싶었지만, 누나 앞에 서면 아무 말도 할 수 없을 것 같아서 결국 이렇게밖에 표현하지 못하는 제가 너무 답답했어요. 그래서 이 시간 동안, 제 진심을 조금이라도 전하고 싶어서 몇 달 동안 코드를 쓰며 이 마음을 담았어요. 지난번 일에 대해 진심으로 사과하고 싶어요. 누나의 소중한 시간을 아프게 만든 것, 그리고 상처 준 모든 순간들… 정말 미안해요. 비록 늦었지만, 이 마음만큼은 진짜라는 걸 알아줬으면 좋겠어요.`;

const thanksMsg = 내가 아는 사람들 중에서 가장 멋지고 노력하는 너에게, 이 세상에 태어나 이렇게 특별한 사람이 되어줘서 고마워. 생일 진심으로 축하해!;

function showPanel(panelId) {
    Object.keys(panels).forEach(key => panels[key].classList.add('hidden'));
    panels[panelId].classList.remove('hidden');
}

// ---------- Цэцэг анимейшн ----------
let bloomProgress = 0;
let animFrame = null;

function drawFlower(progress) {
    const w = flowerCanvas.width, h = flowerCanvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#b0d96b';
    ctx.fillRect(0, h*0.7, w, h*0.3);
    let stemH = 30 + progress * 180;
    ctx.beginPath();
    ctx.moveTo(w/2, h*0.72);
    ctx.lineTo(w/2, h*0.72 - stemH);
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#3c9e2d';
    ctx.stroke();
    if(progress > 0.2) {
        ctx.beginPath();
        ctx.moveTo(w/2-5, h*0.72 - stemH*0.4);
        ctx.quadraticCurveTo(w/2-25, h*0.72 - stemH*0.5, w/2-15, h*0.72 - stemH*0.65);
        ctx.fillStyle = '#5aac44';
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(w/2+5, h*0.72 - stemH*0.55);
        ctx.quadraticCurveTo(w/2+30, h*0.72 - stemH*0.65, w/2+18, h*0.72 - stemH*0.8);
        ctx.fill();
    }
    let bloom = Math.min(1, progress * 1.2);
    let radius = 15 + bloom * 45;
    let cx = w/2, cy = h*0.72 - stemH;
    for(let i=0; i<8; i++) {
        let angle = (i/8)*Math.PI*2;
        let px = cx + Math.cos(angle)*radius*0.8;
        let py = cy + Math.sin(angle)*radius*0.8;
        ctx.beginPath();
        ctx.ellipse(px, py, radius*0.65, radius*0.85, angle, 0, Math.PI*2);
        ctx.fillStyle = hsl(${340 + i*5}, 70%, 65%);
        ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(cx, cy, radius*0.3, 0, Math.PI*2);
    ctx.fillStyle = '#ffdb7e';
    ctx.fill();
    if(progress >= 0.98) {
        ctx.shadowBlur = 15;
        ctx.shadowColor = "gold";
        ctx.beginPath();
        ctx.arc(cx, cy, radius+5, 0, Math.PI*2);
        ctx.fillStyle = "rgba(255,215,0,0.2)";
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

function startFlowerAnimation() {
    bloomProgress = 0;
    function animate() {
        bloomProgress += 0.012;
        if(bloomProgress >= 1) {
            drawFlower(1);
            flowerNextBtn.classList.remove('hidden');
            cancelAnimationFrame(animFrame);
            return;
        }
        drawFlower(bloomProgress);
        animFrame = requestAnimationFrame(animate);
    }
    animate();
}

// ---------- Бялуу + 22 лаа ----------
function drawCake() {
    const cakeCanvas = document.getElementById('cakeCanvas');
    const cctx = cakeCanvas.getContext('2d');
    const w = cakeCanvas.width, h = cakeCanvas.height;
    cctx.clearRect(0,0,w,h);
    cctx.fillStyle = '#f7c56e';
    cctx.fillRect(50, h-100, w-100, 80);
    cctx.fillStyle = '#e6b050';
    cctx.fillRect(55, h-105, w-110, 15);
    cctx.fillStyle = '#fff0c0';
    for(let i=0;i<12;i++){
        cctx.beginPath();
        cctx.ellipse(60+i*35, h-102, 12, 8, 0, 0, Math.PI*2);
        cctx.fill();
    }
    let candleX = w/2 - 30;
    let candleY = h-130;
    cctx.fillStyle = '#ffb6c1';
    cctx.fillRect(candleX, candleY, 18, 45);
    cctx.fillRect(candleX+44, candleY, 18, 45);
    cctx.beginPath();
    cctx.moveTo(candleX+9, candleY-3);
    cctx.lineTo(candleX+9, candleY-12);
    cctx.stroke();
    cctx.beginPath();
    cctx.moveTo(candleX+53, candleY-3);
    cctx.lineTo(candleX+53, candleY-12);
    cctx.stroke();
    cctx.fillStyle = '#ffa500';
    cctx.beginPath();
    cctx.moveTo(candleX+9, candleY-14);
    cctx.quadraticCurveTo(candleX+15, candleY-22, candleX+9, candleY-28);
    cctx.quadraticCurveTo(candleX+3, candleY-22, candleX+9, candleY-14);
    cctx.fill();
    cctx.beginPath();
    cctx.moveTo(candleX+53, candleY-14);
    cctx.quadraticCurveTo(candleX+59, candleY-22, candleX+53, candleY-28);
    cctx.quadraticCurveTo(candleX+47, candleY-22, candleX+53, candleY-14);
    cctx.fill();
    cctx.font = "bold 28px 'Segoe UI'";
    cctx.fillStyle = "#d43f1f";
    cctx.fillText("22", w/2-18, h-85);
}

// ---------- Од харвах ----------
let starTimeout = null;
function startShootingStars() {
    const trail = document.getElementById('starTrail');
    trail.innerHTML = '';
    function addMeteor() {
        const meteor = document.createElement('div');
        meteor.className = 'meteor';
        meteor.style.left = Math.random() * 280 + 20 + 'px';
        meteor.style.top = Math.random() * 180 + 20 + 'px';
        trail.appendChild(meteor);
        setTimeout(() => meteor.remove(), 1100);
    }
    for(let i=0; i<12; i++) {
        setTimeout(addMeteor, i * 200);
    }
    starTimeout = setTimeout(() => {
        starNextBtn.classList.remove('hidden');
    }, 3000);
}

// ---------- Төлөвийн шилжилт ----------
let currentMessage = null;

flowerNextBtn.onclick = () => {
    startMusic();
    showPanel('choice');
};

btnMsg1.onclick = () => {
    startMusic();
    currentMessage = 'first';
    messageContentDiv.innerHTML = <p style="white-space: pre-wrap;">${firstMsg}</p>;
    showPanel('message');
};

btnMsg2.onclick = () => {
    startMusic();
    currentMessage = 'second';
    messageContentDiv.innerHTML = <p style="white-space: pre-wrap;">${secondMsg}</p>;
    showPanel('message');
};
msgNextBtn.onclick = () => {
    startMusic();
    if(currentMessage === 'first') {
        btnMsg1.style.display = 'none';
        btnMsg2.style.display = 'inline-block';
        showPanel('choice');
    } else if(currentMessage === 'second') {
        thanksCard.innerHTML = <p style="white-space: pre-wrap;">${thanksMsg}</p>;
        showPanel('thanks');
    }
};

thanksNextBtn.onclick = () => {
    startMusic();
    showPanel('cake');
    drawCake();
    cakeNextBtn.classList.add('hidden');
    cakeTimerInfo.innerText = '🎂 10 секундын дараа "Цааш" товч гарна...';
    setTimeout(() => {
        cakeNextBtn.classList.remove('hidden');
        cakeTimerInfo.innerText = '✨ Дараа үзэгдэл рүү ороход бэлэн ✨';
    }, 10000);
};

cakeNextBtn.onclick = () => {
    startMusic();
    if(starTimeout) clearTimeout(starTimeout);
    showPanel('star');
    startShootingStars();
};

starNextBtn.onclick = () => {
    startMusic();
    if(starTimeout) clearTimeout(starTimeout);
    showPanel('final');
};

startFlowerAnimation();
