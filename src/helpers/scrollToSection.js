export const scrollToSection = (e, isMobile) => {
  const targetId = e.currentTarget?.getAttribute('href');

  if (targetId && targetId !== '#') {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const offsetTop = targetElement.offsetTop;
      window.scrollTo({
        top: offsetTop - headerHeight - (isMobile ? 20 : 50),
        behavior: 'smooth'
      });
    }
  }
};
