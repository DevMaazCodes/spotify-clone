console.log(`Let's start JS`)
let currentSong=new Audio();
async function getSongs(){
  let a= await fetch("/songs/");
  let response=await a.text();
  let div=document.createElement("div")
  div.innerHTML=response
  let as=div.getElementsByTagName("a")
  let songs=[];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if(element.href.endsWith(".mp3")) songs.push(element.href.split("songs%5C")[1])
  }
  return songs
}
const playMusic=(track)=>{
    currentSong.src=`/songs/`+track
    play.src="/assets/pause.svg"
    currentSong.play();
}
async function main(){
    let songs=await getSongs()
    let songUL=document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {

        songUL.innerHTML=songUL.innerHTML+`
        
        <li class="flex">
                                <img class="invert" src="assets/music.svg" alt="music">
                                <div class="info">
                                    <div class="songName">${song.replaceAll("%20"," ")}</div>
                                    <div class="songArtist">Maaz</div>
                                </div>
                                <div class="playNow flex justify-center items-center">
                                    <span>Play Now</span>
                                    <img class="invert" src="assets/play.svg" alt="play">
                                </div>
                            </li>`
    }
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",()=>{
            playMusic(e.getElementsByTagName("div")[0].firstElementChild.innerHTML)
        })
    })
    play.addEventListener("click",()=>{
        if(currentSong.paused){
            currentSong.play();
        }
        else{
            currentSong.pause();
            play.src="/assets/play.svg"
        }
    })
    
}
main()