
$(document).ready( function(){
    $(".content-wrapper").load("/s20jqueryajax4.1_DEV.1/views/general.html")
    loadView("/s20jqueryajax4.1_DEV.1/views/general.html", "general")
})


// vista general

$(".links button").click( event => {
    event.preventDefault()

  let view = event.target.dataset.viewTarget
  console.log(view)
  let url = `/s20jqueryajax4.1_DEV.1/views/${view}.html`
    console.log(url)

    console.log(event.target)

  loadView(url, view)

})

// Cambio de vistas
const loadView = (url, view) => {

    $('.content-wrapper').load(url, () => {
      console.log(view)
      switch ( view ){
  
          case "general" :
          //alert("vista general")
          getAllPost()
          break
  
          case "login" :
          //alert("login")
          break
          
          case "createaccount" :
          //alert("Registrate")
          break
          
          case "newpost" :
          //alert("Crea un nuevo post")
          break
          
          default:
          //alert("cargando home...")
      }
    })
  
  }

// Obtener datos del formilario en newpost.html
  const getPostData = () => {
    let userObject = {}
    $(".div-post .form-post textarea").each( function () {
      let property = this.name
      let value = this.value
  
      userObject = {...userObject, [property]:value}
    } )
    userObject = {...userObject, id: new Date().getTime()}
    console.log(userObject)
    savePost( userObject )
  }
// guardar datos en firebase
  const savePost = postData => {
    $.ajax({
      method:"post",
      url:"https://ajaxclass-1ca34-91895-default-rtdb.firebaseio.com/11g/DEV/post/.json",
      data:JSON.stringify( postData ),
      success: response => {
        console.log( response )
      },
      error: error => {
        console.log( error )
      }
    })
  }

// Llamamos todas las llaves y las enviamos a printPost( response ) como parametro las llaves=Response
const getAllPost = () => {
  console.log("getting Post")
  $.ajax({
    method:"GET",
    url:"https://ajaxclass-1ca34-91895-default-rtdb.firebaseio.com/11g/DEV/post/.json",
    success: response => {
      console.log( response )
      printPost( response )
    },
    error: error => {
      console.log( error )
    }
  })
}

// Imprimir las card con el pareametro response=postCollection 
const printPost = postCollection => {
console.log(postCollection)
  console.log("Imprimiendo Post")

  $(".post-wrapper").empty()
  $(".post-wrapper-short").empty()

  Object.keys ( postCollection ).forEach( post => {
    let { title, content, img, tags, date } = postCollection[post]

      let postCard = `
        <div class="card mb-3 articulo">
          <div class="card">
            <img src="${ img }" alt="">
            <div class="card-body">
              <h5 class="card-title">${ title }</h5>
              <p>${ content }</p>
              <p>${ tags }</p>
              <p>${ date }</p>
            </div>
          </div>
        </div>
`


let postCardShort = `
<div class="card mb-3">
  <div class="card mb-3">
    <img src="${ img }" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${ title }</h5>
      <p>${ content }</p>
      <p class="card-text"><small class="text-muted">${ tags }</small></p>
    </div>
  </div>
</div>
`

      $(".post-wrapper").append(postCard)
      $(".post-wrapper-short").append(postCardShort)
  })
}


document.addEventListener("keyup", e => {
if(e.target.matches("#buscador")){
  document.querySelectorAll("articulo").forEach( post => {
    post.textcontent.tolowercase().includes(e.target.value.tolowercase())
    ? post.classList.remove("filtro")
    : post.classList.add("filtro")
  })
}
})


$(".content-wrapper").on("click", ".save-post", () => {
  getPostData()
  alert("Guardado con exito")
})


