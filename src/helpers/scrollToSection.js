export const scrollToSection = (e, isMobile) => {
  const targetId = e.currentTarget?.getAttribute('href');

  if (targetId && targetId !== '#') {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop;
      const scrollOffset = isMobile ? 50 : 150;
      window.scrollTo({
        top: offsetTop - scrollOffset,
        behavior: 'smooth'
      });
    }
  }
};
