import htmlAdmin from '../view/admin.html';
import axios from 'axios'
import ordenArray from './funAdmin/ordenarArr'
import "./cssAdmin/admin.css"
// import handleAxios from './funAdmin/funAxios'
// console.log('ordenArray', ordenArray)
const Admin = (socket)=>{

    let initialValue = {
        numCarrera: 0,
        nombre: '',
        puntaje: 0
    }
    let dataCpy = {}
    let dataNow
       
    const divElement = document.createElement('div')
    divElement.innerHTML = htmlAdmin;

    const forName = divElement.querySelector('#btnClickSend')
    const clickUpdate = divElement.querySelector('#btnClickUpdate')
    const valueName = divElement.querySelector('#name')
    const valueNumber =  divElement.querySelector('#number')
    const lstData = divElement.querySelector('#viewTable')
    const valueCarrera = divElement.querySelector('#numCarrera') 

    lstData.addEventListener('click', async(e)=>{

        if(e.target.innerHTML === 'EDITAR' ){
         try {
            const resp = await axios.get(`/update/${e.path[0].id}`);
            dataCpy = JSON.parse( JSON.stringify( resp.data ) );
            valueName.value =  dataCpy.nombre
            valueNumber.value = dataCpy.puntaje
            valueCarrera.value = dataCpy.numCarrera
        } catch (err) {
            
            console.error(err);
            // return err;
        }
        }if(e.target.innerHTML === 'ELIMINAR'){

        }
        
    })

    valueCarrera.addEventListener('input', (e)=>{
        initialValue.numCarrera = e.target.value;
        // console.log('num Carrera', initialValue.numCarrera)
    })
    valueNumber.addEventListener('input', (e)=>{
        initialValue.puntaje = e.target.value;
    })
    valueName.addEventListener('input', (e)=>{
        initialValue.nombre = e.target.value;
    })

    forName.addEventListener('click', async(e)=>{
    //    console.log('este es el numero que se enviara', valueNumber.value)
        // console.log(''dataCpy)
        // console.log('dataCpyssss', dataCpy)
       if(dataCpy._id){
            // socket.emit('message', dataCpy )
            dataCpy.puntaje = parseInt(valueNumber.value)
            axios.put(`/${dataCpy._id}`, {
                numCarrera: dataCpy.numCarrera,
                nombre: dataCpy.nombre,
                puntaje: dataCpy.puntaje
            })
            .then(res =>
                {
                    socket.emit('message', dataCpy )
                    valueNumber.value = 0
                    valueName.value = ''
                    return console.log('exito')
                })
            .catch(err => console.log(err))
            lstData.innerHTML=''
            sendGetRequest()
            
            dataCpy = {
                nombre:'',
                puntaje: 0,
                _id: ''
            }
        }else{
            // console.log('entramos al if')
            initialValue.puntaje = parseInt(initialValue.puntaje)
            try {
                // console.log('respo post')
                const resp = await  axios.post('/postData', initialValue);
                // console.log('respo post', resp)

            } catch (err) {
                
                console.error(err);
            }
            lstData.innerHTML=''
            sendGetRequest()
        }
    });


    const sendGetRequest = async () => {
        // console.log('estamos dentro de la funcion ')
        let dataNowUp = {}
        try {
            const resp = await axios.get('/getData');
            dataNowUp = JSON.parse( JSON.stringify( resp.data ) );
            // console.log('this data', dataNowUp)
            viewLst(dataNowUp)
        } catch (err) {
            console.error(err);
        }
    };
    sendGetRequest()
    // console.log('this data Now', dataNow);
    // ordenArray
    // function ordenArray(dataNow){
        
    //     dataNow.sort(function (a, b) {
    //         let x = a['puntaje'],
    //             y = b['puntaje'];
    //             return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    //     }); 
       
    // }

    function viewLst (res){
    
        ordenArray(res)
      
    //    console.log('data in orden ',res)
       return  res.map((dt, index)=>{
            
            return lstData.innerHTML += `
            <tr>
                <th scope="row">${index}</th>
                <td>8</td>
                <td>${dt.nombre}</td>
                <td>${dt.puntaje}</td>
                <td><button id="${dt._id}"  style=color:blue; >EDITAR</button></td>
                <td><button style=color:red; >ELIMINAR</button></td>
            </tr>
            `
        })
    }

    return divElement;
} 
export default Admin;