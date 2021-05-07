// import Admin   from '../public/view/admin'
import {router} from '../routes/index.routes'

router(window.location.hash);
window.addEventListener('hashchange', ()=>{
    router(window.location.hash);
})
