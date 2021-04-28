import htmlAdmin from '../view/admin.html';

const Admin = ()=>{


    let viewAdmin = htmlAdmin
    const divElement = document.createElement('div')
    divElement.innerHTML = viewAdmin
    
    return divElement;
} 
export default Admin;