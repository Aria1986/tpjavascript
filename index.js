$(document).ready(function(){
    const url = "https://photos-api-sepia.vercel.app/photos";

    //functions
    //envoyer une photo à l'API
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


    //récupérer et afficher toutes les photos de l'API
    async function getPics(){
        try{
            const response = await fetch(url)
            const picsJson = await response.json()
            picsJson.forEach(pic=>{
                console.log(pic.url)
            $("#galerie").append(`<div class="col">
            <div class="card shadow">
                <a href="${pic.url}" data-lightgallery="image-set" class="gallery-item">
                <img class="card-img-top" src="${pic.url}"/></a>
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

   $(document).ready(function() {
      $('#galerie').lightGallery({
        thumbnail: true,
        loop: true,
        shareButtons: true
      });
    });

//charger une photo depuis un pc
    $("#fileInput").change(function(e){
        const selectedFile = e.target.files[0];
        $("#uploadPic").submit(function() {
            const reader = new FileReader();
            reader.onload = function(event) {
            const fileContent = event.target.result;
            if (selectedFile) {
                // Get the image URL
                const fileURL = URL.createObjectURL(selectedFile);
                // Use the fileURL for further processing or display
                console.log("Image URL:", fileURL);
              }
           
            };
            reader.readAsDataURL(selectedFile);
        });
    });

//application des fonctions
getPics()


})
