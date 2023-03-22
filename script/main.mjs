
const temperature = document.getElementsByClassName('temperature-value')[0];
const feelValueData = document.getElementById('feel-like-data');
const image = document.getElementById('weather-condition-img');
let countryName;

document.getElementById("country-name")
    .addEventListener('keyup', function(event) {
    event.preventDefault();
    if (event.code === 'Enter') {
      countryName=document.getElementById("country-name");
      dataGetter();
    }
});

document.getElementById("country-name")
    .addEventListener('click', function() {
      document.getElementById('dropDown')
      .classList.toggle("hide");
    })

 const dropDownValue = document.getElementsByClassName('dropDownValue')
for(let i=0;i<dropDownValue.length;i++){
  dropDownValue[i].addEventListener('click',function(){
   countryName = dropDownValue[i].innerHTML;
   document.getElementById("country-name").value=countryName;

   dataGetter();
   document.getElementById('dropDown')
      .classList.toggle("hide");
  })
}



async function dataGetter(){
const response = await fetch(`http://localhost:8000/`)
.then((res)=>{
   return (res.json()) ;

}).then((data)=>{
   
  for(let i=0;i<data.length;i++){
    if(data[i].location === countryName)
    {
      temperature.innerHTML = `${data[i].temp}  <sup style="font-size: 32px;">&#8451</sup> `;
      feelValueData.innerHTML = `Feels ${data[i].feelsLike} <sup style="font-size: 20px;">&#8451</sup> `;    
      if(data[i].temp<10)
        image.src = "./img/rainy.png";
      else if(data[i].temp >= 10&&data[i].temp < 20)
        image.src = "./img/cloudy.png";
      else
        image.src = "./img/sunny.png";
    }
  }


})

}

