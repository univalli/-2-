const canvas = document.getElementById('ecgCanvas');
const ctx = canvas.getContext('2d');
const storySection = document.getElementById('storySection');

const introData = [
  '암은 더 이상 노인들의 병이 아닙니다',
  '조용히 찾아오는 불청객, 청년암',
  '커리어를 쌓고 미래를 설계해야할 청년들에게',
  '불쑥 나타나 그들의 삶을 흔들고 있습니다.',
  '더이상 젊음이 암을 지켜주지는 않습니다.'
];

const editorNote = {
  title: '조용한 불청객 청년암, 더 이상 젊음이 암을 지켜주지 않는다',
  paragraphs: [
    '20·30대 청년층 사이에서 암 발생률이 꾸준히 증가하고 있다. 암은 더 이상 중장년층만의 질병이 아니다. 학업과 취업, 사회생활로 가장 치열하게 살아가는 시기에 청년은 \'젊으니까 괜찮다\'는 믿음 속에 몸이 보내는 이상 신호를 지나치고, 병원을 찾는 일조차 뒤로 미룬다.',
    '청년들은 바쁜 일상을 버텨내기 위해 쉼을 포기한다. 과도한 노동과 만성적인 수면 부족, 불규칙한 생활은 어느새 당연한 삶의 방식이 됐다. 건강을 잃으면서까지 버텨야 하는 현실은 개인의 선택이 아니라 청년 세대가 마주한 구조적 문제와 맞닿아 있다.',
    '<대학알리>는 이러한 청년 암의 현실을 조명했다. 실제 청년 암 환자들의 투병기를 따라가며 발병 원인을 다각도로 분석하고, 건강을 위협하면서도 쉬지 못하는 청년들의 삶을 들여다본다.',
    '우리는 왜 몸이 보내는 경고를 무시한 채 살아가고 있을까. 청년 암은 청년들이 살아가는 사회를 비추는 또 하나의 경고일지 모른다.'
  ]
};

