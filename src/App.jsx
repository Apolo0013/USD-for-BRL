import './App.css';
import { useState, useRef, useEffect } from 'react'
//import Info from "./componentes/Info.jsx"


function App() {
    async function PegarCota() {
        try {
            const Cota = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL')
            const Json = await Cota.json()
            const CotaFormat = String(Number(Json.USDBRL.bid).toFixed(2)).replace('.', ',')
            CotaAnterior.current = CotaFormat

            return CotaFormat
        }
        catch (error) {
            console.log('erro')
        }
    }


    async function AddCotar() {
        const CotaFormat = await PegarCota()
        console.log(CotaAnterior.current !== CotaFormat && CotaAnterior.current !== null)
        if (CotaAnterior.current !== CotaFormat && CotaAnterior.current !== null) {  
            SetClassCota(ListClassCota.join(' '))
            console.log('add class')
            setTimeout(() => {
                SetCota(CotaFormat)
            }, 3600)
            setTimeout(() => {
                console.log('remove class')
                SetClassCota(ListClassCota[0] + ' ' + ListClassCota[1])
            }, 7000)
        }
    }



    const [cota, SetCota] = useState('')
    let ListClassCota = ['reais', 'din', 'trocar', 'rodar']
    const [ClassCota, SetClassCota] = useState(ListClassCota[3])
    const CotaAnterior = useRef(null)


    useEffect(() => {
        async function Chama() {
            setTimeout(async () => {
                SetClassCota(ListClassCota[0] + ' ' + ListClassCota[1])
                SetCota(await PegarCota())
            } , 1000)
        }
        Chama()
        setInterval(() => {
            AddCotar()
        }, 12000)
    })

    
    return (
        <div className="App">
            <div className="cotacao">
                <div className="textmoney">
                    <p className="reais sim">R$</p>
                    <div className="ConteinerDinheiro">
                        <p className={ClassCota}>{ cota }</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
