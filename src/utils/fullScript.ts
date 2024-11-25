document.addEventListener("DOMContentLoaded", function() {
    openFullscreen();
  },{passive:true});
  
export function openFullscreen() {
    const elem = document.documentElement as HTMLElement;
  
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  }