const articleData = [
  {
    type: 'heading',
    text: '"암은 노인의 병"이라는 착각... 2030세대를 덮치는 청년암'
  },
  {
    type: 'text',
    text: '보건복지부와 국립암센터가 최근 발표한 \'2023년 국가암등록통계\'에 따르면, 2023년 기준 20~39세 신규 암 발생 환자 수는 총 2만 253명으로 집계됐다. 이는 [[2019년 대비 약 11.6% 증가한 수치]]다. 세부 연령대별로 살펴보면, 20대 암 발생자 수는 2019년 4,334명에서 2023년 5,221명으로 [[20.5% 급증했다]]. 30대 역시 1만 3,809명에서 1만 5,032명으로 [[8.9% 증가했다]].'
  },
  {
    type: 'chart',
    image: './chart-total.png',
    alt: '20대·30대 신규 암 발생자수, 2019~2023'
  },
  {
    type: 'text',
    text: '젊은 환자가 늘고 있는 대표적인 암으로는 [[대장암과 갑상선암]]이 있다. 20~30대 신규 대장암 환자 수는 2019년 957명에서 2023년 1,948명으로 5년 새 [[2배 넘게 급증했다]]. 연령대별 세부 추이를 살펴보면 20대의 대장암 신규 환자수가 더욱 두드러졌다. 20대 대장암 신규 환자는 2019년 158명에서 2023년 334명으로 [[111.4% 급증해 30대 대장암 환자의 증가율을 넘어섰다]].'
  },
  {
    type: 'chart',
    image: './chart-colon.png',
    alt: '20대·30대 신규 대장암 발생자수, 2019~2023'
  },
  {
    type: 'text',
    text: '같은 기간 젊은 암 환자 수 1위를 차지하는 갑상선암 역시 20~30대 신규 발병 환자가 2019년 8,765명에서 2023년 1만 262명으로 [[17.1% 늘어났다]]. 연령대별로는 20대 갑상선암 환자가 2,322명에서 2,928명으로 [[26.1% 증가했으며]], 30대 갑상선암 환자는 6,443명에서 7,334명으로 [[13.8% 증가했다]].'
  },
  {
    type: 'chart',
    image: './chart-thyroid.png',
    alt: '20대·30대 신규 갑상선암 발생자수, 2019~2023'
  },
  {
    type: 'text',
    text: '두 암종 모두 30대보다 20대의 증가율이 더욱 가파른 공통점을 보였으나, 증가 속도 자체는 대장암이 갑상선암을 압도했다. 20~30대 전체를 기준으로 [[대장암 신규 환자 증가율은 갑상선암 증가율보다 약 6.1배 더 빠른 상승세]]를 기록했다.'
  },
  {
    type: 'heading',
    text: '뼈를 뚫는 고통과 반복되는 항암치료'
  },
  {
    type: 'text',
    text: '암으로 인해 환자들을 가장 힘들게 하는 것은 [[신체적 고통]]과 기약없는 [[항암치료]]다. 2020년 림프종 4기를 진단받은 ‘암뮤니티’ 오세웅 대표는 진단 초기 당시 느꼈던 통증을 생생하게 기억한다. 그는 “당시 통증을 묘사하면 뼈가 깨지는 듯한 느낌이었다. 마치 뼈를 망치나 송곳으로 누르는 것 같았다”며 “나중에 의사선생님께 들어보니, 뼈 안에서 암이 자라서 딱딱한 뼈 속에서 암이 커져서 느끼는 통증이라고 했다”고 전했다.'
  },
  {
    type: 'text',
    text: '불확실 속에서 반복되는 항암치료도 쉽지 않은 과정이다. 오 대표는 “치료과정에서 1년 반 동안 약을 4번 바꾸었고, 항암치료 과정에서 부작용도 꽤 많았다”며 굉장히 불안하고 고통스러웠다고 회상했다.'
  },
  {
    type: 'image',
    image: './interview-photo.jpg',
    alt: '서울 동대문구의 한 카페에서 인터뷰를 진행하는 모습',
    caption: '8월 5일 서울 동대문구의 한 카페에서 만난 암뮤니티 오세웅 대표 (사진=대학알리)'
  },
  {
    type: 'heading',
    text: '“쉬면 뒤쳐질까봐 두려워요…” 병보다 무서운 불안함'
  },
  {
    type: 'text',
    text: '청년 암 환자를 힘들게 하는 것은 신체적 고통만이 아니다. 커리어를 본격적으로 쌓고 미래를 설계해야 할 시기에 찾아온 암은 [[학업 중단과 경력 단절]]로 이어지고, 이는 또래 집단에서 홀로 뒤처졌다는 [[극심한 정서적 소외감]]으로 이어진다. 오 대표는 “주변 사람들과 똑같이 학교를 다니고 회사를 다니다가 갑자기 혼자 병원 생활을 하게 되면서 소외감이 들었다”며 “다른 친구들은 가정도 꾸리고 집도 사고 아이들도 있는데 혼자 모아둔 돈이 없으니 막막했다”고 말했다.'
  },
  {
    type: 'text',
    text: '투병 이후 사회 복귀도 쉽지 않은 상황이다. 암을 극복한 청년들조차 사회 구성원으로서 제 역할을 해낼 수 있을지 스스로를 의심하며 주저한다.'
  },
  {
    type: 'text',
    text: '하지만 사회 복귀가 힘든 이유를 환자 개인의 심리적 문제만으로 돌릴 수 없다. 오 대표는 재택 아르바이트 포지션이 있는 회사 53곳에 암 환자 취업 프로젝트 기획안을 제안했다. [[그러나 이에 응한 회사는 단 한 곳에 불과했다.]]'
  },
  {
    type: 'text',
    text: '거절 사유는 다양했다. 오 대표에 따르면 “기본적으로 암 경험자라고 하니까 기본적으로 그런 케이스가 (기업에) 없거나 인프라가 마련되어 있지 않다는 답변을 받았다”며 "\'혹시 장애인 분들처럼 암 경험자가 취약 계층으로 분류가 되나요?\' 이렇게 물어보시는 반응들이 있었다. 아니라고 하니깐, \'그래도 채용이 힘들 것 같다\'는 얘기가 많았다"고 기업에서 암 환자의 채용을 꺼려하는 현실을 담담하게 전했다.'
  }
];

function renderIntro() {
  const section = document.createElement('section');
  section.className = 'intro-section';

  introData.forEach((line) => {
    const box = document.createElement('div');
    box.className = 'webtoon-box';
    if (line === '더이상 젊음이 암을 지켜주지는 않습니다.') {
      box.classList.add('webtoon-box-emphasis');
    }

    const paragraph = document.createElement('p');
    paragraph.textContent = line;

    box.appendChild(paragraph);
    section.appendChild(box);
  });

  return section;
}

