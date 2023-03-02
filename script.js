window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Location1',
            location: {
                // decomment the following and add coordinates:
                // lat: <your-latitude>,
                // lng: <your-longitude>,
                /* lat: 13.7366431,
                lng: 100.5156104, */
                 lat: 13.737445,
                 lng: 100.516367,
            },
        },
        {
            name: 'Location2 G-Map',
            location: {
                 lat: 13.737529,
                 lng: 100.5142853,
            },
        },
    ];
}

var models = [
    {
        url: 'assets/TBear.gltf',
        scale: '1 1 1',
        info: 'TBear, Lv. 1, HP 10/10',
        rotation: '0 180 0',
        position:'0 0 -200',
    },
    {
        url: 'assets/TBear2.gltf',
        scale: '1 1 1',
        info: 'TBear, Lv. 2, HP 20/20',
        rotation: '0 180 0',
        position:'0 0 -200',
    },
    {
        url: 'assets/asset.gltf',
        scale: '1 1 1',
        info: 'TBear, Lv. 3, HP 30/30',
        rotation: '0 180 0',
        position:'0 0 -200',
    },
];

var modelIndex = 0;
var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}