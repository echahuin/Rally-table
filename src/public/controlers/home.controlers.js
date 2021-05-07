import htmlHome from '../view/home.html';
import ordenArray from './funAdmin/ordenarArr'

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
                <th scope="row">${index}</th>
                <td>${dat.nombre}</td>
                <td>${dat.puntaje}</td>
            </tr>
            `
        })
    }
    // socket.on('message',  async(e)=>{
    //      data = await e.slice();
    //      console.log('this data', e)
    //      data.map((dt, index)=>{
    //         return tableView.innerHTML += `
    //         <tr>
    //             <th scope="row">${index}</th>
    //             <td>${dt.nombre}</td>
    //             <td>${dt.puntaje}</td>
    //         </tr>
    //         `
    //       })
    
    // })

   


    // axios.get('/getData', {
    //     // params: {
    //     //   ID: 12345
    //     // }
    //   })
    //   .then(function (response) {
    //       data = response.data;
         
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
    //   .then(function () {
    //     // always executed
    //   });
    return divElement;
} 

export default  Home;