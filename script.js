const cards = [
  { n: "0", symbol: "☀", name: "愚人", keys: "新的开始 · 信任直觉 · 自由", text: "别急着看清每一步。你正站在一个适合尝试的起点，带着好奇心向前，比完美的计划更重要。" },
  { n: "I", symbol: "✦", name: "魔术师", keys: "行动力 · 专注 · 创造", text: "你已经拥有开始所需的资源。把分散的念头收拢，选定一件事，用清晰的行动让它发生。" },
  { n: "II", symbol: "☾", name: "女祭司", keys: "直觉 · 观察 · 内在答案", text: "此刻不必急于回应。安静下来，你会从细微的感受和未说出口的信息里，找到真正的答案。" },
  { n: "VI", symbol: "♡", name: "恋人", keys: "选择 · 连结 · 真诚", text: "重要的不是讨好所有人，而是让选择与你的价值一致。真诚的沟通会带来更深的连结。" },
  { n: "VIII", symbol: "♌", name: "力量", keys: "温柔 · 勇气 · 内在稳定", text: "你不需要用力证明什么。用耐心照顾自己的情绪，也用柔软而坚定的方式面对眼前的挑战。" },
  { n: "XVII", symbol: "✧", name: "星星", keys: "希望 · 疗愈 · 指引", text: "经历过的不安正在沉淀为力量。留一点空间给希望，微小但持续的投入会照亮下一段路。" },
  { n: "XIX", symbol: "☀", name: "太阳", keys: "喜悦 · 清晰 · 生命力", text: "让自己走到光里。分享你的热情、接受善意，并相信事情正朝着更明朗的方向展开。" }
];
const againButton = document.querySelector("#againButton");
const result = document.querySelector("#result");
const hint = document.querySelector("#drawHint");
const spread = document.querySelector("#spread");
let shuffledCards = [];

function createSpread() {
  shuffledCards = [...cards].sort(() => Math.random() - 0.5);
  spread.innerHTML = "";
  [-31, -21, -11, 0, 11, 21, 31].forEach((angle, index) => {
    const choice = document.createElement("button");
    choice.className = "tarot-choice";
    choice.type = "button";
    choice.setAttribute("aria-label", `选择第 ${index + 1} 张塔罗牌`);
    choice.style.transform = `translateX(-50%) rotate(${angle}deg)`;
    choice.style.left = `${50 + angle * 1.18}%`;
    choice.innerHTML = '<span class="card-back"><span class="moon">☾</span><span class="card-back-title">TAROT</span></span>';
    choice.addEventListener("click", () => drawCard(shuffledCards[index]));
    spread.appendChild(choice);
  });
}

function drawCard(selectedCard) {
  document.body.classList.add("drawing");
  [...spread.querySelectorAll("button")].forEach((card) => card.disabled = true);
  setTimeout(() => {
    const card = selectedCard;
    const reversed = Math.random() < 0.32;
    document.querySelector("#cardNumber").textContent = card.n;
    document.querySelector("#cardSymbol").textContent = card.symbol;
    document.querySelector("#cardNameOnCard").textContent = card.name;
    document.querySelector("#orientation").textContent = reversed ? "逆位 · 需要留意" : "正位 · 今日指引";
    document.querySelector("#cardName").textContent = card.name;
    document.querySelector("#keywords").textContent = reversed ? "停下来校准 · 释放阻力 · 回到内心" : card.keys;
    document.querySelector("#meaning").textContent = reversed ? `当${card.name}以逆位出现，提醒你先放慢一点。${card.text}` : card.text;
    document.querySelector("#cardFace").style.transform = reversed ? "rotate(180deg)" : "none";
    spread.style.display = "none";
    hint.style.display = "none";
    result.classList.remove("is-hidden");
    document.body.classList.remove("drawing");
  }, 950);
}
function reset() { result.classList.add("is-hidden"); spread.style.display = "block"; hint.style.display = "block"; createSpread(); }
againButton.addEventListener("click", reset);
createSpread();
