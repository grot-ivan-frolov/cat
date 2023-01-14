// все коты/
const $wr = document.querySelector('[data-wr]');
const $createCatForm = document.forms.createCatForm;

// кнопка создать
const opencat = document.querySelectorAll('._modal-open');
// кнопка отмена
const closecat = document.querySelector('.modal-close');
// все модалы
const modal = document.querySelectorAll('[_modal]');

const ACTIONS = {
  ADD: 'add',
  DELETE: 'delete',
};
// Форма
function getCatHTML(cat) {
  return `
 <div data-cat-id="${cat.id}" class="card my-5, mx-2" style="width: 18rem">
    <img src= "${cat.image}" class="card-img-top" alt="${cat.name}"/>
    <div class="card-body">
    <h5 class="card-title">${cat.name}</h5>
    <p class="card-text">
    ${cat.description}
    </p>
  
  <button data-atribut="${ACTIONS.DELETE}" type="button" class="btn btn-danger">Delete</button>
    
    </div>
  </div>`;
}
fetch('https://cats.petiteweb.dev/api/single/grot-ivan-frolov/show/')
  .then((response) => response.json())
  .then((data) => {
    $wr.insertAdjacentHTML('afterbegin', data.map((cat) => getCatHTML(cat)).join(''));
    // console.log({ data })
  });

// удаление кота

$wr.addEventListener('click', (e) => {
  if (e.target.dataset.atribut === ACTIONS.DELETE) {
    const $catWr = e.target.closest('[data-cat-id]');
    const { catId } = $catWr.dataset;

    console.log({ catId });

    fetch(`https://cats.petiteweb.dev/api/single/grot-ivan-frolov/delete/${catId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.status === 200) {
          return $catWr.remove();
        }

        alert('ошибка в удалении кота');
      });
  }
});

// добавить кота

function open(elem) {
  elem.classList.remove('active');
}

opencat.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const data = e.target.dataset.modalOpen;

    modal.forEach((modal) => {
      if (modal.dataset.modal === data) {
        open(modal);
      }
    });
  });
});
function close(elem) {
  elem.classList.add('active');
}
modal.forEach((modal) => {
  modal.addEventListener('click', (e) => {
    const datal = e.target.dataset.modalClose;
    if (modal.dataset.modal === datal) {
      close(modal);
    }
  });
});

const NewCat = 'callback-button';
$wr.addEventListener('click', (e) => {
  if (e.target.dataset.atribut === 'Callback-button') {
    $('.modal').addClass('modal_active');
  }
});
$createCatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let formDataObject = Object.fromEntries(new FormData(e.target).entries());
  formDataObject = {
    ...formDataObject,
    id: +formDataObject.id,
    rate: +formDataObject.rate,
    age: +formDataObject.age,
    favorite: !!formDataObject.favorite,
  };

  fetch('https://cats.petiteweb.dev/api/single/grot-ivan-frolov/add/', {
    method: 'POST',
    headers: {

      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formDataObject),
  }).then((res) => {
    if (res.status === 200) {
      return $wr.insertAdjacentHTML(
        'afterbegin',
        getCatHTML(formDataObject),
      );
    }
    throw Error('Ошибка при создании кота');
  }).catch(alert);
});
