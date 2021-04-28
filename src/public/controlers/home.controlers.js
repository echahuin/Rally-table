import htmlHome from '../view/home.html';

const Home =  ()=>{
    let viewHome = htmlHome
    const divElement = document.createElement('div')
    divElement.innerHTML = viewHome
    
    return divElement;
} 

export default  Home;