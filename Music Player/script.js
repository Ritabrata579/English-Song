var audio , playbtn , title , poster , artists , seekslider , seeking=false , seekto, currenttimetext , durationtimetext , playlist_status , dir , playlist , ext , agent , playlists_artists , repeat , random;

dir = "music/";
playlist = ["Cadmium - Melody (ft. Jon Becker) (Lyrics Video)" , "Ed Sheeran - Shape of you lyrics" , 
"Enrique Iglesias - Hero (Official Music Video)","Enrique Iglesias - Somebody's Me (Lyrics)","Enrique Iglesias - Why Not Me lyrics",
"I Just Wanna Spend My Life With You (With Lyrics)","Imagine Dragons - Believer (with lyrics)",
"Justin Bieber - Despacito (Lyrics Letra) ft. Luis Fonsi & Daddy Yankee","Katy Perry - Unconditionally (Lyrics)",
"Let Me Love You - Lyrics KHS India","Shawn Mendes, Camila Cabello - Señorita (Lyrics)","Sia - Cheap Thrills ( Lyrics )",
"The Chainsmokers - Closer (Lyrics) ft. Halsey","Celine Dion - My Heart Will Go On (8D AUDIO)","DJ Snake - Taki Taki (8D AUDIO) ft. Selena Gomez, Ozuna, Cardi B",
"DHARIA - sugar & brownies ( lyrics )","Maroon 5 - Memories (Lyrics)","YouTube Enrique Iglesias Wish I Was Your Lover Lyrics"]

title =["Cadmium - Melody" , "Shape of you" , "Hero","Somebody's Me","Why Not Me","Spend My Life","Believer"," Despacito","Unconditionally",
"Let Me Love You","Señorita","Cheap Thrills","Closer","My Heart Will Go On","Taki Taki","sugar & brownies","Memories","Wish I Was Your Lover"]
poster=["images/1.jpg","images/2.jpg","images/3.jpg","images/4.jpg","images/5.jpg","images/6.jpg","images/7.jpg",
"images/1.jpg","images/2.jpg","images/3.jpg","images/4.jpg","images/5.jpg","images/6.jpg","images/7.jpg","images/2.jpg","images/3.jpg",
"images/4.jpg","images/5.jpg"]
artists=["Jon Becker", "Ed Sheeran","Enrique Iglesias","Enrique Iglesias","Enrique Iglesias","Nill & Nikki","Imagine Dragons",
"Justin Bieber","Katy Perry","Justin Bieber"," Camila Cabello","Sia","Halsey","Celine Dion","Selena Gomez","DHARIA",
"Tones & Dance Monkey","Enrique Iglesias"]

playlist_index = 0;

ext =".mp3"
agent = navigator.userAgent.toLowerCase();
if(agent.indexOf('firefox') != -1 || agent.indexOf('opera') != -1){
    ext=".ogg";
}
playbtn = document.getElementById("playpausebtn");
nextbtn = document.getElementById("nextbtn");
prevbtn = document.getElementById("prevbtn");
seekslider = document.getElementById("seekslider");
currenttimetext = document.getElementById("currenttimetext");
durationtimetext = document.getElementById("durationtimetext");
playlist_status = document.getElementById("playlist_status");
playlists_artists = document.getElementById("playlist_artist");
repeat = document.getElementById("repeat");
randomSong = document.getElementById("random");

audio = new Audio();
audio.src = dir+playlist[0]+ext;
audio.loop = false;

playlist_status.innerHTML = title[playlist_index];
playlists_artists.innerHTML = artists[playlist_index];

playbtn.addEventListener("click",playPause);
nextbtn.addEventListener("click",nextSong);
prevbtn.addEventListener("click",prevSong);
seekslider.addEventListener("mousedown" , function(event){ seeking=true; seek(event);});
seekslider.addEventListener("mousemove",function(event){ seek(event);});

seekslider.addEventListener("mouseup", function(){seeking=false;});

audio.addEventListener("timeupdate",function(){seektimeupdate();});
audio.addEventListener("ended",function(){
    switchTrack();
});
repeat.addEventListener("click",loop);
randomSong.addEventListener("click",random);




//functions

function fetchMusicDetail(){
    $("#image").attr("src",poster[playlist_index]);

    playlist_status.innerHTML = title[playlist_index];
    playlist_artist.innerHTML = artists[playlist_index];

    audio.src = dir+playlist[playlist_index]+ext;
    audio.play();
}


function getRandomNumber(min , max){
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return result;
}

function random(){
    let randomIndex = getRandomNumber(0 , playlist.length-1);
    playlist_index = randomIndex;
    fetchMusicDetail();
    document.querySelector(".playpause").classList.add("active");
}

function loop(){
    if(audio.loop){
        audio.loop = false;
        document.querySelector(".loop").classList.remove("active");
    }else{
        audio.loop = true;
        document.querySelector(".loop").classList.add("active");
    }
}

function nextSong(){
    document.querySelector(".playpause").classList.add("active");
    playlist_index++;
    if(playlist_index > playlist.length - 1){
        playlist_index = 0;
    }
    fetchMusicDetail();
}
function prevSong(){
    document.querySelector(".playpause").classList.add("active");
    playlist_index--;
    if(playlist_index < 0){
        playlist_index = playlist.length - 1;
    }
    fetchMusicDetail();
}

function playPause(){
    if(audio.paused){
        audio.play();
        document.querySelector(".playpause").classList.add("active");
    }else{
        audio.pause();
        document.querySelector(".playpause").classList.remove("active");
    }
}

function switchTrack(){
    if(playlist_index == (playlist.length - 1)){
        playlist_index = 0;
    }else{
        playlist_index++;
    }
    fetchMusicDetail();
}

function seek(event){
    if(audio.duration == 0){
        null
    }else{
        if(seeking){
            seekslider.value = event.clientX - seekslider.offsetLeft;
            seekto = audio.duration * (seekslider.value / 100);
            audio.currentTime = seekto;
        }
    }
}

function seektimeupdate(){
    if(audio.duration){
        var nt = audio.currentTime * (100 / audio.duration);
        seekslider.value = nt;
        var curmins = Math.floor(audio.currentTime / 60); 
        var cursecs = Math.floor(audio.currentTime - curmins * 60); 
        var durmins = Math.floor(audio.duration / 60); 
        var dursecs = Math.floor(audio.duration - durmins * 60); 
        if(cursecs < 10){ cursecs = "0"+cursecs; }
        if(dursecs < 10){ dursecs = "0"+dursecs; }
        if(curmins < 10){ curmins = "0"+curmins; }
        if(durmins < 10){ durmins = "0"+durmins; }
        currenttimetext.innerHTML = curmins+":"+cursecs;
        durationtimetext.innerHTML = durmins+":"+dursecs;
    }else{
        currenttimetext.innerHTML = "00"+":"+"00";
        durationtimetext.innerHTML = "00"+":"+"00";
    }
}

let checkbox = document.querySelector('input[name=theme]');
checkbox.addEventListener('change',function(){
    if(this.checked){
        document.documentElement.setAttribute('data-theme','dark');
    }else{
        document.documentElement.setAttribute('data-theme','light');
    }
})
