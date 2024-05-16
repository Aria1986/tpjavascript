const url = "https://photos-api-sepia.vercel.app/photos";

//functions
//envoyer une photo à l'API
async function postPics() {
  try {
    const urlPhoto = $("#file").val();
    const description = $("#description").val();
    const data = {
      description: description,
      url: urlPhoto,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    $("#uploadPic")[0].reset();

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des données", error);
  }
}

// récupérer photos correspondant à la recherche
async function getKeywordPics() {
  let keyword = $("#search").val();
  console.log(keyword);
  try {
    const response = await fetch(`${url}/search?description=${keyword}`);
    if (!response) {
      console.log("il n'y a pas de resultats correpondants");
    }
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const picsJson = await response.json();
    $("#galerie").empty();
    showListPics(picsJson);
    $("#formSearch")[0].reset();
  } catch (error) {
    console.error("Erreur lors de la récupération des données", error);
  }
}

//lancer la recherche par mot clef au clic du bouton recherche
$("#btnSearch").click(function (event) {
  event.preventDefault();
  getKeywordPics();
});

//afficher  cartes d'images
function showListPics(pics) {
    console.log(pics.length)
  pics.forEach((pic) => {
    $("#galerie").append(`<div class="col">
        <div class="card shadow">
            <a href="${pic.url}" data-lightgallery="image-set" class="gallery-item">
            <img class="card-img-top" src="${pic.url}"/></a>
            <div class="card-body">
                <p class="card-text"> ${pic.description}</p>
                <div id="modif${pic.id}" class ="d-none">
                    <textarea >${pic.description}</textarea>
                    <button class="btn btn-primary m-2" onclick="modifyDescription(${pic.id}, '${pic.url}')">valider modif</button>
                </div>
                <button class="btn btn-danger" onclick="deletePic(${pic.id})">Supprimer</button>
               <button class="btn btn-primary" onclick="afficherInputModif(${pic.id})" > modifier<i class="fa-solid fa-pen"></i></button>
            </button>
        </div></div>`);
  });
}

//récupérer et afficher toutes les photos de l'API
async function getPics() {
  try {
    const response = await fetch(url);
    const picsJson = await response.json();
    showListPics(picsJson);
  } catch (error) {
    console.error("Erreur lors de la récupération des données", error);
  }
}

//supprimer une photo à partir de son id
async function deletePic(id) {
  const options = {
    method: "DELETE",
  };

  try {
    const response = await fetch(`${url}/${id}`, options);
    const responseData = await response.json();
    console.log("Data deleted successfully:", responseData);
  } catch (error) {
    console.error("Error deleting data:", error);
  }
}

async function getPic(id) {
  try {
    const response = await fetch(`${url}/${id}`);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error deleting data:", error);
  }
}

//afficher un input pour pouvoir modifier la description de photo
function afficherInputModif(id) {
  $(`#modif${id}`).removeClass("d-none");
  $(`#modif${id}`).addClass("d-block");
}

//modifier description de photo
async function modifyDescription(id, urlPic) {
  $(`#modif${id}`).removeClass("d-block");
  $(`#modif${id}`).addClass("d-none");
  let description = $(`#modif${id} >textarea`).val();
  let newData = {
    description: description,
    url: urlPic,
  };
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  };
  try {
    const response = await fetch(`${url}/${id}`, options);
    const responseData = await response.json();
    console.log("Data modify successfully:", responseData);
  } catch (error) {
    console.error("Error modifying data:", error);
  }
}

//    agrandir photo en cliquant dessus
$(document).ready(function () {
  $("#galerie").lightGallery({
    thumbnail: true,
    loop: true,
    shareButtons: true,
  });
});

//ajouter une photo et l'afficher dans la galerie
$("#uploadPic").submit(function (e) {
  e.preventDefault();
  postPics();
  getPics();
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

$(document).ready(function () {
  getPics();
});
