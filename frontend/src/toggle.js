export const toggleElement=(el,className)=>{
    let element=document.querySelector(el);
    element.classList.toggle(className);

};

export const api_base_url="http://localhost:3000";