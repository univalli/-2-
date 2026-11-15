const storyNav = document.querySelector('.article-story-nav');
const storyStarts = Array.from(document.querySelectorAll('.article-story-start'));

if (storyNav && storyStarts.length > 0) {
  const storyTabs = Array.from(storyNav.querySelectorAll('.article-story-tab'));

  function setActiveStory(storyId) {
    storyTabs.forEach((tab) => {
      const isActive = tab.hash === `#${storyId}`;
      tab.classList.toggle('is-active', isActive);

      if (isActive) {
        tab.setAttribute('aria-current', 'location');
      } else {
        tab.removeAttribute('aria-current');
      }
    });
  }

  function updateActiveStory() {
    const navRect = storyNav.getBoundingClientRect();
    const isPinned = navRect.top <= 0;
    storyNav.classList.toggle('is-pinned', isPinned);
    const activationLine = navRect.bottom + 56;
    let activeStory = storyStarts[0];

    storyStarts.forEach((story) => {
      if (story.getBoundingClientRect().top <= activationLine) {
        activeStory = story;
      }
    });

    setActiveStory(activeStory.id);
  }

  let updateScheduled = false;
  function scheduleActiveStoryUpdate() {
    if (updateScheduled) return;

    updateScheduled = true;
    window.requestAnimationFrame(() => {
      updateActiveStory();
      updateScheduled = false;
    });
  }

  window.addEventListener('scroll', scheduleActiveStoryUpdate, { passive: true });
  window.addEventListener('resize', scheduleActiveStoryUpdate);
  storyNav.addEventListener('click', (event) => {
    const tab = event.target.closest('.article-story-tab');
    if (tab) setActiveStory(tab.hash.slice(1));
  });

  updateActiveStory();
}

const articlePhotos = Array.from(document.querySelectorAll('.article-photo'));

if (articlePhotos.length > 0) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion || !('IntersectionObserver' in window)) {
    articlePhotos.forEach((photo) => photo.classList.add('is-reveal-visible'));
  } else {
    const photoObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('is-reveal-visible');
          entry.target.addEventListener(
            'transitionend',
            () => entry.target.classList.remove('is-reveal-pending'),
            { once: true }
          );
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    articlePhotos.forEach((photo) => photo.classList.add('is-reveal-pending'));

    window.requestAnimationFrame(() => {
      articlePhotos.forEach((photo) => photoObserver.observe(photo));
    });
  }
}
