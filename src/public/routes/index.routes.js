// import Adimn from '../controlers/admin.controlers'
import { Home, Admin } from '../controlers'

const viewAdminHtml = document.getElementById('admin')

console.log(Home)
const router = (linkRoute)=>{

    viewAdminHtml.innerHTML = ``

    switch (linkRoute) {
        case '#/admin':
                return viewAdminHtml.appendChild(Admin());
            break;

        case '#/':
                 return viewAdminHtml.appendChild(Home());
            break;
        default:
            console.log('not found 404')
            break;
    }
}

export {router}