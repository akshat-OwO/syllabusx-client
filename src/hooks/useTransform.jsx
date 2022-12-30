import { useEffect } from "react";

const useTransform = (sem, branch, setSearching) => {
    useEffect(() => {
    
        if (sem !== '' && branch !== '') {
          const heading = document.querySelector('.heading');
          const optionWrappers = document.querySelectorAll('.option-wrapper');
          const footer = document.querySelector('.footer');
          const feedbackForm = document.querySelector('.feedback-form');
          const body = document.querySelector('.body');
          heading.classList.add('disappear');
          footer.classList.add('disappear');
          feedbackForm.classList.add('disappear');

          setTimeout(() => {
            heading.classList.add('hide');
            footer.classList.add('hide');
            feedbackForm.classList.add('hide');
            optionWrappers.forEach((option) => {
              option.style.gridRow = '2';
            });
            body.style.backgroundImage = 'none';
          }, 800);
          
          setTimeout(() => {
            setSearching(true);
          }, 1000);
        }
      }, [sem, branch]);
    return;
}
 
export default useTransform;