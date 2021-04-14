$(document).ready(function(){
    let next = 'https://pokeapi.co/api/v2/pokemon/'
    $('#next').click(function(e){
        e.preventDefault();
        $('#info__div').html("");
        getPoke();
    })
    
        function getPoke(){
            fetch(next)
            .then(function(response){
                return response.json();
            })
            .then(function(response){ 
                next = response.next        
                response.results.forEach(function(info) {
                    
                    let card = `<div class="card" style="width: 18rem;">
                    <img src="..." class="card-img-top" alt="..." id="image__${info.name}">
                    <div class="card-body">
                        <h5 class="card-title">${info.name}</h5>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal_${info.name}">¡Quiero saber más de este pokémon!</button>
                    </div>
                    </div>`

                    let details = `<p> ${info.name} </p>`
                    
                    let button = `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal_${info.name}">¡Quiero saber más de este pokémon!</button>`
                    
                    poke = info.url 
                    getDetails(info.url)  
                    

                    $('#info__div').append(card)
                    
                });
            })
             
        }
    
    function getDetails(url_pokemon){
        let pokemon 
        let modal
        fetch(url_pokemon)
        .then(function(response){
            return response.json();
        })

        .then(function(response){
               console.log(response)
                pokemon = response
                modal = `<div class="modal fade" id="modal_${response.name}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">${response.name}</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div id="divmodal__${response.name}">
                             
                        </div>

                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#submodal__${response.name}" data-bs-dismiss="modal">
                            Ver Relaciones de daño
                        </button>
                          
                        

                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                      </div>
                    </div>
                  </div>`

                  
                  $('#info__div').append(modal)
                  $("#image__"+(response.name)).attr("src",response.sprites.front_default)
                  
                  $("#divmodal__"+(response.name)).append(readAbility(response.abilities))

                  $("#divmodal__"+(response.name)).append("<br>")
                  $("#divmodal__"+(response.name)).append(readType(response.types))
                  $("#divmodal__"+(response.name)).append("<br>")
                  $("#divmodal__"+(response.name)).append(readMove(response.moves))
                  $("#divmodal__"+(response.name)).append("<br>")
                  $("#divmodal__"+(response.name)).append(readGen(response.game_indices))
                  

                  modal2 = `<div class="modal overflow fade" id="submodal__${response.name}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">${response.name}</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div id="divsubmodal__${response.name}">
                            <h4>Double Damage To</h4>
                            <div id="divdouble_damage_to__${response.name}"></div>
                            <h4>Double Damage from</h4>
                            <div id="divdouble_damage_from__${response.name}"></div>
                            
                            <h4>Half Damage To</h4>
                            <div id="divhalf_damage_to__${response.name}"></div>
                            <h4>Half Damage from</h4>
                            <div id="divhalf_damage_from__${response.name}"></div>
                            
                            <h4>No Damage To</h4>
                            <div id="divno_damage_to__${response.name}"></div>
                            <h4>No Damage from</h4>
                            <div id="divno_damage_from__${response.name}"></div>
                        </div>

                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                      </div>
                    </div>
                  </div>`

                $('#info__div').append(modal2)
                getTypeURL(response.types, response.name)

                modal3 = `<div class="modal overflow fade" id="abilitymodal__${response.name}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">${response.name}</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div id="divsubmodal__${response.name}">
                        <h4>Ability Modal</h4>
                        <div id="divdouble_damage_to__${response.name}"></div>
                        <h4>Double Damage from</h4>
                        <div id="divdouble_damage_from__${response.name}"></div>
                        
                        <h4>Half Damage To</h4>
                        <div id="divhalf_damage_to__${response.name}"></div>
                        <h4>Half Damage from</h4>
                        <div id="divhalf_damage_from__${response.name}"></div>
                        
                        <h4>No Damage To</h4>
                        <div id="divno_damage_to__${response.name}"></div>
                        <h4>No Damage from</h4>
                        <div id="divno_damage_from__${response.name}"></div>
                    </div>

                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                  </div>
                </div>
              </div>`
              
            $('#info__div').append(modal3)
            })
    }
    
    function getTypeURL(arr,pokeName){
        let text = ""
        arr.forEach(function(info){
            text = info.type.url
            readDamage(text,pokeName)
        })

        
    }

    function readDamage(url, pokeName){
        fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(response){
            //console.log(response.damage_relations)

            for (var key in response.damage_relations){
                let x = response.damage_relations[key]
                //console.log(key)   
                x.forEach(function(info){
                    //console.log(info.name)
                    $("#div"+(key)+"__"+(pokeName)).append(info.name + " ")

                })
                // if (key == "name") doSomething();
            }

            //response.damage_relations.forEach(function(info){
            //    console.log(info)
                //text = info.type.url
                //readDamage(text,div)
            //})
            //$(div).append(text)
        })
    }


    function readGen(arr){
        let text = ""
        arr.forEach(function(info){
            text = text + " " + info.version.name
        })
        return text
    }

    function readAbility(arr){
        let text = ""
        arr.forEach(function(info){
            text = text + " " + "<li>"+(info.ability.name) + "<button type='button' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#abilitymodal__${response.name}' data-bs-dismiss='modal'> Ver otros pokemon con la misma habilidad </button></li>" 
        })
        return text
    }

    function readType(arr){
        let text = ""
        arr.forEach(function(info){

            text = text + " " + info.type.name
        })
        return text
    }

    function readMove(arr){
        let text = ""
        let count = 1
        arr.forEach(function(info){

            if(count <= 5 ) {text = text + " " + info.move.name}
            count += 1
        })
        return text
    }
})