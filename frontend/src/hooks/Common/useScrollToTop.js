const useScrollToTop = () => {
    const scrollToTop = (smooth = true) => {
      window.scrollTo({
        top: 0,
        behavior: smooth ? 'smooth' : 'auto'
      });
    };
  
    return scrollToTop;
  };
  
  export default useScrollToTop;