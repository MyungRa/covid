import { useState, useEffect } from 'react'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import axios from 'axios'

const Contents = () => {

    const [confirmedData, setconfirmedData] = useState({})
    const [quarantinedData, setQuarantinedData] = useState({})
    const [comparedData, setComparedData] = useState({})

    useEffect(() => {

        const fetchEvents = async () => {
            const res = await axios.get("https://api.covid19api.com/total/dayone/country/kr")
            makeData(res.data)
        }
        const makeData = (items) => {
            const arr = items.reduce((acc, cur) => {
                const currentDate = new Date(cur.Date)
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth();
                const date = currentDate.getDate();
                const confirmed = cur.Confirmed;
                const active = cur.Active;
                const death = cur.Deaths;
                const recovered = cur.Recovered;

                const findItem = acc.find(a => a.year === year && a.month === month);

                if(!findItem){
                    acc.push({year, month, date, date, confirmed, active, death, recovered})
                }
                if(findItem && findItem.date < date){
                    findItem.year = year;
                    findItem.month = month;
                    findItem.date = date;
                    findItem.confirmed = confirmed;
                    findItem.active = active;
                    findItem.death = death;
                    findItem.recovered = recovered;
                }
                
                return acc;
            }, [])

            const labels = arr.map(a => `${a.month+1}월`)
            setconfirmedData({
                labels,
                datasets: [
                    {
                        label: "국내 누적확진자",
                        backgroundColor: "salmon",
                        fill: true,
                        data: arr.map(a => a.confirmed),
                    },
                ],
            })
            setQuarantinedData({
                labels,
                datasets: [
                    {
                        label: "월별 격리자 현황",
                        borderColor: "teal",
                        fill: false,
                        data: arr.map(a => a.active)
                    },
                ]
            })
            const last = arr[arr.length - 1]
            setComparedData({
                labels: ["확진자", "격리해제", "사망"],
                datasets: [
                    {
                        backgroundColor: ["navy", "skyblue", "gray"],
                        borderColor: ["navy", "skyblue", "gray"],
                        fill: false,
                        data: [last.confirmed, last.recovered, last.death]
                    },
                ]
            })
        }

        fetchEvents()

    }, [])

    return (
        <section>
            <div className="bar-contents">
                <p style={{fontSize: 32, fontWeight: 'bold'}}>국내 코로나 현황</p>
                <div className="bar">
                    <Bar data={confirmedData} width={1000} height={400} options={
                        {
                            plugins: {
                            legend: { display: true, position: "bottom"},
                            title: { display: true, text: "누적 확진자 추이", fontSize:16 }
                            },
                            maintainAspectRatio: false
                        }
                    }
                    />
                </div>
            </div>
            <div className="line-contents">
                <div className="line">
                    <Line data={quarantinedData} width={1000} height={400} options={
                        {
                            plugins: {
                            legend: { display: true, position: "bottom"},
                            title: { display: true, text: "월별 격리자 현황", fontSize:16 }
                            },
                            maintainAspectRatio: false
                        }
                    }
                    />
                </div>
            </div>
            <div className="doughnut-contents">
                <div className="doughnut">
                    <Doughnut data={comparedData} width={1000} height={400} options={
                        {
                            plugins: {
                            legend: { display: true, position: "bottom"},
                            title: { display: true, text: "누적 확진, 격리 해제, 사망", fontSize:16 }
                            },
                            maintainAspectRatio: false
                        }
                    }
                    />
                </div>
            </div>
            <p style={{textAlign: "center", fontSize: 32, fontWeight: 'bold'}}>코로나 예방 행동수칙</p>
            <div className="poster">
                <div className="poster-box">
                </div>
                <div className="mask-box">
                </div>
            </div>
            <p style={{textAlign: "center", fontSize: 32, fontWeight: 'bold'}}>관련 기관</p>
            <div className="call">
                <ul className="call-list">
                    <li>
                        😷
                        <a style={{fontSize: 20, fontWeight: 'bold'}} href="https://www.mohw.go.kr/react/popup_200128.html" target="_blank">
                        국민안심병원 현황
                        </a>
                    </li>
                    <li>
                        😷
                        <a style={{fontSize: 20, fontWeight: 'bold'}} href="http://www.mohw.go.kr/react/index.jsp" target="_blank">
                        보건복지부
                        </a>
                    </li>
                    <li>
                        😷
                        <a style={{fontSize: 20, fontWeight: 'bold'}} href="http://www.kdca.go.kr/index.es?sid=a2" target="_blank">
                        질병관리청
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Contents
