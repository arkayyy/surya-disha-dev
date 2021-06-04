import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Line} from 'react-chartjs-2'
import Lottie from 'react-lottie'



import { ButtonGroup,Dropdown,ToggleButton,Button,DropdownButton } from "react-bootstrap";


import useInterval from './useInterval'
import sunloading from './sunloading.json'
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

function APISolarData() {

    const [chartDataElev,setChartDataElev]=useState({})
    const [chartDataPow,setChartDataPow]=useState({})
    const [chartDataEnergy,setChartDataEnergy]=useState({})
    const [loading,setLoading]=useState(true)
    const elem=['Solar Elevation','Power','Energy']
    const [radioValue,setRadioValue]=useState('')
    const [elevOpen,setElevOpen]=useState(true)
    const [powOpen,setPowOpen]=useState(false)
    const [energyOpen,setEnergyOpen]=useState(false)
    const [currDisp,setCurrDisp]=useState('ELEVATION')

    const animOptions={
        loop: true,
        autoplay: true,
      animationData: sunloading,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    }

    const chart=()=>{
        var elevation=[-55.0]
        var power=[]
        var energy=[]
        var energyVar=0
        
        axios.get('http://surya-disha.herokuapp.com/solar-data').then((resp)=>{
           //console.log(resp.data)
           
           console.log(resp.data)
            //setLoading(false)
            for(const elem of resp.data["elevationData"]){
                
                elevation.push(parseFloat(elem[3]))
                
            }
            for(const elem of resp.data["expectedIrradianceData"]){
                power.push(0.0049*parseFloat(elem))
                energyVar+=(0.0049*parseFloat(elem))
                energy.push(parseFloat(energyVar))
            }
            elevation.pop()

            

            
            setChartDataElev({
                labels: ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"],
                datasets:[
                    {
                        label: "SOLAR ELEVATION",
                        data: elevation,
                        backgroundColor: ["rgba(75,192,192,0.6)"],
                        borderWidth: 4,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }
                ]
            })

            setChartDataPow({
                labels: ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"],
                datasets:[
                    {
                        label: "EXPECTED POWER OUTPUT",
                        data: power,
                        backgroundColor: ["rgba(75,192,192,0.6)"],
                        borderWidth: 4,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }
                ]
            })

            setChartDataEnergy({
                labels: ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"],
                datasets:[
                    {
                        label: "EXPECTED ENERGY OUTPUT",
                        data: energy,
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
    useEffect(() => {    // Your custom logic here    
        chart();  }, []);


    return (
        <div style={{width:"100%",height:"100%"}}>

            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%"}}>

            <div style={{display:"flex",width:"100%",alignItems:"center",justifyContent:"center",flex:"0.1"}}><h1 style={{fontFamily:"Eurostile"}}>API SOLAR DATA - {currDisp}</h1></div>
           
            <div style={{width:"80%",flex:"0.7",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            {elevOpen?(<>{loading?(<div style={{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><Lottie 
                        options={animOptions}
                        height={400}
                        width={400}
                    /></div>):(<Line data={chartDataElev} options={{responsive: true, title: {text: "EXPECTED ELEVATION",display: true}}}/>)}</>):(<></>)}
                    {powOpen?(<>{loading?(<div style={{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><Lottie 
                        options={animOptions}
                        height={400}
                        width={400}
                    /></div>):(<Line data={chartDataPow} options={{responsive: true, title: {text: "EXPECTED POWER OUTPUT",display: true}}}/>)}</>):(<></>)}
                    {energyOpen?(<>{loading?(<div style={{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><Lottie 
                        options={animOptions}
                        height={400}
                        width={400}
                    /></div>):(<Line data={chartDataEnergy} options={{responsive: true, title: {text: "EXPECTED ENERGY",display: true}}}/>)}</>):(<></>)}

            </div>

            <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",flex:"0.2"}}>
            <ButtonGroup aria-label="Basic example">
            
            <Button  style={{backgroundColor:"#4D2969"}} onClick={()=>{setCurrDisp('ELEVATION'); setRadioValue('elevation'); setElevOpen(true); setPowOpen(false); setEnergyOpen(false)}} variant="secondary">Solar Elevation</Button>
            <Button style={{backgroundColor:"#4D2969"}} onClick={()=>{setCurrDisp('POWER'); setRadioValue('power');setElevOpen(false); setPowOpen(true); setEnergyOpen(false)}} variant="secondary">Power Generated</Button>
            <Button style={{backgroundColor:"#4D2969"}} onClick={()=>{setCurrDisp('ENERGY'); setRadioValue('energy');setElevOpen(false); setPowOpen(false); setEnergyOpen(true)}} variant="secondary">Energy Produced</Button>
            </ButtonGroup>
            </div>


            </div>
            

        </div>
    )
}

export default APISolarData
