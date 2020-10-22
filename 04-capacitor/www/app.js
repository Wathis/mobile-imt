
async function addPhotoToGallery() {
    const image = await capacitorExports.Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: capacitorExports.CameraResultType.Uri
    });
    var imageUrl = image.webPath;
    presentModal(imageUrl);
}
customElements.define('modal-page', class extends HTMLElement {

    connectedCallback() {
        const myModal = document.querySelector('ion-modal');
        const imgSrc = myModal.componentProps.imgSrc;
        this.innerHTML = `
        <ion-header>
          <ion-toolbar>
            <ion-title>Création artice privé</ion-title>
            <ion-buttons slot="primary">
              <ion-button onClick="dismissModal()">
                <ion-icon slot="icon-only" name="close"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            
            <img src="${imgSrc}" width="200" />
           
            <ion-item>
              <ion-label position="floating">Titre</ion-label>
              <ion-input id="titre"></ion-input>
            </ion-item>
            
            <ion-item>
              <ion-label position="floating">Description</ion-label>
              <ion-input id="description"></ion-input>
            </ion-item>
            
            <ion-button expand="block" onClick="addArticle()">Ajouter</ion-button>
        </ion-content>`;
    }
});

let modalElement;

async function addArticle() {
    console.log(document.getElementById('titre').value);
    console.log(document.getElementById('description').value);
    await modalElement.dismiss({
        'title': document.getElementById('titre').value,
        'description': document.getElementById('description').value,
    });
}
async function dismissModal() {
    await modalElement.dismiss({
    });
}

async function presentModal(imgSrc) {
    // create the modal with the `modal-page` component
    modalElement = document.createElement('ion-modal');
    modalElement.component = 'modal-page';
    modalElement.cssClass = 'my-custom-class';
    modalElement.componentProps = {
        'imgSrc': imgSrc
    };

    // present the modal
    document.body.appendChild(modalElement);
    modalElement.present();
    const {data} = await modalElement.onWillDismiss();
    if (data.title) {
        data.imgSrc = imgSrc
        document.getElementById('customArticle').innerHTML = buildArticle(data);
        const bannerImage = document.getElementById('imgCustomArticle');
        const imgData = getBase64Image(bannerImage);
        data.imgSrc = "data:image/png;base64," + imgData;
        await capacitorExports.Storage.set({
            key: 'customArticle',
            value: btoa(JSON.stringify(data))
        });
    }
}

function buildArticle(article) {
    return `<ion-card>
                <img id="imgCustomArticle" src="${article.imgSrc}" />
                <ion-card-header>
                    <ion-card-title class="title-card">${article.title}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                ${article.description}
                </ion-card-content>
            </ion-card>`;
}

async function loaded() {
    let articlesString = await capacitorExports.Storage.get({
        key: 'customArticle'
    });
    if (articlesString !== undefined && articlesString.value.length > 0) {
        let customArticle = await JSON.parse(atob(articlesString.value));
        document.getElementById('customArticle').innerHTML = buildArticle(customArticle);
    }
}
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}
fetch(`https://devfest-nantes-2018-api.cleverapps.io/blog`)
    .then(res => res.json())
    .then(confs => {

        const html = confs.map((conf) => {
            return `<ion-card>
                <img src="https://devfest2018.gdgnantes.com${conf.image}" />
                <ion-card-header>
                    <ion-card-title class="title-card">${conf.title}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                ${conf.brief}
                </ion-card-content>
            </ion-card>`
        } );
        document.getElementById("confs").innerHTML = html.join("");
        loaded();
    })


