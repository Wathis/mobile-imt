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
        document.getElementById("confs").innerHTML = html.join("")
    })


    function addPhotoToGallery() {

    }