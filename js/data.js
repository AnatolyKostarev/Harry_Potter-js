"use strict";

const $card = document.querySelector(".js-person-list");
const $schoolSelect = document.querySelector(".js-school");
const $personName = document.querySelector(".js-person-name");
let $option = "";

const url = "https://hp-api.onrender.com/api/characters";

// Создание функции для получения данных с помощью async/await

const getData = async url => await (await fetch(url)).json();

// Вызов функции для получения данных и записи в переменную для последующего использования
const data = await getData(url);

// Вывод карточек в браузер
renderList(data);

// формирование select->option
$schoolSelect.innerHTML = `<option value="all" selected>All</option>${addSelect(
  data
)}`;

// Подписка на событие input для поиска по имени персонажа
$personName.addEventListener("input", () => totalSearсh(data));

// Подписка на событие change для поиска по назавнию школы
$schoolSelect.addEventListener("change", () => totalSearсh(data));

// Функция для рендеринга

function renderList(arr) {
  $card.innerHTML = "";
  arr.forEach(item => {
    let divCard = document.createElement("div");
    divCard.classList.add("person-card");
    divCard.innerHTML = `
            <div class="img" style="${
              item.image === "" ? "background: #ccc" : "background: #fff"
            }">
              <img src="${item.image}" width="334" height="400" alt="${
      item.name
    }" loading="lazy"/>
            </div>
            <ul class="person-description">
              <li class="person-title">${
                item.name === "" ? "unknown" : item.name
              }</li>
              <li class="person-item">Actor: ${
                item.actor === "" ? "unknown" : item.actor
              }</li>
              <li class="person-item">Gender: ${
                item.gender === "" ? "unknown" : item.gender
              }</li>
              <li class="person-item">House: ${
                item.house === "" ? "unknown" : item.house
              }</li>
              <li class="person-item">Wand core: ${
                item.wand.core === "" ? "unknown" : item.wand.core
              }</li>
              <li class="person-item">Alive: ${item.alive ? "yes" : "no"}</li>
            </ul>`;
    $card.append(divCard);
  });
}

// Формирование выпадающего списка select>option

function addSelect(arr) {
  const uniqueSchools = [...new Set(arr.map(item => item.house).sort())];
  uniqueSchools.map(
    item => ($option += `<option value="${item}">${item || "Unknown"}</option>`)
  );
  return $option;
}

// Отбор и ренедеринг по имени и по факультету

function totalSearсh(arr) {
  let person = $personName.value.toLowerCase().trim();
  let school = $schoolSelect.value.toLowerCase();
  let filtered = arr
    .filter(item => item.name.toLowerCase().includes(person))
    .filter(item => item.house.toLowerCase() === school || school === "all");
  renderList(filtered);
}