function renderEditorNote() {
  const wrap = document.createElement('aside');
  wrap.className = 'editor-note';

  const header = document.createElement('div');
  header.className = 'editor-note-header';

  const label = document.createElement('span');
  label.className = 'editor-note-label';
  label.textContent = '편집자주';

  const title = document.createElement('strong');
  title.className = 'editor-note-title';
  title.textContent = editorNote.title;

  header.appendChild(label);
  header.appendChild(title);
  wrap.appendChild(header);

  const body = document.createElement('div');
  body.className = 'editor-note-body';

  editorNote.paragraphs.forEach((text) => {
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    body.appendChild(paragraph);
  });

  wrap.appendChild(body);
  return wrap;
}

function renderDaejiSection() {
  const section = document.createElement('section');
  section.className = 'daeji-section';

  const image = document.createElement('img');
  image.className = 'daeji-image';
  image.src = './daeji-1.png';
  image.alt = '청년암 기사 대지 1 사진';

  section.appendChild(image);
  section.appendChild(renderEditorNote());

  return section;
}

function renderChart(chart) {
  const figure = document.createElement('figure');
  figure.className = 'chart-card';

  const image = document.createElement('img');
  image.className = 'chart-image';
  image.src = chart.image;
  image.alt = chart.alt;
  image.loading = 'lazy';

  figure.appendChild(image);
  return figure;
}

function renderArticleImage(imageData) {
  const figure = document.createElement('figure');
  figure.className = 'article-photo';

  const image = document.createElement('img');
  image.src = imageData.image;
  image.alt = imageData.alt;
  image.loading = 'lazy';

  const caption = document.createElement('figcaption');
  caption.textContent = imageData.caption;

  figure.appendChild(image);
  figure.appendChild(caption);
  return figure;
}

function renderTextBlock(block) {
  const article = document.createElement('article');
  article.className = 'article-block';

  const paragraph = document.createElement('p');
  const emphasisPattern = /\[\[(.*?)\]\]/g;
  let textStart = 0;
  let match;

  while ((match = emphasisPattern.exec(block.text)) !== null) {
    paragraph.appendChild(
      document.createTextNode(block.text.slice(textStart, match.index))
    );

    const emphasis = document.createElement('strong');
    const underline = document.createElement('u');
    underline.textContent = match[1];
    emphasis.appendChild(underline);
    paragraph.appendChild(emphasis);
    textStart = emphasisPattern.lastIndex;
  }

  paragraph.appendChild(document.createTextNode(block.text.slice(textStart)));

  article.appendChild(paragraph);
  return article;
}

function renderHeading(block) {
  const heading = document.createElement('h2');
  heading.className = 'article-heading';
  heading.textContent = block.text;

  return heading;
}

function renderQuote(block) {
  const quote = document.createElement('blockquote');
  quote.className = 'article-quote';
  quote.textContent = `“${block.text}”`;

  return quote;
}

function renderStory() {
  storySection.innerHTML = '';
  storySection.appendChild(renderIntro());
  storySection.appendChild(renderDaejiSection());

  const articleContent = document.createElement('div');
  articleContent.className = 'article-content';
  articleContent.id = 'article-one';

  articleData.forEach((item) => {
    let element;

    if (item.type === 'chart') {
      element = renderChart(item);
    } else if (item.type === 'image') {
      element = renderArticleImage(item);
    } else if (item.type === 'heading') {
      element = renderHeading(item);
    } else if (item.type === 'quote') {
      element = renderQuote(item);
    } else {
      element = renderTextBlock(item);
    }

    articleContent.appendChild(element);
  });

  const nextArticle = document.createElement('section');
  nextArticle.className = 'article-next';
  nextArticle.setAttribute('aria-label', '다음 기사');

  const nextArticleLink = document.createElement('a');
  nextArticleLink.className = 'article-next-link';
  nextArticleLink.href = './article-2.html';

  const nextArticleText = document.createElement('span');
  nextArticleText.className = 'article-next-text';

  const nextArticleEyebrow = document.createElement('span');
  nextArticleEyebrow.className = 'article-next-eyebrow';
  nextArticleEyebrow.textContent = '청년암 - 2편';

  const nextArticleTitle = document.createElement('strong');
  nextArticleTitle.className = 'article-next-title';
  nextArticleTitle.textContent = '이어보기';

  const nextArticleArrow = document.createElement('span');
  nextArticleArrow.className = 'article-next-arrow';
  nextArticleArrow.setAttribute('aria-hidden', 'true');
  nextArticleArrow.textContent = '→';

  nextArticleText.append(nextArticleEyebrow, nextArticleTitle);
  nextArticleLink.append(nextArticleText, nextArticleArrow);
  nextArticle.appendChild(nextArticleLink);

  storySection.appendChild(articleContent);
  storySection.appendChild(nextArticle);
}

