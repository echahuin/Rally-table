import htmlHome from '../view/home.html';
import ordenArray from './funAdmin/ordenarArr'
import axios from 'axios'
import './cssHome/home.css'
import './cssHome/screen576.css'
import './cssHome/screen768.css'
import './cssHome/screen992.css'
const Home = (socket)=>{
    
    const divElement = document.createElement('div')
    divElement.innerHTML = htmlHome
    const tableView = divElement.querySelector('#table')
    const buttonViewTable = divElement.querySelector('#buttonActivTable')
    let activeButton = true

    buttonViewTable.addEventListener('click', (e)=>{
        if(activeButton){
            sendGetRequest()
            activeButton = false
        }        
    })
    if(activeButton === false){
        console.log('color cambio ?')
        ul.style.backgroundColor = "#6ab150";
    }

    const sendGetRequest = async () => {
        // console.log('estamos dentro de la funcion ')
        let dataNowUp = {}
        try {
            const resp = await axios.get('/getData');
            dataNowUp = JSON.parse( JSON.stringify( resp.data ) );
            // console.log('this data', dataNowUp)
            paintViewHtml(dataNowUp)
        } catch (err) {
            console.error(err);
        }
    };

    socket.on('message', (dt)=>{
        let data = JSON.parse( JSON.stringify( dt ) );
        // console.log('this data socket yehaaa!!', dt)
        tableView.innerHTML=''
        paintViewHtml(data)
    })

    function paintViewHtml (dt) {
        ordenArray(dt)
        let nCar = 0
        if(dt.numCarrera){
            nCar = dat.numCarrera
            // console.log(dt.numCarrera)
        }
        return dt.map((dat, index)=>{
            
            if(dat.numCarrera){
                nCar = dat.numCarrera
            }
            return tableView.innerHTML += `
            <tr>
                <td>${index}</td>
                <td>${dat.nombre}</td>
                <td>${nCar}</td>
                <td>${dat.puntaje}</td>
            </tr>
            `
        })
    }
    return divElement;
} 

export default  Home;