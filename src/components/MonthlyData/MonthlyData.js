import React,{useEffect, useState} from 'react'
import {ButtonGroup,Button} from 'react-bootstrap'
import {Line } from 'react-chartjs-2'
import axios from 'axios'
import Lottie from 'react-lottie'

import sunloading from './sunloading.json'

function MonthlyData() {

    const [currDisp,setCurrDisp]=useState('POWER')
    const [radioValue,setRadioValue]=useState()
    const [powOpen,setPowOpen]=useState(true)
    const [energyOpen,setEnergyOpen]=useState(false)
    const [loading,setLoading]=useState(true)
    const [loadingEnergy,setLoadingEnergy]=useState(true)
    const [chartDataMonthlyPower,setChartDataMonthlyPower]=useState()
    const [chartDataMonthlyEnergy,setChartDataMonthlyEnergy]=useState()

    const animOptions={
        loop: true,
        autoplay: true,
      animationData: sunloading,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    }

    const chart=()=>{

        axios.get('http://surya-disha.azurewebsites.net/solar-monthly-data').then((resp)=>{
        var monthlyPower=[]
        for(const elem of resp.data["monthlyIrradianceData"])
        {
            monthlyPower.push(0.49*parseFloat(elem["poa_global"]))
        }

            setChartDataMonthlyPower({
                labels: ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],
                datasets:[
                    {
                        label: "POWER",
                        data: monthlyPower ,
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
            console.log("ERRROR",err.message)
        })
    }

    const getEnergyChart=()=>{
        var monthlyDailyAverageEnergyOutput=[]
        axios.get('http://surya-disha.herokuapp.com/solar-energy-monthly-data').then((resp)=>{
            for(const elem of resp.data["monthlyEnergyData"]){
                monthlyDailyAverageEnergyOutput.push(parseFloat(elem))
            }
            console.log(monthlyDailyAverageEnergyOutput)

            setChartDataMonthlyEnergy({
                labels: ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],
                datasets:[
                    {
                        label: "ENERGY",
                        data: monthlyDailyAverageEnergyOutput ,
                        backgroundColor: ["rgba(75,192,192,0.6)"],
                        borderWidth: 4,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }
                ]
            })

            setLoadingEnergy(false)

        }).catch((err)=>{
            console.log("ERROR:",err.message)
        })
    }

    useEffect(()=>{
        chart()
        
    },[])

    return (
        <div style={{height:"100%",width:"100%",display:"flex",flexDirection:"column", justifyContent:"center",alignItems:"center"}}>
            
            <div className="monthlyData__heading" style={{flex:"0.1",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <h1 style={{fontFamily:"Eurostile"}}>MONTHLY DATA - {currDisp}</h1>
            </div>

            <div className="monthlyData__body" style={{flex:"0.9",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100%"}}>

           <div style={{flex:"0.9",width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
           {powOpen?(<>{loading?(<div style={{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><Lottie 
                        options={animOptions}
                        height={400}
                        width={400}
                    /></div>):(<div style={{width:"60%",display:"flex",alignItems:"center",justifyContent:"center"}}><Line data={chartDataMonthlyPower} options={{responsive: true, title: {text: "EXPECTED MOTNHLY POWER",display: true}}}/></div>)}</>):(<></>)}   
            
            {energyOpen?(<>{loadingEnergy?(<div style={{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><Lottie 
                        options={animOptions}
                        height={400}
                        width={400}
                    /></div>):(<div style={{width:"60%"}}><Line data={chartDataMonthlyEnergy} options={{responsive: true, title: {text: "EXPECTED MOTNHLY ENERGY DAILY",display: true}}}/></div>)}</>):(<></>)}   
            
            </div> 

            <div style={{flex:"0.1"}}>

            <ButtonGroup aria-label="Basic example">
            <Button style={{backgroundColor:"#4D2969"}} onClick={()=>{setCurrDisp('POWER'); setRadioValue('power'); setPowOpen(true); setEnergyOpen(false)}} variant="secondary">Power Generated</Button>
            <Button style={{backgroundColor:"#4D2969"}} onClick={()=>{getEnergyChart(); setCurrDisp('ENERGY'); setRadioValue('energy'); setPowOpen(false); setEnergyOpen(true)}} variant="secondary">Energy Produced</Button>
            </ButtonGroup>
            </div>
            
            </div>

        </div>
    )
}

export default MonthlyData