function getEcgSignal(phase) {
  const points = [
    [0, 0],
    [0.26, 0],
    [0.29, -0.12],
    [0.33, 0.12],
    [0.38, 0],
    [0.46, 0],
    [0.5, 0.72],
    [0.56, -0.42],
    [0.63, 0],
    [0.69, 0.2],
    [0.74, -0.12],
    [0.79, 0.12],
    [0.84, -0.06],
    [0.88, 0],
    [1, 0]
  ];

  const position = ((phase % 1) + 1) % 1;

  for (let index = 1; index < points.length; index += 1) {
    const [rightX, rightY] = points[index];
    const [leftX, leftY] = points[index - 1];

    if (position <= rightX) {
      const ratio = (position - leftX) / (rightX - leftX);
      return leftY + (rightY - leftY) * ratio;
    }
  }

  return 0;
}

function drawEcg(progress) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  ctx.clearRect(0, 0, width, height);

  if (document.body.classList.contains('intro-ended')) return;

  const endX = width * progress;
  const centerY = height * 0.52;
  const cycleWidth = width / 2;

  ctx.beginPath();
  for (let x = 0; x <= width; x += 28) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }
  for (let y = 0; y <= height; y += 28) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }
  ctx.strokeStyle = '#f0f1f2';
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.06;
  ctx.stroke();
  ctx.globalAlpha = 1;

  ctx.beginPath();

  for (let x = 0; x <= endX; x += 2) {
    const phase = (x % cycleWidth) / cycleWidth;
    const y = centerY - getEcgSignal(phase) * height * 0.48;

    if (x === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.strokeStyle = '#f0f1f2';
  ctx.lineWidth = 2.6;
  ctx.shadowColor = 'rgba(240, 241, 242, 0.75)';
  ctx.shadowBlur = 14;
  ctx.stroke();
  ctx.shadowBlur = 0;
}

function updateScrollState() {
  const introSection = document.querySelector('.intro-section');
  const daejiSection = document.querySelector('.daeji-section');
  const articleContent = document.querySelector('.article-content');

  if (!introSection || !daejiSection || !articleContent) return;

  const storyStarted =
    introSection.getBoundingClientRect().top < window.innerHeight;
  document.body.classList.toggle('story-mode', storyStarted);

  const introRect = introSection.getBoundingClientRect();
  const introEnded = introRect.bottom < window.innerHeight * 0.65;

  document.body.classList.toggle('intro-ended', introEnded);

  const articleStarted =
    daejiSection.getBoundingClientRect().top < window.innerHeight * 0.82;

  document.body.classList.toggle('article-reading', articleStarted);

  const viewportCenter = window.innerHeight / 2;
  const visibleBoxes = [...document.querySelectorAll('.webtoon-box')]
    .map((box) => ({
      box,
      rect: box.getBoundingClientRect()
    }))
    .filter(({ rect }) => rect.bottom > 0 && rect.top < window.innerHeight)
    .sort((a, b) => {
      const aDistance = Math.abs((a.rect.top + a.rect.bottom) / 2 - viewportCenter);
      const bDistance = Math.abs((b.rect.top + b.rect.bottom) / 2 - viewportCenter);
      return aDistance - bDistance;
    });

  const currentBox = visibleBoxes[0]?.box;
  document.querySelectorAll('.webtoon-box').forEach((box) => {
    box.classList.toggle('active', box === currentBox && !introEnded);
  });

  document.querySelectorAll('.daeji-section, .editor-note').forEach((item) => {
    const rect = item.getBoundingClientRect();
    const visible =
      rect.top < window.innerHeight * 0.88 &&
      rect.bottom > window.innerHeight * 0.12;

    item.classList.toggle('active', visible);
  });

  const progress = Math.max(
    0,
    Math.min(
      1,
      (window.innerHeight * 0.82 - introRect.top) /
        Math.max(introSection.offsetHeight * 0.72, 1)
    )
  );

  drawEcg(progress);
}

function resizeCanvas() {
  const pixelRatio = window.devicePixelRatio || 1;

  canvas.width = window.innerWidth * pixelRatio;
  canvas.height = window.innerHeight * pixelRatio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;

  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  updateScrollState();
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('scroll', updateScrollState, { passive: true });

renderStory();
resizeCanvas();
updateScrollState();