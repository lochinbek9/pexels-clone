"use strict";

const searchBtn = document.querySelector(".search-photos-btn");
const loadingSpinner = document.getElementById("loadingSpinner");

let currentPage = 1;
const imagesPerPage = 10; /* show image at a time 10 */
let loading = false; /* show loading at image load otherwise/default false */
let keyword = "nature";

async function searchPhotos(){
    loading = false;
    showLoadingSpinner();
    keyword  = document.getElementById("searchInput").value;
    const photoContainer = document.getElementById("photo-container");
    currentPage = 1;
    photoContainer.innerHTML = "";
    loadMoreImages();
}

async function loadMoreImages(){
    if(loading){
        return 0;
    } 

    const photoContainer = document.querySelector("#photo-container");
    loading = true;

    if(loading){
        showLoadingSpinner();
    }
    for(let i = 0; i < imagesPerPage; i++){
        const uniqeURL = `https://source.unsplash.com/random/?${keyword}`;
        try{
            const response = await fetch(uniqeURL);
            const finalURL = response.url;

            const photoBox = createPhotoBox(finalURL, `Image ${i + 1}`);

            photoContainer.appendChild(photoBox)
        } 
        catch(error){
            console.log(error);
        }
    }
}

function createPhotoBox(imageURL, altText){
    const photoBox  = document.createElement("div");
    photoBox.classList.add("photo-box");

    const img = document.createElement("img");
    img.src = imageURL;
    img.alt = altText;
    photoBox.appendChild(img);

    const downloadBtn = document.createElement("button");
    downloadBtn.classList.add("photo-download-btn");
    downloadBtn.innerHTML = '<i class="fa-solid fa-download"></i>';
    photoBox.appendChild(downloadBtn);

    return photoBox;
}

// show loading spinner function

function showLoadingSpinner(){
    loadingSpinner.style.display = "block";
}
