import htmlHome from '../view/home.html';
import ordenArray from './funAdmin/ordenarArr'
import getDateNow from './funHome/getDateNow'
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
    const dateNow = divElement.querySelector('#dateNow')

    let activeButton = true

    buttonViewTable.addEventListener('click', (e)=>{
        if(activeButton){
            sendGetRequest()
            buttonViewTable.innerHTML = ''
            activeButton = false
        }        
    })

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

    // DAte handle
      dateNow.innerHTML = `${getDateNow()}`

    // socket handle
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
                <td>${index+1}</td>
                <td>${dat.nombre}</td>
                <td class="stylPts">${dat.puntaje}</td>
            </tr>
            `
        })
    }
    return divElement;
} 

export default  Home;