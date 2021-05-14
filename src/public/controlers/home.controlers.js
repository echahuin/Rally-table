import htmlHome from '../view/home.html';
import ordenArray from './funAdmin/ordenarArr'
import './cssHome/home.css'
import './cssHome/screen576.css'
import './cssHome/screen768.css'
import './cssHome/screen992.css'
const Home = (socket)=>{
    
    const divElement = document.createElement('div')
    divElement.innerHTML = htmlHome
    const tableView = divElement.querySelector('#table')

    socket.on('message', (dt)=>{
        let data = JSON.parse( JSON.stringify( dt ) );
        console.log('this data socket yehaaa!!', dt)
        tableView.innerHTML=''
        paintViewHtml(data)
    })

    function paintViewHtml (dt) {
        ordenArray(dt)
        return dt.map((dat, index)=>{
            return tableView.innerHTML += `
            <tr>
                <td>${index}</td>
                <td>${dat.nombre}</td>
                <td>8</td>
                <td>${dat.puntaje}</td>
            </tr>
            `
        })
    }
    return divElement;
} 

export default  Home;