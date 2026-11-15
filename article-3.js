const story = document.querySelector('.article3-story');
const quoteScenes = [...document.querySelectorAll('.article3-quote-scene')];
const coverSection = document.querySelector('.article3-cover-section');
const editorNote = coverSection.querySelector('.editor-note');

function updateStory() {
  const viewportCenter = window.innerHeight / 2;
  const visibleScenes = quoteScenes
    .map((scene) => ({
      scene,
      rect: scene.getBoundingClientRect()
    }))
    .filter(({ rect }) => rect.bottom > 0 && rect.top < window.innerHeight)
    .sort((a, b) => {
      const aDistance = Math.abs((a.rect.top + a.rect.bottom) / 2 - viewportCenter);
      const bDistance = Math.abs((b.rect.top + b.rect.bottom) / 2 - viewportCenter);
      return aDistance - bDistance;
    });

  const currentScene = visibleScenes[0]?.scene;
  quoteScenes.forEach((scene) => {
    scene.classList.toggle('active', scene === currentScene);
  });
  story.classList.toggle('is-conclusion', currentScene?.classList.contains('article3-conclusion') ?? false);
  story.classList.toggle('has-scrolled', window.scrollY > window.innerHeight * 0.35);

  const coverVisible = coverSection.getBoundingClientRect().top < window.innerHeight * 0.88;
  coverSection.classList.toggle('active', coverVisible);
  editorNote.classList.toggle('active', coverVisible);
}

let updateQueued = false;
function queueUpdate() {
  if (!updateQueued) {
    updateQueued = true;
    window.requestAnimationFrame(() => {
      updateStory();
      updateQueued = false;
    });
  }
}

window.addEventListener('scroll', queueUpdate, { passive: true });
window.addEventListener('resize', queueUpdate);
updateStory();
