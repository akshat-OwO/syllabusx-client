import { useEffect } from "react";

const useTransform = (sem, branch, setSearching) => {
    useEffect(() => {
    
        if (sem !== '' && branch !== '') {
          const nav = document.querySelector('.buttons');
          const heading = document.querySelector('.heading');
          // const buttons = document.querySelector('.buttons');
          nav.classList.add('transform-nav');
          heading.classList.add('transform-heading');
          // nav.style.display = 'flex';
          // nav.style.justifyContent = 'space-evenly';
          // nav.style.alignItems = 'center';
          // nav.style.minHeight = '10vh';
          // nav.style.background = 'var(--bg)';
          // buttons.style.position = 'relative';
          // buttons.style.right = '25vw';
          // nav.style.marginTop = '0';
          // buttons.style.gap = '25vw';
          // heading.firstChild.style.fontSize = 'calc(var(--_size) * 2.5)';
          // heading.firstChild.style.paddingLeft = 'var(--_size)';
          // heading.style.alignSelf = 'center';
          // heading.firstChild.style.position = 'relative';
          // heading.firstChild.style.left = '41vw';
          // heading.lastChild.style.display = 'none';
          
          setTimeout(() => {
            setSearching(true);
          }, 1000);
        }
      }, [sem, branch]);
    return;
}
 
export default useTransform;