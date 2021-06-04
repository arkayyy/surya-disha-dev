import React, { useEffect, useState } from 'react'
import {Line} from 'react-chartjs-2'
import Lottie from 'react-lottie'
import {ButtonGroup,Button,Dropdown} from 'react-bootstrap'
import axios from 'axios'

import sunloading from './sunloading.json'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'


function DataComparison() {
    const [loading,setLoading] =useState(true)
    const [chartDataPowerExpected,setChartDataPowerExpected]=useState({})
    const [chartDataPowerActual,setChartDataPowerActual]=useState({})
    const [chartDataEnergyExpected,setChartDataEnergyExpected]=useState({})
    const [chartDataEnergyActual,setChartDataEnergyActual]=useState({})
    const [currDisp,setCurrDisp]=useState('POWER')
    const [powOpen,setPowOpen]=useState(true)
    const [energyOpen,setEnergyOpen]=useState(false)
    const [error,setError]=useState('')
    const [expectedDateToggle,setExpectedDateToggle]=useState('Select Date')
    const [actualDateToggle,setActualDateToggle]=useState('Select Date')
    const [loading1,setLoading1]=useState(false)
    const [loading2,setLoading2]=useState(false)
    const [error1,setError1]=useState('')
    const [error2,setError2]=useState('')
    const [dispCurr,setDispCurr]=useState('power')
    const [chartEnergy1,setChartEnergy1]=useState({})
    const [chartEnergy2,setChartEnergy2]=useState({})


    const animOptions={
        loop: true,
        autoplay: true,
      animationData: sunloading,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    }
    var expectedPower = {
        label: "Car B - Speed (mph)",
        data: [20, 15, 60, 60, 65, 30, 70],
        lineTension: 0,
        fill: false,
      borderColor: 'blue'
      };

      var actualPower = {
        label: "Car B - Speed (mph)",
        data: [20, 25, 40, 25, 30, 80, 70],
        lineTension: 0,
        fill: false,
      borderColor: 'blue'
      };

      var powerData={
          datasets: [expectedPower,actualPower]
      }



    const getPowerDataActual=(date)=>{
        axios.get('/api/get-power-data-by-date',{params:{date: date}}).then((resp)=>{
            var powerData1=[]
            var hours=[]
            var expectedPower=[]
            var energy=[]
            var expectedEnergy=[]
            var expectedEnergySum=0.00
            var energySum=0.00
            console.log(powerData1)
            for(const elem of resp.data.powerData){
                powerData1.push(parseFloat(elem.power['$numberDecimal']))
                hours.push(elem.time)
                energySum+=elem.power['$numberDecimal']
                energy.push(energySum)
            }

            axios.get('http://surya-disha.herokuapp.com/solar-data').then((resp)=>{
                for(const elem of resp.data["expectedIrradianceData"]){
                    expectedPower.push(0.0049*parseFloat(elem))
                    expectedEnergySum+=(0.0049*parseFloat(elem))
                    expectedEnergy.push(expectedEnergySum)
                }
                setChartDataPowerActual({
                    labels: hours,
                    datasets:[
                        {
                            label: "POWER OUTPUT (WITH ROTATION)",
                            data: powerData1,
                            backgroundColor: ["rgba(75,192,192,0.6)"],
                            borderWidth: 4,
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                        },
                        {
                            label: "EXPECTED POWER OUTPUT",
                            data: expectedPower,
                            backgroundColor: ["red"],
                            borderWidth: 4,
                            fill: false,
                            borderColor: 'red',
                            tension: 0.1
                        }
                    ]
                })

                setChartEnergy2({
                    labels: hours,
                    datasets:[
                        {
                            label: "ENERGY OUTPUT (WITH ROTATION)",
                            data: energy,
                            backgroundColor: ["rgba(75,192,192,0.6)"],
                            borderWidth: 4,
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                        },
                        {
                            label: "EXPECTED POWER OUTPUT",
                            data: expectedEnergy,
                            backgroundColor: ["red"],
                            borderWidth: 4,
                            fill: false,
                            borderColor: 'red',
                            tension: 0.1
                        }
                    ]
                })
                
                setLoading2(false)
            }).catch((err)=>{setLoading2(false)
                    setError2(err.message)
            })
            
            
            
        }).catch((err)=>{setLoading2(false)
            setError2(err.message)
            console.log(err.message)
            setLoading(false)
            setError(err.message)
        })
    }
    
    const getPowerDataExpected=(date)=>{
        axios.get('/api/get-power-data-by-date',{params:{date: date}}).then((resp)=>{
            var powerData1=[]
            var hours=[]
            var expectedPower=[]
            var energy=[]
            var expectedEnergy=[]
            var expectedEnergySum=0.00
            var energySum=0.00
            console.log(powerData1)
            for(const elem of resp.data.powerData){
                powerData1.push(parseFloat(elem.power['$numberDecimal']))
                energySum+=elem.power['$numberDecimal']
                energy.push(energySum)
                hours.push(elem.time)
            }

            axios.get('http://surya-disha.herokuapp.com/solar-data').then((resp)=>{
                for(const elem of resp.data["expectedIrradianceData"]){
                    expectedPower.push(0.0049*parseFloat(elem))
                    expectedEnergySum+=(0.0049*parseFloat(elem))
                    expectedEnergy.push(expectedEnergySum)
                   
                }
                setChartDataPowerExpected({
                    labels: hours,
                    datasets:[
                        {
                            label: "POWER OUTPUT (WITHOUT ROTATION)",
                            data: powerData1,
                            backgroundColor: ["rgba(75,192,192,0.6)"],
                            borderWidth: 4,
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                        },
                        {
                            label: "EXPECTED POWER OUTPUT",
                            data: expectedPower,
                            backgroundColor: ["red"],
                            borderWidth: 4,
                            fill: false,
                            borderColor: 'red',
                            tension: 0.1
                        }
                    ]
                })

                setChartEnergy1({
                    labels: hours,
                    datasets:[
                        {
                            label: "ENERGY OUTPUT (WITHOUT ROTATION)",
                            data: energy,
                            backgroundColor: ["rgba(75,192,192,0.6)"],
                            borderWidth: 4,
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                        },
                        {
                            label: "EXPECTED ENERGY OUTPUT",
                            data: expectedEnergy,
                            backgroundColor: ["red"],
                            borderWidth: 4,
                            fill: false,
                            borderColor: 'red',
                            tension: 0.1
                        }
                    ]
                })

                setLoading1(false)
            }).catch((err)=>{setLoading1(false)
                    setError1(err.message)
            })
            
            
            
        }).catch((err)=>{setLoading1(false)
            setError1(err.message)
            console.log(err.message)
            setLoading(false)
            setError(err.message)
        })
    }

    const getEnergyDataExpected=(date)=>{

    }

    const getEnergyDataActual=(date)=>{

    }

    useEffect(()=>{



        // axios.get('/api/get-power-data',{params:{date:"22-05-2021"}}).then((resp)=>{
        //     var powerData=[]
        //     for(const elem of resp.data.powerData){
        //         powerData.push(parseFloat(elem.power['$numberDecimal']))
        //     }
        //     setChartDataPowerExpected({
        //         labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
        //         datasets:[
        //             {
        //                 label: "ACTUAL POWER OUTPUT",
        //                 data: powerData,
        //                 backgroundColor: ["rgba(75,192,192,0.6)"],
        //                 borderWidth: 4,
        //                 fill: false,
        //                 borderColor: 'rgb(75, 192, 192)',
        //                 tension: 0.1
        //             }
        //         ]
        //     })
        // }).catch((err)=>{
        //     setLoading(false)
        //     setError(err.message)
        // })


    },[])

    return (
        <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <div className="dataComparison_header" style={{flex:"0.1",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <h1 style={{fontFamily:"Eurostile"}}>DATA COMPARISON - {dispCurr.toUpperCase()}</h1>
            </div>
            {/* {loading?(<div style={{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><Lottie 
                        options={animOptions}
                        height={400}
                        width={400}
                    /></div>):(<></>)} */}
            {dispCurr==="power"?(<div className="dataComparison_body" style={{width:"100%",flex:"0.8",display:"flex",flexDirection:"row"}}>
            <div className="expectedGraph" style={{flex:"0.5",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
            <div style={{margin:"20px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            
            <p style={{fontFamily:"Eurostile"}}>FIXED MOUNT SOLAR PANEL OUTPUT</p>
            <Dropdown >
                    <Dropdown.Toggle className="btn2" variant="success" id="dropdown-basic">
                       {expectedDateToggle}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={()=>{setLoading1(true);getPowerDataExpected("22-05-2021"); setExpectedDateToggle('22-05-2021')}}>22nd May 2021</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{setLoading1(true);getPowerDataExpected("24-05-2021"); setExpectedDateToggle('24-05-2021')}} >24nd May 2021</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{setLoading1(true);getPowerDataExpected("26-05-2021"); setExpectedDateToggle('26-05-2021')}}>26nd May 2021</Dropdown.Item>
                        
                      </Dropdown.Menu>
             </Dropdown>
             </div>
                    <div style={{width:"90%"}}>{loading1?(<><Lottie 
                        options={animOptions}
                        height={300}
                        width={300}
                    /></>):(<>{error1?(<>{error1}</>):(<Line style={{width:"100%"}}  data={chartDataPowerExpected} options={{responsive: true, title: {text: "EXPECTED POWER",display: true}}}/>)}</>)}</div>
                    
                  
                   
                </div>

                <div className="actualGraph" style={{flex:"0.5",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                <div style={{margin:"20px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                <p style={{fontFamily:"Eurostile"}}>SINGLE AXIS SUN-TRACKING SOLAR PANEL OUTPUT</p>
            <Dropdown >
                    <Dropdown.Toggle className="btn2" variant="success" id="dropdown-basic">
                       {actualDateToggle}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                      <Dropdown.Item onClick={()=>{setLoading2(true);getPowerDataActual("23-05-2021"); setActualDateToggle('23-05-2021')}}>23rd May 2021</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{setLoading2(true);getPowerDataActual("25-05-2021"); setActualDateToggle('25-05-2021')}} >25th May 2021</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{setLoading2(true);getPowerDataActual("27-05-2021"); setActualDateToggle('27-05-2021')}}>27th May 2021</Dropdown.Item>
                      </Dropdown.Menu>
             </Dropdown>
             </div>
                    <div style={{width:"90%"}}>{loading2?(<><Lottie 
                        options={animOptions}
                        height={300}
                        width={300}
                    /></>):(<>{error2?(<>{error2}</>):(<Line style={{width:"100%"}}  data={chartDataPowerActual} options={{responsive: true, title: {text: "POWER",display: true}}}/>)}</>)}</div>
                    
                  
                   
                </div>    
                
            </div>):(<></>)}

            {dispCurr==="energy"?(<div className="dataComparison_body" style={{width:"100%",flex:"0.8",display:"flex",flexDirection:"row"}}>
            <div className="expectedGraph" style={{flex:"0.5",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
            <div style={{margin:"20px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            
            <p style={{fontFamily:"Eurostile"}}>FIXED MOUNT SOLAR PANEL OUTPUT</p>
            <Dropdown >
                    <Dropdown.Toggle className="btn2" variant="success" id="dropdown-basic">
                       {expectedDateToggle}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={()=>{setLoading1(true);getEnergyDataExpected("22-05-2021"); setExpectedDateToggle('22-05-2021')}}>22nd May 2021</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{setLoading1(true);getEnergyDataExpected("24-05-2021"); setExpectedDateToggle('24-05-2021')}} >24nd May 2021</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{setLoading1(true);getEnergyDataExpected("26-05-2021"); setExpectedDateToggle('26-05-2021')}}>26nd May 2021</Dropdown.Item>
                        
                      </Dropdown.Menu>
             </Dropdown>
             </div>
                    <div style={{width:"90%"}}>{loading1?(<><Lottie 
                        options={animOptions}
                        height={300}
                        width={300}
                    /></>):(<>{error1?(<>{error1}</>):(<Line style={{width:"100%"}}  data={chartEnergy1} options={{responsive: true, title: {text: "EXPECTED POWER",display: true}}}/>)}</>)}</div>
                    
                  
                   
                </div>

                <div className="actualGraph" style={{flex:"0.5",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                <div style={{margin:"20px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                <p style={{fontFamily:"Eurostile"}}>SINGLE AXIS SUN-TRACKING SOLAR PANEL OUTPUT</p>
            <Dropdown >
                    <Dropdown.Toggle className="btn2" variant="success" id="dropdown-basic">
                       {actualDateToggle}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                      <Dropdown.Item onClick={()=>{setLoading2(true);getEnergyDataActual("23-05-2021"); setActualDateToggle('23-05-2021')}}>23rd May 2021</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{setLoading2(true);getEnergyDataActual("25-05-2021"); setActualDateToggle('25-05-2021')}} >25th May 2021</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{setLoading2(true);getEnergyDataActual("27-05-2021"); setActualDateToggle('27-05-2021')}}>27th May 2021</Dropdown.Item>
                      </Dropdown.Menu>
             </Dropdown>
             </div>
                    <div style={{width:"90%"}}>{loading2?(<><Lottie 
                        options={animOptions}
                        height={300}
                        width={300}
                    /></>):(<>{error2?(<>{error2}</>):(<Line style={{width:"100%"}}  data={chartEnergy2} options={{responsive: true, title: {text: "POWER",display: true}}}/>)}</>)}</div>
                    
                  
                   
                </div>    
                
            </div>):(<></>)}

            <div style={{flex:"0.1"}}>
            <ButtonGroup aria-label="Basic example">
            <Button style={{backgroundColor:"#4D2969"}} onClick={()=>{setDispCurr('power'); setPowOpen(true); setEnergyOpen(false)}} variant="secondary">Power Generated</Button>
            <Button style={{backgroundColor:"#4D2969"}} onClick={()=>{setDispCurr('energy');setPowOpen(false); setEnergyOpen(true)}} variant="secondary">Energy Produced</Button>
            </ButtonGroup>
            </div>
                
        </div>
    )
}

export default DataComparison
