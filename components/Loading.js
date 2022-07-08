import { Circle } from "better-react-spinkit"

function Loading (){

    return(
        <center style={{display:"grid", placeItems:"center",height:"100vh"}}>
            <div>
                <img src="https://www.pinclipart.com/picdir/big/206-2065907_whatsapp-clipart.png"
                alt=""
                height= {200}
                style ={{marginBottom: 10 }}
                />
                <Circle color="#189D0E" size={60}/>
            </div>
        </center>
    )
}

export default Loading;