

    const url = "https://photos-api-sepia.vercel.app/photos";

//functions
    //envoyer une photo à l'API
    async function postPics(){
        try{    
            const urlPhoto= $('#file').val()
            const description = $("#description").val()
            const data={
                "description": description,
                "url": urlPhoto
            }
            console.log(data)
            const response = await fetch(url,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json", 
                }, 
                body: JSON.stringify(data), 
            });
           
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }          
        }
        catch (error) {
            console.error('Erreur lors de la récupération des données', error);
        }
    }
    $("#uploadPic").submit(function(e){
        e.preventDefault();
       
        postPics()
    })


// récupérer photos correspondant à la recherche 
    async function getKeywordPics(){
        let keyword = $("#search").val()
        try{
            console.log(`${url}?description={${keyword}}`)
            const response = await fetch(`${url}?description={${keyword}}`)
            if (!response){
                console.log("il n'y a pas de resultats correpondants")
            }
            
            const picsJson = await response.json()
            $("#galerie").empty()
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
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            }  
        catch (error) {
            console.error('Erreur lors de la récupération des données', error);
        }
    }
    //lancer la recherche par mot clef au clic du bouton recherche
    $("#btnSearch").click(function(event) {
        event.preventDefault(); 
        getKeywordPics(); 
    });




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

//    agrandir photo en cliquant dessus 
   $(document).ready(function() {
      $('#galerie').lightGallery({
        thumbnail: true,
        loop: true,
        shareButtons: true
      });
    });

//charger une photo depuis un pc
    // $("#fileInput").change(function(e){
    //     const selectedFile = e.target.files[0];
    //     $("#uploadPic").submit(function() {
    //         const reader = new FileReader();
    //         reader.onload = function(event) {
    //         const fileContent = event.target.result;
    //         if (selectedFile) {
    //             // Get the image URL
    //             const fileURL = URL.createObjectURL(selectedFile);
    //             // Use the fileURL for further processing or display
    //             console.log("Image URL:", fileURL);
    //           }
           
    //         };
    //         reader.readAsDataURL(selectedFile);
    //     });
    // });



$(document).ready(function(){
    getPics();
 
})