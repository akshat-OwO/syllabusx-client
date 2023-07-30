import { useEffect } from "react";

const useTransform = (sem, branch, setSearching) => {
    useEffect(() => {
    
        if (sem !== '' && branch !== '') {
          const nav = document.querySelector('.nav');
          const heading = document.querySelector('.heading');
          const optionWrappers = document.querySelectorAll('.option-wrapper');
          const footer = document.querySelector('.footer');
          const feedbackForm = document.querySelector('.feedback-form');
          const body = document.querySelector('.body');
          const infos = document.querySelectorAll('.info');
          heading.classList.add('disappear');
          footer.classList.add('disappear');
          feedbackForm.classList.add('disappear');
          infos.forEach(info => {
            info.style.opacity = '0';
          });

          setTimeout(() => {
            heading.classList.add('hide');
            footer.classList.add('hide');
            feedbackForm.classList.add('hide');
            infos.forEach(info => {
              info.style.display = 'none';
            });
            optionWrappers.forEach((option) => {
              option.style.gridRow = '1';
              option.style.gridColumn = 'span 2';
            });
            // body.style.backgroundImage = 'none';
            nav.style.display = 'flex';
            nav.style.justifyContent = 'space-evenly';
            // nav.style.marginTop = '1.5rem';
          }, 800);
          
          setTimeout(() => {
            setSearching(true);
          }, 1000);
        }
      }, [sem, branch]);
    return;
}
 
export default useTransform;