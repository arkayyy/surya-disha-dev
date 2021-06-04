import React,{useState} from 'react'
import axios from 'axios'
import {Line} from 'react-chartjs-2'
import Lottie from 'react-lottie'

import useInterval from './useInterval'
import sunloading from './sunloading.json'


function LiveData() {
    const [powerList,setPowerList]=useState([])
    const [timeList,setTimeList]=useState([])
    const [chartData,setChartData]=useState({})
    const [navOption,setNavOption]=useState('live-data')
    const [loading,setLoading]=useState(true)
    const [date,setDate]=useState('')


    const animOptions={
        loop: true,
        autoplay: true,
      animationData: sunloading,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    }

    const chart=()=>{
        var powerData1=[]
    var timeData1=[]
        axios.get('/api/get-power-data').then((resp)=>{
            for(const powerElem of resp.data.powerData){
                powerData1.push(parseFloat(powerElem.power['$numberDecimal']))
                timeData1.push(powerElem.time)
            }
            
            setChartData({
                labels: timeData1.reverse(),
                datasets:[
                    {
                        label: "power output",
                        data: powerData1.reverse(),
                        backgroundColor: ["rgba(75,192,192,0.6)"],
                        borderWidth: 4,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }
                ]
            })
            setLoading(false)
        }).catch((err)=>{
            console.log("ERROR:",err.message)
        })



        
    }

    // useEffect(()=>{
    //     chart()
    // })

    useInterval(() => {    // Your custom logic here    
        chart();  }, 5000);

    return (
        <div style={{height:"90%",display:"flex",flexDirection:"column"}}>
           
           <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center", flex:"0.1"}}> <h1 style={{fontFamily:"Eurostile",fontWeight:"900"}}>LIVE POWER DATA</h1></div>
            
            <div style={{flex:"0.9"}}>
            {loading?(<div style={{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><Lottie 
                        options={animOptions}
                        height={400}
                        width={400}
                    /></div>):(
            
            <div style={{height:"100%",width:"100%",display:"flex",alignItems:"center",justifyContent:"center", flexDirection:"column"}}>
                
                <div style={{width:"70%",flex:"0.8", display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                    <Line data={chartData} options={{responsive: true, title: {text: "POWER OUTPUT",display: true}}}/>
                </div>
                
                <div style={{flex:"0.2",display:'flex',flexDirection:"row"}}>
                <p style={{fontWeight:"bold"}}>NOTE: </p> <p style={{}}>Power values are got from our solar panel set up at every 15 minute interval. This data may very due to cloud formation, rain and other natural factors.</p>
                </div>

                </div>

                
                )}
                </div>

        </div>
    )
}

export default LiveData
