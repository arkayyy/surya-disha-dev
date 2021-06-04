import React, { useEffect, useState } from 'react'
import {Line} from 'react-chartjs-2'
import axios from 'axios'

//import useInterval from './useInterval'
import './Home.css'
import LiveData from '../LiveData/LiveData'
import APISolarData from '../APISolarData/APISolarData'
import MonthlyData from '../MonthlyData/MonthlyData'
import DataComparison from '../DataComparison/DataComparison'



function Home() {
    const [powerList,setPowerList]=useState([])
    const [timeList,setTimeList]=useState([])
    const [chartData,setChartData]=useState({})
    const [navbuttonbg1,setNavbuttonbg1]=useState('#3c1d54')
    const [navbuttonbg2,setNavbuttonbg2]=useState('#4D2969')
    const [navbuttonbg3,setNavbuttonbg3]=useState('#4D2969')
    const [navbuttonbg4,setNavbuttonbg4]=useState('#4D2969')
    const [navbuttonbg5,setNavbuttonbg5]=useState('#4D2969')

    const [widnav1,setWidnav1]=useState('100%')
    const [widnav2,setWidnav2]=useState('100%')
    const [widnav3,setWidnav3]=useState('100%')
    const [widnav4,setWidnav4]=useState('100%')

    const [hnav1,setHnav1]=useState('')
    const [navOption,setNavOption]=useState('live-data')

//     const chart=()=>{
//         var powerData1=[]
// var timeData1=[]
//         axios.get('/api/get-power-data').then((resp)=>{
//             for(const powerElem of resp.data.powerData){
//                 powerData1.push(parseFloat(powerElem.power))
//                 timeData1.push(powerElem.time)
//             }
//             console.log(powerData1,timeData1)
//             setChartData({
//                 labels: timeData1.reverse(),
//                 datasets:[
//                     {
//                         label: "power output",
//                         data: powerData1.reverse(),
//                         backgroundColor: ["rgba(75,192,192,0.6)"],
//                         borderWidth: 4,
//                         fill: false,
//                         borderColor: 'rgb(75, 192, 192)',
//                         tension: 0.1
//                     }
//                 ]
//             })
//         }).catch((err)=>{
//             console.log("ERROR:",err.message)
//         })



        
//     }

//     // useEffect(()=>{
//     //     chart()
//     // })

//     useInterval(() => {    // Your custom logic here    
//         chart();  }, 5000);

    return (
        <div className="home" style={{display:"flex", flexDirection:"row",height:"100vh"}}>

            <div className="navigator" style={{flex:"0.15",backgroundColor:"#4D2969",display:"flex",flexDirection:"column",height:"100%"}}>
               <div style={{display:"flex",alignItems:"center",justifyContent:"center",flex:"0.2"}}><img src="Logo.png" style={{width:"60%",margin:"30px"}}/></div> 

               <div className="navigator buttons" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",color:"white",flex:"0.6",width:"100%"}}>
                   <div className="buttonsname" style={{alignItems:"center",justifyContent:"center",display:"flex",width:`${widnav1}`,borderTop:"1px solid #B674DE",background:`${navbuttonbg1}`,height:`${hnav1}`}} onClick={()=>{setNavbuttonbg1("#3c1d54");setNavbuttonbg2("#4D2969");setNavbuttonbg3("#4D2969");setNavbuttonbg4("#4D2969");setNavbuttonbg5("#4D2969");setNavOption('live-data')}}  > <h2 style={{fontFamily:"Eurostile",fontWeight:"bold",fontSize:"17px",margin:"0px",padding:"10px"}}>LIVE SOLAR PANEL DATA</h2> </div>
                   <div className="buttonsname" style={{alignItems:"center",justifyContent:"center",display:"flex",width:`${widnav2}`,borderTop:"1px solid #B674DE",background:`${navbuttonbg2}`}} onClick={()=>{setNavbuttonbg2("#3c1d54");setNavbuttonbg1("#4D2969");setNavbuttonbg3("#4D2969");setNavbuttonbg4("#4D2969");setNavbuttonbg5("#4D2969");setNavOption('api-solar-data')}}> <h2 style={{fontFamily:"Eurostile",fontWeight:"bold",fontSize:"17px",margin:"0px",padding:"10px"}}>API SOLAR DATA</h2> </div>
                   <div className="buttonsname" style={{alignItems:"center",justifyContent:"center",display:"flex",width:`${widnav3}`,borderTop:"1px solid #B674DE",background:`${navbuttonbg3}`}} onClick={()=>{setNavbuttonbg3("#3c1d54");setNavbuttonbg1("#4D2969");setNavbuttonbg2("#4D2969");setNavbuttonbg4("#4D2969");setNavbuttonbg5("#4D2969");setNavOption('monthly-data')}}> <h2 style={{fontFamily:"Eurostile",fontWeight:"bold",fontSize:"17px",margin:"0px",padding:"10px"}}>MONTHLY POWER DATA</h2> </div>
                   <div className="buttonsname" style={{alignItems:"center",justifyContent:"center",display:"flex",width:`${widnav4}`,borderTop:"1px solid #B674DE",background:`${navbuttonbg4}`,borderBottom:"1px solid #B674DE"}} onClick={()=>{setNavbuttonbg4("#3c1d54");setNavbuttonbg1("#4D2969");setNavbuttonbg2("#4D2969");setNavbuttonbg3("#4D2969");setNavbuttonbg5("#4D2969");setNavOption('data-comparison')}}> <h2 style={{fontFamily:"Eurostile",fontWeight:"bold",fontSize:"17px",margin:"0px",padding:"10px"}}>DATA COMPARISON</h2> </div>
                   {/* <div className="buttonsname" style={{alignItems:"center",justifyContent:"center",display:"flex",width:`${widnav4}`,borderTop:"1px solid #B674DE",background:`${navbuttonbg5}`,borderBottom:"1px solid #B674DE"}} onClick={()=>{setNavbuttonbg5("#3c1d54");setNavbuttonbg4("#4D2969");setNavbuttonbg1("#4D2969");setNavbuttonbg2("#4D2969");setNavbuttonbg3("#4D2969");setNavOption('about')}}> <h2 style={{fontFamily:"Eurostile",fontWeight:"bold",fontSize:"17px",margin:"0px",padding:"10px"}}>ABOUT</h2> </div> */}
               </div> 

               <div style={{flex:"0.2",display:"flex",justifyContent:"center",alignItems:"center"}}>
               <img src="vit-logo.png" style={{width:"80%"}}/>
               </div>
            </div>

            <div style={{flex:"0.85"}}>
                {
                    navOption==="api-solar-data"?(<APISolarData/>):(<></>)
                }
                

                {
                    navOption === "live-data" ?(<LiveData/>):(<></>)}

                    {navOption==="monthly-data"?(<MonthlyData/>):(<></>)}

                    {navOption==="data-comparison"?(<DataComparison/>):(<></>)}
                {/* <Line data={chartData} options={{responsive: true, title: {text: "POWER OUTPUT",display: true}}}/> */}
            </div>
            
        </div>
    )
}

export default Home
