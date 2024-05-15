$(document).ready(function(){
    const url = "https://photos-api-sepia.vercel.app/photos";

    //functions
    async function postPics(url, data){
        try{
           
            const response = await fetch(url,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json", 
                }, 
            });
           
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
        }
        catch (error) {
            console.error('Erreur lors de la récupération des données', error);
        }
    }

    async function getPics(){
        try{
            const response = await fetch(url)
            const picsJson = await response.json()
            picsJson.forEach(pic=>{
                console.log(pic.url)
            $("#galerie").append(`<div class="col">
            <div class="card shadow">
                <img class="card-img-top" src="${pic.url}"/>
                <div class="card-body">
                    <p class="card-text"> ${pic.description}</p>
                </div>
            </div></div>`)
            })  
            }  
        catch (error) {
            console.error('Erreur lors de la récupération des données', error);
        }
    }
    getPics()

    $("#fileInput").change(function(e){
        const selectedFile = e.target.files[0];
        $("#uploadPic").submit(function() {
            const reader = new FileReader();
            reader.onload = function(event) {
            const fileContent = event.target.result;
                console.log(fileContent)
           
            };
            reader.readAsDataURL(selectedFile);
        });
    });
})
